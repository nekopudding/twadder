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
  middleware: (req,res,next) => {
    const path = (req.baseUrl + req.path).trim();
    if (path === '/login' 
    || path === '/'
    || path === '/signup/verify'
    || path === '/signup') {
      return next();
    }
    sessionManager.middleware(req,res,next)
  },
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
    }),
    app.route('/logout')
      .get((req,res) => {
        sessionManager.deleteSession(req);
        return res.status(200).end();
      })

  },
  invalidSessionMsg,
  sessionManager
}

