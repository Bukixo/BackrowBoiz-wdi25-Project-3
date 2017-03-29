//this lib doc js file can be called whenever we want to send an email, we need to specifie the to, subject and text when sending that email.

const nodemailer = require('nodemailer');
//Mail is going to our ZSHC file and finding our email and password and storing them in a const smtpTransport.
const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',  // sets automatically host, port and connection security settings
  auth: {
    user: process.env.RENTAPP_EMAIL,
    pass: process.env.RENTAPP_PASSWORD
  }
});



function send(to, subject, text, next) {
  // const data = req.body;
  return smtpTransport.sendMail({  //email options
    from: `Fabric <${process.env.RENTAPP_EMAIL}>`, // sender address.  Must be the same as authenticated user if using Gmail.
    to, // receiver
    subject,
    text
  }, next);
}

module.exports = {
  send
};
