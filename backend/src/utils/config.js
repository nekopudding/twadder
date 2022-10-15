require('dotenv').config()

module.exports = {
  url: (process.env.MONGO_BASE_URL || 'mongodb://localhost:27017'),
  database: '/twadderDB',
  imgBucket: "photos",
};