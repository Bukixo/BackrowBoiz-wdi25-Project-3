const Item = require('../models/item');

function indexRoute(req, res, next) {
  Item
    .find()
    .populate('createdBy')
    .then((items) => res.json(items))
    .catch(next);
}

function createRoute(req, res, next) {

  if(req.file) req.body.image = req.file.filename;
  req.body.createdBy = req.user;

  Item
    .create(req.body)
    .then((item) => res.status(201).json(item))
    .catch(next);
}

function showRoute(req, res, next) {
  Item
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .then((item) => {
      if(!item) return res.notFound();
      res.json(item);
    })
    .catch(next);
}

function updateRoute(req, res, next) {

  if(req.file) req.body.image = req.file.filename;
  Item
    .findById(req.params.id)
    .populate('createdBy')
    .exec()
    .then((item) => {
      if(!item) return res.notFound();

      for(const field in req.body) {
        item[field] = req.body[field];
      }

      return item.save();
    })
    .then((item) => res.json(item))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Item
    .findById(req.params.id)
    .exec()
    .then((item) => {
      if(!item) return res.notFound();
      return item.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

function createCommentRoute(req, res, next) {

  req.body.createdBy = req.user;

  Item
    .findById(req.params.id)
    .exec()
    .then((item) => {
      if(!item) return res.notFound();

      item.comments.push(req.body); // create an embedded record
      return item.save();
    })
    .then((item) => res.redirect(`/items/${item.id}`))
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Item
    .findById(req.params.id)
    .exec()
    .then((item) => {
      if(!item) return res.notFound();
      // get the embedded record by it's id
      const comment = item.comments.id(req.params.commentId);
      comment.remove();

      return item.save();
    })
    .then((item) => res.redirect(`/items/${item.id}`))
    .catch(next);
}


module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
