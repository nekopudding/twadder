/**
 * Express endpoints for the public facing profile.
 */
require('dotenv').config();
const { getCurrLogin, invalidSessionMsg } = require('./login-routes');
const { Account } = require('./models/account-model');
const { Profile } = require('./models/profile-model');


const getProfile = async (accountId) => {
  if (!accountId) throw {
    name: Error,
    message: "accountId not provided"
  }
  const account = await Account.findOne({_id: accountId});
  const profile = await Profile.findOne({accountId: accountId});
  if (!account || !profile) throw { name: Error, 
      message: "account not found"	
  }

  return {
    ...profile.toObject(),
    _id: undefined, accountId: undefined, __v: undefined, //removed unnecessary info
    username: account.username
  }
}

module.exports = {
  routes: function(app) {
    app.route('/me/profile')
    .get(async (req,res) => {
      try {
        const accountId = getCurrLogin(req);
        const profile = await getProfile(accountId);

        return res.status(200).json({
          profile,
          msg: 'successfully fetched'
        })
      } catch(err) {
        console.log(err)
        return res.status(500).json(err);
      }
    })
  },
  getProfile
}

