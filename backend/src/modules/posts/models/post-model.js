const mongoose = require('mongoose');
const { accountIdFormat, postTextFormat, imageFormat } = require('../../../utils/mongoose-types')

const imageSchema  = new mongoose.Schema({
  name: String,
  desc: String,
  img: imageFormat
});
const postSchema = new mongoose.Schema({
  accountId: accountIdFormat,
  text: postTextFormat,
  image: imageSchema
},{timestamps: true});

module.exports = {
  Account: mongoose.model('Account',accountSchema),
}