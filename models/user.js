const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String},
  location: {type: String},
  profileImage: {type: String}
});

module.exports = mongoose.model('User', userSchema);
