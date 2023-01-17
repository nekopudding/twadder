require('dotenv').config()

/**
 * Configurations for local development and deployment onto 
 * cloud.
 */
module.exports = {
  mongoUrl: (process.env.MONGO_BASE_URL || 'mongodb://127.0.0.1:27017'),
  dbName: '/twadderDB',
  firebaseCSBucket: 'twadder-b2796.appspot.com'
};