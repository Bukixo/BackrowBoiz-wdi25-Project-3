const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {type: String, required: true},
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User', required: true}
}, {
  timestamps: true
});

commentSchema.methods.belongsTo = function commentBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

const itemSchema = new mongoose.Schema({
  name: {type: String, required: true},
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
  price: {type: Number, required: true},
  image: {type: String, required: true},
  description: {type: String, required: true},
  rating: {type: String},
  comments: [commentSchema],
  size: {type: String, required: true}
});

itemSchema.methods.belongsTo = function itemBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};


module.exports = mongoose.model('Item', itemSchema);
