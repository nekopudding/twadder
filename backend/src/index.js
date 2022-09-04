require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.connect((process.env.MONGO_BASE_URL || 'mongodb://localhost:27017') + '/twadderDB')

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
  res.json('server is active.')
})

require('./modules/accounts/login-routes.js').routes(app);
require('./modules/accounts/signup-routes.js')(app);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running at port ${process.env.PORT || 3000}`)
})

