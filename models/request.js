const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  item: {type: mongoose.Schema.ObjectId, ref: 'Item', required: true},
  numberOfDays: {type: Number, required: true},
  requester: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
  message: {type: String},
  accepted: {type: Boolean}
});

module.exports = mongoose.model('Request', requestSchema);
