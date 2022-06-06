require("dotenv").config();

// dependencies
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// connect to database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create Model
const Schema = mongoose.Schema;

const User = new Schema({
  username: String,
  hash: String,
  salt: String,
  email: String,
  admin: Boolean
});

// Export Model
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('userData', User, 'userData');