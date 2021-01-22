const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const nodemailer = require('nodemailer');
// const multer = require("multer");
// const {googlelogin} = require('../middleware/authGoogle')



//send emails
router.post('/mailer',(req,res)=>{

//  console.log('ddddd');
 const {ProviderEmail,FromEmail,Title,Message}= req.body

console.log(Message);
res.json({ok:'ok'})



// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'youremail@gmail.com',
//     pass: 'yourpassword'
//   }
// });

// Step 1
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // user: process.env.EMAIL || 'anas3506606@gmail.com', // TODO: your gmail account
        // pass: process.env.PASSWORD ||  // TODO: your gmail password
           user:'togedoorJS@gmail.com', // TODO: your gmail account
        pass:'Qaz1qaz1' // TODO: your gmail password
    },

  tls:{
  rejectUnauthorized: false}
 
});

// Step 2
let mailOptions = {
    from: 'togedoorJS@gmail', // TODO: email sender
    to: ProviderEmail, // TODO: email receiver
    subject: Title,
    text: Message,
    
    
};

// Step 3
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log('Error occurs',err);
    }
    return log('Email sent!!!');
});

// end send emails
})
module.exports = router;