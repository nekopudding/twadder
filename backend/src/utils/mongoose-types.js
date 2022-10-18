/**
 * Contains all the types we use to define our mongoose models.
 */
const mongoose = require('mongoose');

const repostSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.ObjectId,
    required: true
  }
}, {timestamps: true});

const urlRegex = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
const displayNameRegex = /^[a-zA-Z0-9]{1,16}$/
const usernameRegex = /^[a-zA-Z0-9]{3,16}$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

module.exports = {
  //ACCOUNT
  emailFormat: {
    type: String, 
    required: true,
    match: [
      emailRegex,
      "Please fill a valid email address",
    ]
  },
  verificationCodeFormat: {
    type: Number, 
    required: true,
    min: 99999, //restrict to 6-digits
    max: 1000000
  },
  usernameFormat: {
    type: String,
    required: true,
    match: usernameRegex
  },
  passwordHashFormat: { 
    type: String,
    required: true,
  },
  birthdayFormat: {
    type: Date,
    required: true
  },
  googleIdFormat: {
    type: String
  },
  enableNotificationsFormat: {
    type: Boolean,
    required: true
  },
  //PROFILE
  accountListFormat: {type: [mongoose.ObjectId], default: []},
  urlFormat: {
    type: String,
    match: urlRegex
  },
  displayNameFormat: {
    type: String,
    required: true,
    match: displayNameRegex
  },
  bioFormat: {
    type: String,
    default: ''
  },
  locationFormat: {
    type: String,
    default: ''
  },
  accountIdFormat: {
    type: mongoose.ObjectId,
    required: true
  },
  isPrivateFormat: {
    type: Boolean,
    default: false
  },
  //POST
  postTextFormat: {
    type: String,
    required: true
  },
  imageFormat: {
    data: Buffer,
    contentType: String
  },
  //list of postIds
  repliesFormat: {type: [mongoose.ObjectId], default: []}, 
  repostSchema,
  repostListFormat: {
    type: [repostSchema],
    default: []
  },
  urlListFormat: {
    type: [{
      type: String,
      match: urlRegex
    }],
    default: []
  }
}