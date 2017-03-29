

angular
  .module('rentApp')
  .factory('Nodemailer', Nodemailer); //Our Request Factroy which handels the request Update & delete request requests to our API
//SAtellizer handles the Create Route for Our users

const nodemailer = require('nodemailer');
// var nodemailer = require("nodemailer");

const smtpTransport = nodemailer.createTransport('SMTP',{
  service: 'Hotmail',  // sets automatically host, port and connection security settings
  auth: {
    user: 'hannahwynnjones@hotmail.co.uk',
    pass: 'Skype386476'
  }
});

console.log('SMTP Configured');


smtpTransport.sendMail({  //email options
  from: 'Hannah Nodemailer <hannahwynnjones@hotmail.co.uk>', // sender address.  Must be the same as authenticated user if using Gmail.
  to: 'Receiver Name <hannahwynnjones2@gmail.com>', // receiver
  subject: 'Emailing with nodemailer', // subject
  text: 'Email Example with nodemailer' // body
}, function(error, response){  //callback
  if(error){
    console.log(error);
  }else{
    console.log('Message sent: ' + response.message);
  }

  smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
});
