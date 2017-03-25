const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  item: {type: mongoose.Schema.ObjectId, ref: 'Item', required: true},
  numberOfDays: {type: Number, required: true},
  requester: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
  message: {type: String},
  accepted: {type: Boolean}
});

requestSchema.methods.belongsTo = function requestItemBelongsTo(item) {
  if(typeof this.item.id === 'string') return this.item.id === item.id;
  return item.id === this.item.toString();
};

module.exports = mongoose.model('Request', requestSchema);
