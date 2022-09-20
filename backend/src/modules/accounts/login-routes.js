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
          const newSession = {id: uuid.v4(), accountId: account._id };
          sessionList.push(newSession);
          // console.log(newSession.id)
          return res.status(200).json({
            msg: 'login successful',
            sessionId: newSession.id //generate a id for this login session
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
  getAccountId: (sessionId) => { return sessionList.find(s => s.id === sessionId).accountId; }
}

