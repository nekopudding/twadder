require('dotenv').config();
const { validate } = require('../../utils/encrypt-string');
const { Account } = require('./models/account-model');
const uuid = require('uuid');

let sessionList = [];

module.exports = {
  routes: function(app) {
    app.post('/login', async (req,res) => {
      const {username,password} = req.body;
      try {
        const account = await Account.findOne({username});
        const validated = await validate(password,account.passwordHash);
        if (validated) {
          const newSession = {token: uuid.v4(), accountId: account._id };
          sessionList.push(newSession);

          return res.status(200).json({
            msg: 'login successful',
            sessionToken: newSession.token //generate a token for this login session
          })
        } else {
          return res.status(403).json({
            msg: 'log-in unsuccessful, please try again'
          })
        }
      } catch (err) {
        console.log(err)
        return res.status(400).json(err);
      }
    })
  },
  getSessionList: () => { return sessionList; }
}

