require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const { mongoUrl, dbName } = require('./utils/config');
const login = require('./modules/accounts/login-routes.js');
const profile = require('./modules/accounts/profile-routes');
const signup = require('./modules/accounts/signup-routes.js');
const post = require('./modules/posts/post-routes');


const port = process.env.PORT || 4000;
mongoose.connect(mongoUrl + dbName,
  { useNewUrlParser: true, useUnifiedTopology: true }
  , err => console.log(err || 'mongoose connected')
);

const app = express();
app.use(cors({
  origin : "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(login.middleware);


app.get('/',(req,res) => {
  res.json('server is active.')
})

profile.routes(app);
login.routes(app);
signup.routes(app);
post.routes(app);
require('./utils/debug')();

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})

