require('dotenv').config();
const { getAccountId } = require('../accounts/login-routes');
const { Post, Image } = require('./models/post-model');
const fs = require('fs');
const { upload } = require('../../utils/middleware/multer-upload');
const sharp = require('sharp');
const tmp = require('tmp');

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
        await fs.access("./uploads", (error) => {
          if (error) {
            fs.mkdirSync("./uploads");
          }
        });
        const images = await Image.find({});
        const imageArray = images.map((img) => {
          return img.image;
        })
        imageArray.forEach((i,index) => {
          const tmpobj = tmp.fileSync();
          tmpobj.fd
        })
        return res.json(imageArray);
        
      } catch (err) {
        console.log(err)
        res.status(400).json(err);
      }
      
  });
    app.post('/image', upload.single('image'), async (req, res) => {
      try {
        const buffer = await sharp(req.file.buffer).resize(1024, 1024,{fit: 'contain'}).toBuffer();
        const img = new Image({
          image: {
            data: buffer,
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

