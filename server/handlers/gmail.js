const nodemailer = require ('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'azrin640@gmail.com',
        pass: process.env.MAIL_PASS
    }
});

var mailOptions = {
    from: 'azrin640@gmail.com',
    to: 'gouk560@gmail.com',
    subject: 'Testing testing',
    html: '<p>Testing nodemailer with Gmail</p>'
}

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log('Error :' + error);
    } else{
        console.log(info);
    }
}); 

 

