require('dotenv').config();
const { getAccountId } = require('./login-routes');
const { Account } = require('./models/account-model');
const { Profile } = require('./models/profile-model');

module.exports = {
  routes: function(app) {
    app.route('/me/profile')
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
            username: account.username
          },
          msg: 'successfully fetched'
        })
      } catch(err) {
        console.log(err)
        return res.status(500).json(err);
      }
    })
  },
}

