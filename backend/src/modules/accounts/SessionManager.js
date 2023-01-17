const crypto = require('crypto')

class SessionError extends Error{};
const tokenName = 'token';
function getToken(cookie) {
  if (!cookie) return null;

  return cookie
    ?.split(';') //split the different cookies
    .map(c => c.trim()) //remove whitespace
    .filter(c => c.indexOf(tokenName+'=') !== -1)?.[0] //get the token cookie
    .split('=')[1]; //get the value of the cookie
}

function SessionManager () {
  const CookieMaxAgeMs = 600000; //10min

  const sessions = {};

  this.createSession = (res,username,accountId,maxAge = CookieMaxAgeMs) => {
    const token = crypto.randomBytes(24).toString('hex');
    const sessionData = {username,accountId,timestamp:Date.now(),maxAge};
    sessions[token] = sessionData;
    res.cookie(tokenName,token,{maxAge, sameSite: 'none',secure: true});
    console.log('createToken:',token)
    setTimeout(() => {
      delete sessions[token];
    },maxAge);
  }

  this.deleteSession = (req) => {
    const token = req?.session;
    token && delete sessions[token];
    delete req.username;
    delete req.accountId;
    delete req.session;
  }
  
  this.middleware = (req,res,next) => {
    const token = getToken(req?.headers?.cookie);
    // console.log('token:',token)
    // console.log('sessions:',sessions);
    if (!token || !sessions[token]) {
      console.log('token:',token,'sessions[token]:',sessions[token])
      return next(new SessionError());
    }
    req.username = sessions[token].username;
    req.accountId = sessions[token].accountId;
    req.session = token;
    return next();
  }
  this.getToken = getToken;
}

SessionManager.Error = SessionError;

module.exports = SessionManager;