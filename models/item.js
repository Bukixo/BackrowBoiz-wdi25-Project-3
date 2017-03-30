const mongoose = require('mongoose');
const s3 = require('../lib/s3');

const commentSchema = new mongoose.Schema({
  content: {type: String, required: true},
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
  rating: {type: Number}
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
  image: {type: String},
  description: {type: String, required: true},
  comments: [commentSchema],
  size: {type: String, required: true},
  catagory: {type: String}
});

itemSchema.methods.belongsTo = function itemBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

itemSchema
  .path('image')
  .set(function getPreviousImage(image){
    this._image = this.image;
    return image;
  });

itemSchema
    .virtual('imageSRC')
    .get(function getImageSRC() {
      if(!this.image) return null;
      return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
    });

itemSchema.pre('save', function checkPreviousImage(next) {
  if(this.isModified('image') && this._image) {
    return s3.deleteObject({ Key: this._image }, next);
  }
  next();
});


itemSchema.pre('remove', function deleteImage(next){
  if (this.image) return s3.deleteObject({Key: this.image}, next);
  next();
});

module.exports = mongoose.model('Item', itemSchema);
