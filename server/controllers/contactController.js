const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Mail = mongoose.model('Mail');
const User = mongoose.model('User');
const { promisify } = require('es6-promisify');
require ('express-validator');
//const mail = require('../handlers/mail');

// Validate Contact
exports.validateMail = (req, res, next) => {
    req.sanitizeBody('email');
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extensions: false,
        gmail_remove_subaddress: false 
    });
    req.sanitizeBody('name');
    req.sanitizeBody('phone');
    req.sanitizeBody('text');
    
    next();
}

// Create Mail Contact
exports.sendMail = async (req, res) => {
    const mail = new Mail({
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        text: req.body.text
    });

    const saveMail = await mail.save(mail).catch(
        (error) => {
            res.json(error);
        }
    )
    res.json(saveMail);         
         
}