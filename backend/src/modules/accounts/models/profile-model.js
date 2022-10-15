const mongoose = require('mongoose');
const { accountListFormat, displayNameFormat, bioFormat, locationFormat, accountIdFormat, birthdayFormat, isPrivateFormat, urlFormat } = require('../../../utils/mongoose-types')


const profileSchema = new mongoose.Schema({
  avatar: urlFormat,
  banner: urlFormat,
  displayName: displayNameFormat,
  bio: bioFormat,
  location: locationFormat,
  website: urlFormat,
  accountId: accountIdFormat,
  birthday: birthdayFormat,
  following: accountListFormat,
  isPrivate: isPrivateFormat
},{timestamps: true});

module.exports = {
  Profile: mongoose.model('Profile',profileSchema),
}