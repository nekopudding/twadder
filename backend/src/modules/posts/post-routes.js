require('dotenv').config();
const { getCurrLogin, invalidSessionMsg } = require('../accounts/login-routes');
const { Post, Image } = require('./models/post-model');
const fs = require('fs');
const { upload } = require('../../utils/middleware/multer-upload');
const sharp = require('sharp');
const tmp = require('tmp');
const {firebaseUpload} = require('../../utils/firebase/firebase-init');

module.exports = {
  routes: function(app) {
    app.get('/timeline',async (req,res) => {
      try {
        const accountId = getCurrLogin(req);
        if (!accountId) return res.status(400).json({msg: invalidSessionMsg});
        //get all user's followings
        //sort posts by their upload date
        //send to frontend
        return res.status(200).json({posts: [], msg: 'api work in progress'});
      } catch(err) {
        console.log(err)
        return res.status(500).json(err);
      }
    });
    app.post('/post',async (req,res) => {
      try {
        const accountId = getCurrLogin(req);
        if (!accountId) return res.status(400).json({msg: invalidSessionMsg});
        //create post
        const {} = req.body;

        return res.status(200).json({posts: [], msg: 'api work in progress'});
      } catch(err) {
        console.log(err)
        return res.status(500).json(err);
      }
    })

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

        return res.json(imageArray); //return images as buffer
        
      } catch (err) {
        console.log(err)
        res.status(400).json(err);
      }
      
  });
    app.post('/image', upload.single('image'), async (req, res) => {
      try {
        const buffer = await sharp(req.file.buffer).resize(1024, 1024,{fit: 'contain'}).toBuffer();
        const url = await firebaseUpload('images',buffer,req.file.originalname);
        res.send(url);
      } catch (err) {
        console.log(err) 
        res.status(400).json(err);
      }
    });
  },
}

