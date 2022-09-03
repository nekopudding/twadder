const mongoose = require('mongoose');
const { emailFormat, verificationCodeFormat, usernameFormat, googleIdFormat, passwordFormat, enableNotificationsFormat, accountListFormat } = require('../../../utils/mongoose-types')


const accountSchema = new mongoose.Schema({
  username: usernameFormat,
  password: passwordFormat,
  googleId: googleIdFormat,
  email: emailFormat,
  enableNotifications: enableNotificationsFormat,
  blockedAccounts: accountListFormat,
  mutedAccounts: accountListFormat
},{timestamps: true});

module.exports = {
  Account: mongoose.model('Account',accountSchema),
}