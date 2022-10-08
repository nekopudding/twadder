const mongoose = require('mongoose');
const { accountIdFormat, postTextFormat, imageFormat, repliesFormat, repostListFormat, urlListFormat, urlFormat } = require('../../../utils/mongoose-types')

const imageSchema = new mongoose.Schema({
  image: imageFormat
})

const postSchema = new mongoose.Schema({
  accountId: accountIdFormat,
  text: postTextFormat,
  images: urlListFormat,
  video: urlFormat,
  likes: repostListFormat,
  retwadds: repostListFormat,
  replies: repliesFormat
},{timestamps: true});

module.exports = {
  Post: mongoose.model('Post',postSchema),
  Image: mongoose.model('Image',imageSchema)
}