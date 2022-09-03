require('dotenv').config();
const nodemailer = require('nodemailer');
const { EmailVerification, VerifiedEmail } = require('./models/signup-models');

module.exports = function(app) {
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.SUPPORT_EMAIL, // generated ethereal user
      pass: process.env.SUPPORT_PASSWORD, // generated ethereal password
    },
  });
  
  app.route('/signup/verify')
  //send a verification code to your mailbox
  .get(async (req,res) => {
    try {
      const {email} = req.query;
      if (!email) return res.status(400).json({msg: 'you must provide a valid email.'});

      await VerifiedEmail.deleteOne({email});
  
      const verificationCode = Math.floor(100000 + Math.random() * 900000);
      const mailOptions = {
        from: process.env.SUPPORT_EMAIL,
        to: email,
        subject: 'Verify your Twadder Account',
        text: `Paste this code to continue signing up: \n${verificationCode}`
      };
      
      await transporter.sendMail(mailOptions);

      await EmailVerification.deleteMany({email});
      const ev = new EmailVerification({email,verificationCode});
      await ev.save();

      return res.status(200).json({msg: 'code sent to your mailbox.'});
    } catch (err) {
      console.log(err)
      return res.status(500).json(err);
    }
  })
  //verify the email
  .post(async (req,res) => {
    try {
      const {email,verificationCode} = req.body;
      const item = await EmailVerification.findOne({email});
      if (!item) {
        return res.status(400).json({msg: 'email not found'});
      } else if (item.verificationCode !== verificationCode) {
        return res.status(401).json({msg: 'invalid code submitted'})
      }
      else {
        await EmailVerification.deleteOne({email});
        const ve = new VerifiedEmail({email});
        await ve.save();
        return res.status(200).json({msg: 'email successfully verified. You may continue signing up.'})
      }

    } catch (err) {
      console.log(err)
      return res.status(500).json(err);
    }
  })
}