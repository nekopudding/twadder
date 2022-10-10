require('dotenv').config();
const { getCurrLogin, invalidSessionMsg } = require('../accounts/login-routes');
const { Post, Image } = require('./models/post-model');
const fs = require('fs');
const { upload } = require('../../utils/middleware/multer-upload');
const sharp = require('sharp');
const tmp = require('tmp');
const {firebaseUpload} = require('../../utils/firebase/firebase-init');
const { Account } = require('../accounts/models/account-model');

const POST_TYPE = {
  POST:'POST',
  REPLIES: 'REPLIES',
  MEDIA: 'MEDIA',
  LIKES: 'LIKES'
}
const findPosts = async (username) => {
  const accountId = await Account.find({username})._id;
  if (!username || !accountId) {
    return await Post.find({});
  } else {
    return await Post.find({accountId});
  }
}
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
    app.post('/posts',upload.single('image'),async (req,res) => {
      try {
        const accountId = getCurrLogin(req);
        if (!accountId) return res.status(400).json({msg: invalidSessionMsg});
        //create post
        const {text} = req.body;
        const buffer = await sharp(req.file.buffer).resize(1024, 1024,{fit: 'contain'}).toBuffer();
        const url = await firebaseUpload(accountId,buffer,req.file.originalname);

        const post = new Post({
          accountId, text, images: [url]
        })
        await post.save();

        return res.status(200).json({msg: 'post successfully uploaded'});
      } catch(err) {
        console.log(err)
        return res.status(500).json(err);
      }
    }),
    app.get('/posts', async (req,res) => {
      try {
        const {username,type} = req.query;
        let posts;
        switch (type) {
          case POST_TYPE.POST:
            posts = await findPosts(username);
            break;
          default:
            break;
        }
        return res.status(200).json({posts: posts, msg: 'fetch successful'})
      } catch(err) {
        console.log(err)
        return res.status(500).json(err);
      }
    })
  },
}

