const User = require('../models/user');
const Promise = require('bluebird');
const Request = require('../models/request');

function profileRoute(req, res, next){
  return Promise.props({
    pending: Request.find({'item.createdBy': req.user, accepted: true}).exec(),
    requested: Request.find().populate('requester item').exec(),
    user: User.findById(req.user.id).exec()
  })
    .then((data)=> {
      return res.json(data);
    })
    .catch(next);
}


function indexRoute(req, res, next) {
  User
    .find()
    .then((users) => res.json(users))
    .catch(next);
}


function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .then((user) => {
      if(!user) return res.notFound();
      res.json(user);
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  console.log(req.body);
  if(req.file) req.body.image = req.file.filename;
  User
    .findById(req.params.id)
    .then((user) => {
      if(!user) return res.notFound();

      for(const field in req.body) {
        user[field] = req.body[field];
      }

      return user.save();
    })
    .then((user) => res.json(user))
    .catch(next);
}

function deleteRoute(req, res, next) {
  User
    .findById(req.params.id)
    .then((user) => {
      if(!user) return res.notFound();
      return user.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: indexRoute,
//  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  profile: profileRoute
};
