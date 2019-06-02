const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const passport = require('passport');
const User = mongoose.model('User');
const { body, validationResult  } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const jwt = require('jsonwebtoken');
// const passportJWT = require('passport-jwt');
// const JwtStrategy = require('passport-jwt').Strategy,
//     ExtractJwt = require('passport-jwt').ExtractJwt;
const crypto = require('crypto');
const mail = require('../handlers/mail');
const axios = require('axios');


// ** Reusable **
exports.validateUserId = [

    body('_id').not().isEmpty().trim().escape()

];

exports.validationErrors = (req, res, next) => {
    
    const errors = validationResult(req);    

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });    
    }
    else return next();

};


// ** Registration **
exports.reqValidateRegister = [

    body('username').not().isEmpty().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').not().isEmpty().trim().escape(),
    body('passwordConfirm').not().isEmpty().trim().escape(),
    sanitizeBody('terms').toBoolean()
                            
];

exports.userExist = async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if(!user){
       return next();               
    }

    res.json({ status: 400, statusText: 'Email already exist. Please login with your email'});       

};

exports.register = async (req, res) => {

    const authToken = crypto.randomBytes(20).toString('hex');
    const authTokenExpire = Date.now() + 3600000; 
    
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        authToken,
        authTokenExpire,
        terms: req.body.terms
    });

    await user.setPassword(req.body.password);

    const response = await user.save();

    if(response && response._id){

        // Send email for authentication                           
        const authURL = `http://${req.headers.host}/auth/login-2/${response.authToken}`;
        var options = {
            user: {
                email: response.email
            },
            subject: 'Register Account Authentication',
            html: `Authenticate your account by pressing clicking <a href="${authURL}"> this link</a></br>
                or this link ${authURL}`
        };
        var sendMail = mail.send(options); 
        res.json(response);
    }

};

// ** Login **
exports.reqValidateLogin = [

    body('email').isEmail().normalizeEmail(),
    body('password').not().isEmpty().trim().escape()
                            
];

exports.authenticate = async (req, res, next) => {

    const authToken = req.body.authToken; 

    const authenticate = User.authenticate();
    const authenticateUser = await authenticate(req.body.email, req.body.password)
        .catch(error => res.json(error));
    const user = authenticateUser.user;

    if(user){
        const tokenExpiry = user.authTokenExpire.getTime();
        const now = Date.now();

        if(tokenExpiry > now){
            const authenticated = await User.findOneAndUpdate({_id: user._id}, {authenticated: true}, {new: true, useFindAndModify: false})
                .catch(error => res.json(error));

            if(authenticated){
                const token = user.generateJwt();
                res.json({id: user._id, token});
            }
            else res.json({ status: 400, statusText: 'Authentication error. Please login again.' });
        }
        else res.json({ status: 401, statusText: 'Your authentication link has already expired. Please register again.' });
    }
    else res.json({ status: 400, statusText: 'Authentication link error. Please register again.' });
};

exports.login = async (req, res) => {

    const authenticate = User.authenticate();
    const authenticateUser = await authenticate(req.body.email, req.body.password)
        .catch(error => res.json(error));
    const user = authenticateUser.user;

    if(user){
        
        const token = user.generateJwt();
        res.json({id: user._id, token});

    }         
    else res.json({ status: 400, statusText: 'Email or password error.'});

}

// ** Forgot Password **
exports.reqValidateForgotPassword = [

    body('email').isEmail().normalizeEmail()
                            
];

exports.forgotPassword = async(req, res) => {

    const user = await User.findOne({ email: req.body.email })
        .catch(error => res.json(error));
     
    if(user) {

        const authToken = crypto.randomBytes(20).toString('hex');
        const authTokenExpire = Date.now() + 3600000; 

        const updatedAuthTokenUser = await User.findOneAndUpdate({_id: user._id}, {authToken, authTokenExpire}, {new: true, useFindAndModify: false})
            .catch(error => res.json(error));        

        if(updatedAuthTokenUser){

            // Send email for password change                           
            const authURL = `http://${req.headers.host}/auth/reset-password-2/${updatedAuthTokenUser.authToken}`;
            var options = {
                user: {
                    email: updatedAuthTokenUser.email
                },
                subject: 'Forgot password authentication',
                html: `
                    <p>IMPORTANT: We have received a request from you to change your password. Please change your password in one hour after receiving this email. If it is not you, please ignore this email.</p>
                    <p>Change your password <a href="${authURL}"> this link</a></br>
                    or this link ${authURL}.</p>`
            };
            var sendMail = mail.send(options); 
            res.json({ status: 200, statusText: 'Success. Please check your email to change your password in one hour before link expired.'});

        }
        else res.json({ status: 400, statusText: 'Fail to generate token, please try again'});
    }
    else res.json({ status: 400, statusText: 'Email does not exist, please register to login.'});        

};

// ** Reset Password
exports.reqValidateResetPassword = [

    body('email').isEmail().normalizeEmail(),
    body('password').not().isEmpty().trim().escape(),
    body('passwordConfirm').not().isEmpty().trim().escape()
                            
];

exports.resetPassword = async(req, res) => {

    const user = await User.findOne({authToken: req.body.token})
        .catch(error => res.json(error));

    if(user){

        const tokenExpiry = user.authTokenExpire.getTime();
        const now = Date.now();

        if(tokenExpiry > now){

            const editedUser = await user.setPassword(req.body.password)
                .catch(error => res.json(error));
            
            if(editedUser){
                const jwtToken = user.generateJwt();
                const id = editedUser._id;
                res.json({status: 200, statusText: 'Password reset successful.', id, jwtToken});
            }
            else res.json({ status: 401, statusText: 'Error resetting password, please try again.' });
            
        }
        else res.json({ status: 401, statusText: 'Your authentication link has already expired. Please re apply forgot password again.' });

    }
    else res.json({status: 400, statusText: 'Email or password or link error, please apply to reset your password again.'});

};

exports.profileUser = async(req, res) => {
    
    const user = await User.findOne({_id: req.body._id})
        .catch(error => res.json(error));

    if(user) res.json(user);
    else res.json({ status: 400, statusText: 'User does not exist, please register to login.'});  

}

// ** Edit Profile
exports.reqValidateProfile = [

    body('_id').not().isEmpty().trim().escape(),
    body('username').not().isEmpty().trim().escape(),
    body('birthday').not().isEmpty().trim().escape(),
    body('handphone').not().isEmpty().trim().escape(),   
    body('address').not().isEmpty().trim(),
    body('address2').not().isEmpty().trim(),
    body('address2').not().isEmpty().trim().escape(),
    body('city').not().isEmpty().trim().escape(),
    body('state').not().isEmpty().trim().escape(),
    body('postcode').not().isEmpty().trim().escape(),
    body('country').not().isEmpty().trim().escape()

];

exports.editProfile = async (req, res) => {

    const profile = req.body;
    console.log(profile);
    const user = await User.findOneAndUpdate({_id: req.body._id}, profile, {new: true, useFindAndModify: false})
        .catch(error => res.json(error));
    
    if(user) {
        res.json(user);
        console.log(user);
    }
    else res.json({ status: 400, statusText: 'Fail to update profile, please try again'});

}







exports.isLoggedIn = async (req, res, next) => {
    var auth = req.headers.authorization;
    var token = auth.split(' ')[1];
    var decodedUser = jwt.decode(token);
    const user = await User.findOne({_id: decodedUser._id});
    if(user){
        return next();
    }
    else{
        res.json('No User');
    }      
};

exports.adminRegister = async (req, res) => {

    if(req.body.level === admin){
        var admin = true;
    }else{
        admin = false;
    }

    const authToken = crypto.randomBytes(20).toString('hex');
    const authTokenExpire = Date.now() + 3600000; 
    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        level: req.body.level,
        introducer: req.body.introducer,        
        address1: req.body.address1,
        address2: req.body.address2,
        admin,
        authToken,
        authTokenExpire,
    });

    await user.setPassword(req.body.password);

    const response = await user.save().catch(error => {
        res.json(error);
    });

    /* Send email for authentication                       
    const authURL = `http://${req.headers.host}/register/auth/${response.authToken}`;
    var options = {
        user: {
            email: response.email
        },
        subject: 'Register Account Authentication',
        html: `Authenticate your account by pressing clicking <a href="${authURL}"> this link</a></br>
            or this link ${authURL}`
    };
    var sendMail = mail.send(options); 
    */
    res.json(response);
}

exports.getUser = async (req, res) => {
    const user = await User.findOne({_id: req.body._id});
    if(!user){
        return;
    }
    res.json(user);
}

exports.getUsers = async (req, res) => {
    await User.find((err, users) => {
        if(users){
            res.json(users);
        }
        if(err){
            res.json(err);
        }
    }); 
};

exports.searchUsers = async (req, res) => {
    var search = req.body.input;
    var user = await User.find();
    if(user){
        res.json(user);
    }
};

exports.editUser = async (req, res) => {
    const user = await User.findOneAndUpdate(
        {_id: req.body.id},
        { 
            name: req.body.name,            
            email: req.body.email,
            phone: req.body.phone,
            level: req.body.level,
            introducer: req.body.introducer,
            address1: req.body.address1,
            address2: req.body.address2
        },
        { new: true }
    ).catch(error => {
        res.json(error);
    });

    if(req.body.password){
        await user.setPassword(req.body.password);

        const response = await user.save().catch(error => {
            res.json(error);
        });
    }
    
    res.json(user);
}

exports.removeUser = async (req, res) => {

    const deletedUser = await User.findOneAndRemove({_id: req.body.id}).catch((error) => {
        res.json(error);
    });
    res.json(deletedUser);
}

exports.getUserByUsername = async (req, res) => {
    const user = await User.findOne({username: req.body.username}).populate('introducerInfo');
    res.json(user);
}

exports.googleAddress = (req, res) => {
    var search = req.body.search;
    axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${search}&inputtype=textquery&fields=formatted_address&key=${process.env.GOOGLE_KEY}`)
        .then(response => {
            if(response){
                res.json(response.data.candidates);
            }
        })
        .catch(error => res.json(error));
}

exports.getIntroducerId = async (req, res) => {
    const user = await User.findOne({ username: req.body.introducer })
        .catch(error => {
            res.json(error);
        });
    if(user){
        res.json(user);
    }
}

exports.getUsernameAutocomplete = async (req, res) => {
    const user = await User.find({username: req.body.input})
    .catch(error => {
        res.json(error);
    });

    if(user){       
        res.json(user);
    }
}