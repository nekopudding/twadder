// https://stackoverflow.com/questions/39848132/upload-files-to-firebase-storage-using-node-js
var admin = require("firebase-admin");
var serviceAccount = require("../credentials/twadder-b2796-firebase-adminsdk-3w3mb-1dccf355e0.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "twadder-b2796.appspot.com"
});

var bucket = admin.storage().bucket();

//https://stackoverflow.com/questions/65372182/firebase-function-upload-to-storage
async function upload(path,buffer,filename) {
  try {
    const file = bucket.file(`${path}/${filename}`)

    await file.save(buffer, {
      contentType: 'image/jpeg'
    });
    return true;
  } catch(err) {
    console.log(err);
    return false
  }
}

module.exports = {upload};
