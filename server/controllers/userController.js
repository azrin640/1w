const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const passport = require('passport');
const User = mongoose.model('User');
const { promisify } = require('es6-promisify');
require('express-validator');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const crypto = require('crypto');
const mail = require('../handlers/mail');
const axios = require('axios');
const dns = require('dns');
const os = require('os');

exports.getUserPcInfo = (req, res) => {
    const userInfo = os.userInfo();
    if(userInfo) res.json(userInfo);
};

exports.validateRegister = (req, res, next) => {

    req.sanitizeBody('username');
    req.check('username').not().isEmpty();

    req.sanitizeBody('name');
    req.check('name').not().isEmpty();
    
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extensions: false,
        gmail_remove_subaddress: false 
    });
    req.check('email').not().isEmpty();

    req.sanitizeBody('phone');
    req.check('phone').not().isEmpty();
    
    req.sanitizeBody('introducer');

    req.sanitizeBody('password');
    req.check('password').not().isEmpty();

    req.sanitizeBody('cpassword');
    req.check('cpassword').not().isEmpty();
    
    req.sanitizeBody('address1');
    req.check('address1').not().isEmpty();

    req.sanitizeBody('address2');
    req.check('address2').not().isEmpty();

    req.sanitizeBody('postcode');
    req.check('postcode').not().isEmpty();

    req.sanitizeBody('city');
    req.check('city').not().isEmpty();

    req.sanitizeBody('state');
    req.check('state').not().isEmpty();

    const errors = req.validationErrors();  
    if(errors) res.json(errors);
    return next();
};

exports.register = async (req, res) => {
    const authToken = crypto.randomBytes(20).toString('hex');
    const authTokenExpire = Date.now() + 3600000; 
    
    const user = new User({
        introducer: req.body.introducer,
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        birthdate: req.body.birthdate,
        address1: req.body.address1,
        address2: req.body.address2,    
        postcode: req.body.postcode,
        city: req.body.city,
        state: req.body.state,    
        tcCheckBox : req.body.tcCheckBox,
        authToken,
        authTokenExpire
    });

    await user.setPassword(req.body.password);

    const response = await user.save().catch(error => {
        res.json(error);
    });

    if(response && response._id){

        // Send email for authentication                           
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

        res.json(response);
    }
};

exports.authenticate = async (req, res, next) => {
    const authToken = req.body.authToken;
    const user = await User.findOne({authToken});
    if(user){
        const token = user.generateJwt();
        const authenticate = await User.findOneAndUpdate({_id: user._id}, {authenticated: true});
        res.json({token: token});
    }else{
        res.json({
            status: 400,
            message: 'No user found'
        })
    }
};

exports.validateLogin = (req, res, next) => {

    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extensions: false,
        gmail_remove_subaddress: false 
    });
    req.checkBody('email', 'That email is not valid').isEmail();

    req.sanitizeBody('password');
    req.checkBody('password', 'Password can not be blank').notEmpty();

    const errors = req.validationErrors();  
    if(errors) res.json(errors);
    return next();

} 

exports.login = (req, res, next) => {

    passport.authenticate('local', function(err, user, info){
        if(err) res.json(error);
        if(!user) {
            res.json({
                status: 404,
                message: 'User not found'
            })
        }
        if(user){
            var token = user.generateJwt();
            res.json({
                status: 202,
                message: 'User login accepted',
                token: token,
                id: user._id
            });
        }

    })(req, res, next);
};

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