const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.send = async (options) => {
    const msg = {
        to: options.user.email,
        from: `1world.io <noreply@1world.io.com>`,
        subject: options.subject,
        html: options.html
    };

    const mailSent = sgMail.send(msg);
    return mailSent;
    
}