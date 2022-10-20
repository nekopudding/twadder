/**
 * Express endpoints for the post module.
 * add/update/delete posts
 */
require('dotenv').config();
const { getCurrLogin, invalidSessionMsg } = require('../accounts/login-routes');
const { Post, Image } = require('./models/post-model');
const fs = require('fs');
const { upload } = require('../../utils/middleware/multer-upload');
const sharp = require('sharp');
const tmp = require('tmp');
const {firebaseUpload} = require('../../utils/firebase/firebase-init');
const { Account } = require('../accounts/models/account-model');
const { getProfile } = require('../accounts/profile-routes');

const POST_TYPE = {
  POSTS:'POSTS',
  REPLIES: 'REPLIES',
  MEDIA: 'MEDIA',
  LIKES: 'LIKES'
}

/**
 * Find all posts, or posts by a specified user.
 * @param {*} username - username as specified in the user account
 * @returns array of posts by that user.
 */
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
    app.post('/posts',upload.array('images',4),async (req,res) => {
      try {
        const accountId = getCurrLogin(req);
        if (!accountId) return res.status(400).json({msg: invalidSessionMsg});
        //create post
        //replyingTo should be username
        const {text,replyingTo} = req.body;

        if (replyingTo && !await Account.findOne({username: replyingTo})) {
          throw {Type: Error, msg: 'cannot reply to a user that doesn\'t exist'}
        }
        const urls = []
        for(let i = 0;i<req.files.length;i++) {
          const buffer = await sharp(req.files[i].buffer).resize(1024, 1024,{fit: 'inside'}).jpeg({ quality: 80 }).toBuffer();
          urls.push(await firebaseUpload(accountId,buffer,req.files[i].originalname));
        }

        const post = new Post({
          accountId, text, images: [...urls],
          replyingTo
        })
        await post.save();

        return res.status(200).json({msg: 'post successfully uploaded'});
      } catch(err) {
        console.log(err)
        return res.status(400).json(err);
      }
    }),
    app.get('/posts', async (req,res) => {
      try {
        const {username,type} = req.query;
        let posts;
        switch (type) {
          case POST_TYPE.POSTS:
            posts = await findPosts(username); //this needs to be changed, as it fetches all types except likes/retweets
            break;
          default:
            break;
        }
        const viewablePosts = await Promise.all(await posts.map(async p => {
          const profile = await getProfile(p.accountId);
          return {
            ...p.toObject(),
            displayName: profile.displayName,
            username: profile.username,
            accountId: undefined
          }
        }))
        return res.status(200).json({posts: viewablePosts, msg: 'fetch successful'})
      } catch(err) {
        console.log(err)
        return res.status(500).json(err);
      }
    })
  },
}

