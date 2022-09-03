const mongoose = require('mongoose');

const emailFormat = {
  type: String, 
  required: true,
  match: [
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    "Please fill a valid email address",
  ]
}

const verificationCodeFormat = {
  type: Number, 
  required: true,
  min: 99999, //restrict to 6-digits
  max: 1000000
}

const emailSchema = ({email: emailFormat})
const emailVerificationSchema = new mongoose.Schema({
  email:emailFormat,
  verificationCode:verificationCodeFormat
})

module.exports = {
  EmailVerification: mongoose.model('EmailVerification',emailVerificationSchema),
}