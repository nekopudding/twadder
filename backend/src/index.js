require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 4000;
mongoose.connect((process.env.MONGO_BASE_URL || 'mongodb://localhost:27017') + '/twadderDB',
  { useNewUrlParser: true, useUnifiedTopology: true }
  , err => console.log(err || 'mongoose connected')
);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
  res.json('server is active.')
})

require('./modules/accounts/profile-routes').routes(app);
require('./modules/accounts/login-routes.js').routes(app);
require('./modules/accounts/signup-routes.js').routes(app);
require('./modules/posts/post-routes').routes(app);
require('./utils/debug')();

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})

