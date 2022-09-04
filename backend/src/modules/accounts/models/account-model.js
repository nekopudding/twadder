const mongoose = require('mongoose');
const { emailFormat, usernameFormat, googleIdFormat, passwordHashFormat, enableNotificationsFormat, accountListFormat } = require('../../../utils/mongoose-types')


const accountSchema = new mongoose.Schema({
  username: usernameFormat,
  passwordHash: passwordHashFormat,
  googleId: googleIdFormat,
  email: emailFormat,
  enableNotifications: enableNotificationsFormat,
  blockedAccounts: accountListFormat,
  mutedAccounts: accountListFormat
},{timestamps: true});

module.exports = {
  Account: mongoose.model('Account',accountSchema),
}