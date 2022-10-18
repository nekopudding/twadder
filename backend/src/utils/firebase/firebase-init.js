/**
 * Firebase is used for storing media content files such as images and videos.
 * https://stackoverflow.com/questions/39848132/upload-files-to-firebase-storage-using-node-js
 */
var admin = require("firebase-admin");
const {format} = require('util');
const { firebaseCSBucket } = require("../config");
var serviceAccount = require("../credentials/twadder-b2796-firebase-adminsdk-3w3mb-1dccf355e0.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: firebaseCSBucket
});

var bucket = admin.storage().bucket();

//
/**
 * Upload a file onto firebase cloud storage.
 * 
 * https://stackoverflow.com/questions/65372182/firebase-function-upload-to-storage
 * @param {*} path - path from the root of the bucket
 * @param {*} buffer - contents of the file as a buffer
 * @param {*} filename - name of file to use
 * @returns public url of the uploaded file
 */
async function firebaseUpload(path,buffer,filename) {
  try {
    const today = new Date()
    const file = bucket.file(`${path}/${today.getTime()+'-'+filename}`); //use time to make filename unique

    const save = await file.save(buffer, {
      contentType: 'image/jpeg'
    });
    await file.makePublic(); //makes url publicly accessible
    return format(`https://storage.googleapis.com/${bucket.name}/${file.name}`);
  } catch(err) {
    console.log(err);
    return false
  }
}

module.exports = {firebaseUpload};
