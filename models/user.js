const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String},
  passwordConfirmation: {type: String},
  email: {type: String},
  location: {type: String},
  profileImage: {type: String}
});

module.exports = mongoose.model('User', userSchema);
