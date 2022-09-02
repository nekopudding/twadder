require('dotenv').config()
const express = require('express')
var nodemailer = require('nodemailer');


const app = express();
app.use(express.json());


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SUPPORT_EMAIL,
    pass: process.env.SUPPORT_PASSWORD
  }
});

app.post('/signup/verify', async (req,res) => {
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  var mailOptions = {
    from: process.env.SUPPORT_EMAIL,
    to: req.body.email,
    subject: 'Verify your Twadder account',
    text: `Paste this code to continue signing up: \n
          ${verificationCode}
          `
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.status(500).json(new Error('Verification email was not sent.'))
    } else {
      res.status(200).end('email sent');
    }
  });
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running at port ${process.env.PORT || 3000}`)
})

module.exports =  {app};