require('dotenv').config();
const nodemailer = require('nodemailer');
const { encrypt } = require('../../utils/encrypt-string');
const { Account } = require('./models/account-model');
const { EmailVerification } = require('./models/email-verification-model.js');
const { Profile } = require('./models/profile-model');

module.exports = {
  routes: function(app) {
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
    const {email} = req.query;
    try {
      if (!email) return res.status(400).json({msg: 'you must provide a valid email.'});
      if (await Account.findOne({email})) {
        return res.status(400).json({msg: 'an account with this email already exists'});
      }  
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
      await EmailVerification.deleteOne({email});
      return res.status(500).json(err);
    }
  })
  //verify the email
  .post(async (req,res) => {
    const {email,verificationCode} = req.body;
    try {
      const item = await EmailVerification.findOne({email});
      if (!item) {
        return res.status(400).json({msg: 'email not found'});
      } else if (item.verificationCode !== verificationCode) {
        return res.status(401).json({msg: 'invalid code submitted'})
      }
      else {
        return res.status(200).json({msg: 'email successfully verified. You may continue signing up.'})
      }

    } catch (err) {
      console.log(err)
      return res.status(500).json(err);
    }
  })

  app.post('/signup', async (req,res) => {
    const {username,password,googleId,email,enableNotifications,verificationCode, displayName, birthday} = req.body;
    let createdAccount,createdProfile;
    try {
      const item = await EmailVerification.findOne({email}); //check email is verified
      if (!item) {
        return res.status(400).json({msg: 'email not found'});
      } else if (item.verificationCode !== verificationCode) {
        return res.status(401).json({msg: 'invalid code submitted'})
      } else if (await Account.findOne({email})) {
        return res.status(400).json({msg: 'an account with this email already exists'});
      } else {
        const account = new Account({username,
          passwordHash: await encrypt(password),
          googleId,email,enableNotifications
        });
        const profile = new Profile({ 
          displayName,birthday,
          accountId: account._id
        });
        createdAccount = await account.save();
        createdProfile = await profile.save();
        return res.status(200).json({msg: 'account successfully created'});
      }
    } catch (err) {
      console.log(err);
      if (createdAccount && !createdProfile) { //delete the created account if profile creation was unsuccessful
        await Account.deleteOne({_id: createdAccount._id});
      }
      return res.status(500).json(err);
    }
  })
}
}