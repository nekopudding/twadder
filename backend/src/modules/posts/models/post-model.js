const mongoose = require('mongoose');
const { accountIdFormat, postTextFormat, imageFormat } = require('../../../utils/mongoose-types')

const imageSchema = new mongoose.Schema({
  image: imageFormat
})
const postSchema = new mongoose.Schema({
  accountId: accountIdFormat,
  text: postTextFormat,
  image: imageFormat
},{timestamps: true});

module.exports = {
  Post: mongoose.model('Post',postSchema),
  Image: mongoose.model('Image',imageSchema)
}