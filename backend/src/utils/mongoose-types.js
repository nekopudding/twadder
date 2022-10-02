const mongoose = require('mongoose');

module.exports = {
  //ACCOUNT
  emailFormat: {
    type: String, 
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
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
    match: /^[a-zA-Z0-9]{3,16}$/
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
  URLFormat: {
    type: String,
    match: /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
  },
  displayNameFormat: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9]{1,16}$/
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
}
}