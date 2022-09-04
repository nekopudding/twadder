const mongoose = require('mongoose');
const { emailFormat, verificationCodeFormat } = require('../../../utils/mongoose-types');

const emailVerificationSchema = new mongoose.Schema({
  email:emailFormat,
  verificationCode:verificationCodeFormat
})

module.exports = {
  EmailVerification: mongoose.model('EmailVerification',emailVerificationSchema),
}