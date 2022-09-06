const cookies = require('js-cookie');

function setCookie(name,value,days) {
  cookies.set(name,value,{expires: days});
}
function getCookie(name) {
  return cookies.get(name);
}
function eraseCookie(name) {   
  cookies.remove(name)
}

module.exports = {setCookie,getCookie,eraseCookie};