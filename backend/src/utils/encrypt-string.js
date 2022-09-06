const bcrypt = require('bcrypt');
const saltRounds = 10;

const encrypt = async (s) => {
  const hash = await bcrypt.hash(s, saltRounds); //the hash includes the salt
  // console.log(hash)
  return hash;
}

const validate = async (s, hash) => {
  const result = await bcrypt.compare(s,hash);
  // console.log(result)
  return result;
}

module.exports = {encrypt,validate};