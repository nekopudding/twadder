/**
 * Express endpoint for logging in, maintains the current 
 * active sessions.
 */
require('dotenv').config();
const { validate } = require('../../utils/encrypt-string');
const { Account } = require('./models/account-model');
const SessionManager = require('./SessionManager');
const sessionManager = new SessionManager();

const invalidSessionMsg = 'invalid sessionId provided';

module.exports = {
  routes: function(app) {
    app.post('/login', async (req,res) => {
      const {username,password} = req.body;
      try {
        const account = await Account.findOne({username});
        if (await validate(password,account?.passwordHash)) {
          sessionManager.createSession(res,account.username,account._id);
          return res.status(200).json({msg: 'login successful'})
        } else {
          return res.status(403).json({msg: 'log-in unsuccessful, please try again'})
        }
      } catch (err) {
        console.log(err)
        return res.status(400).json(err);
      }
    })
  },
  invalidSessionMsg
}

