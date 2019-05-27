const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const promisify = require('es6-promisify');

exports.send = async (options) => {
    const msg = {
        to: options.user.email,
        from: `Zaranaturlich <noreply@zaranaturlich.com>`,
        subject: options.subject,
        html: options.html
    };

    const mailSent = sgMail.send(msg);
    
}