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
const { RepostModel } = require('../../utils/mongoose-types');
const { Profile } = require('../accounts/models/profile-model');

const POST_TYPE = {
  POSTS:'POSTS',
  REPLIES: 'REPLIES',
  MEDIA: 'MEDIA',
  LIKES: 'LIKES'
}
const PUT_POST_MODE = {
  LIKE: 'LIKE',
  RETWEET: 'RETWEET'
}

const hasAccountId = (list,accountId) => {
  return list.filter(e => e.accountId === accountId).length > 0
}
module.exports = {
  routes: function(app) {
    app.get('/timeline',async (req,res) => {
      try {
        const accountId = req.accountId;
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
        const accountId = req.accountId;
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
        //gets the posts, then join it with metadata
        Post.find({})
        .then(posts => { //append user information
          return Promise.all(posts.map(p => {
              return new Promise((resolve,reject) => {
                getProfile(p.accountId).then(profile => {
                  if (!profile) {
                    //delete the post if account has been deleted but somehow post was not removed
                    Post.deleteMany({accountId:p.accountId}); 
                  }
                  resolve({
                    username: profile?.username,
                    displayname: profile?.displayname,
                    ...p.toObject(),
                    accountId: undefined,
                    likes:[],retwadds:[]
                  });
                })
              })
          }))
        })
        .then(posts => {
          return res.status(200).json({posts, msg: 'fetch successful'})
        })
      } catch(err) {
        console.log(err)
        return res.status(500).json(err);
      }
    });
    app.put('/posts/:id', async (req,res) => {
      return res.status(200).send('testtest');
      try {
        console.log('updating')

        const postId = req.params.id;
        const {mode} = req.body;
        const accountId = getCurrLogin(req);


        if (mode === PUT_POST_MODE.LIKE) {
          const post = await Post.findById(postId);
          if(hasAccountId(post.likes,accountId)) {
            const post = await Post.updateOne({_id: postId},{
              $pull: {
                likes: [{accountId}]
              }
            })
            console.log(post);
          } else {
            const newLike = new RepostModel({accountId});
            const post = await Post.updateOne({_id: postId},{
              $push: {
                likes: newLike
              }
            })
          }
        }
        res.status(200).json({msg: 'update successful'});
      } catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
    })
}}

