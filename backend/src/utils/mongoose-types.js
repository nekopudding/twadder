const mongoose = require('mongoose');

module.exports = {
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
    match: [/^[a-zA-Z0-9]{3,16}$/]
  },
  passwordFormat: { //will be encrypted
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
  accountListFormat: {type: [mongoose.ObjectId], default: []}
}