require('dotenv').config()

/**
 * Configurations for local development and deployment onto 
 * cloud.
 */
module.exports = {
  mongoUrl: (process.env.MONGO_BASE_URL || 'mongodb://localhost:27017'),
  dbName: '/twadderDB',
  firebaseCSBucket: 'twadder-b2796.appspot.com'
};