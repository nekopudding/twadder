require('dotenv').config();
const { getAccountId } = require('../accounts/login-routes');
const { Post, Image } = require('./models/post-model');
const fs = require('fs');
const { upload } = require('../../utils/middleware/multer-upload');

module.exports = {
  routes: function(app) {
    app.route('/timeline')
    .get(async (req,res) => {
      try {
        const {sessionId} = req.query;
        const accountId = getAccountId(sessionId);
        if (!accountId) return res.status(400).json({msg: 'invalid sessionId provided'});
        const account = await Account.findOne({_id: accountId});
        const profile = await Profile.findOne({accountId: accountId});
  
        if (!account || !profile) {
          return res.status(500).json({msg: 'ERROR *** account not found'});
        }

        return res.status(200).json({
          profile: {
            ...profile.toObject(),
            _id: undefined, accountId: undefined, __v: undefined, //removed unnecessary info
            username: account.username
          },
          msg: 'successfully fetched'
        })
      } catch(err) {
        console.log(err)
        return res.status(500).json(err);
      }
    });
    //testing image upload
    app.get('/image', async (req, res) => {
      try {
        const images = await Image.find({});
        const imageArray = images.forEach((img,index) => {
          console.log(typeof img.image.data);
          const data = img.image.data;
          const buffer = Buffer.from(data, "base64");
          fs.writeFileSync(`file-${index}`,buffer);
        })
        res.status(200).json({images, msg: 'images fetched successfully'})
      } catch (err) {
        console.log(err)
        res.status(400).json(err);
      }
      
  });
    app.post('/image', upload.single('image'), async (req, res) => {
      try {
        const img = new Image({
          image: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }})
        await img.save();
        res.send('200');
      } catch (err) {
        console.log(err) 
        res.send(err);
      }
    });
  },
}

