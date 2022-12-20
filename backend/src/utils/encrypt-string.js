/**
 * Encrypts and validates the string passed in using bcrypt.
 * Use for things like passwords so that we don't store plain passwords
 * within our database.
 */
const bcrypt = require('bcrypt');
const saltRounds = 10;

const encrypt = async (s) => {
  const hash = await bcrypt.hash(s, saltRounds); //the hash includes the salt
  // console.log(hash)
  return hash;
}

const validate = async (s, hash) => {
  if (!s || !hash) throw {msg: 'username not found'};
  const result = await bcrypt.compare(s,hash);
  // console.log(result)
  return result;
}

module.exports = {encrypt,validate};