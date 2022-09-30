const mongoose = require('mongoose');
const { accountListFormat, URLFormat, displayNameFormat, bioFormat, locationFormat, accountIdFormat, birthdayFormat, isPrivateFormat } = require('../../../utils/mongoose-types')


const profileSchema = new mongoose.Schema({
  avatar: URLFormat,
  banner: URLFormat,
  displayName: displayNameFormat,
  bio: bioFormat,
  location: locationFormat,
  website: URLFormat,
  accountId: accountIdFormat,
  birthday: birthdayFormat,
  following: accountListFormat,
  isPrivate: isPrivateFormat
},{timestamps: true});

module.exports = {
  Profile: mongoose.model('Profile',profileSchema),
}