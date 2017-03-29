const Request = require('../models/request');
const mail = require('../lib/mail');
const User = require('../models/user');
const Promise = require('bluebird');
const Item = require('../models/item');

// indexRequestRoute Grabs all the requests and sends it to the Client, which will be filtered in the front-end
function indexRequestRoute(req, res, next){
  Request
  .find()
  .populate('item requester')
  .exec()
  .then((requests)=>{
    res.json(requests);
  })
  .catch(next);
}

function showRequestRoute(req, res, next){
  Request
  .findById(req.params.id)
  .populate('item requester')
  .then((request)=>{
    if(!request) return res.notFound();
    res.json(request);
  })
  .catch(next);
}

//Creates a new request route ==> Someone makes a request to create a user
function createRequestRoute(req, res, next){
  console.log(req.body);
  Request
  .create(req.body)
  .then((request) => {

    return Promise.props({ request, user: User.findById(req.body.requester), item: Item.findById(request.item)});
  })
  .then((data)=>{

    const item = data.item;
    const currentUser = data.user;
    const request = data.request;

    return Promise.props({ request, item, currentUser, user: User.findById(item.createdBy)});
  })
  .then((data) => {
    const user = data.user;
    const item = data.item;
    const currentUser = data.user;
    const request = data.request;
    console.log(data);
    console.log(currentUser.username); //console logs are for the email below, so we know what we're sending
    console.log(currentUser.email);

    console.log(user.email);
    console.log(user.username);

    console.log(item.name);
    console.log(item.username);

    console.log(request.numberOfDays);


    mail.send('hannahwynnjones2@gmail.com', 'Thanks for making a request!', `Hey ${currentUser.username}! Thanks for requesting ${item.name} from ${user.username} for ${request.numberOfDays} we'll let you know when the request has been accepted or not!`, (err) => {
      if(err) next(err);
      res.status(201).json(request);
    })
      .catch(next);
  });
}
//deleteRequestRoute Deletes the request only used by the owner of the request
function deleteRequestRoute(req, res, next){
  Request
  .findById(req.params.id)
  .exec()
  .then((request)=>{
    if(!request) return res.notFound();
    return request.remove();
  })
  .then(()=> res.status(204).end())
  .catch(next);
}

function updateRequestRoute(req, res, next){
  console.log(req.body);
  Request
  .findById(req.params.id)
  .exec()
  .then((request)=>{
    if(!request) return res.notFound();

    for(const field in req.body){
      request[field] = req.body[field];
    }
    return request.save();
  })
  .then((request)=> res.status(302).json(request))
  .catch(next);
}

module.exports = {
  index: indexRequestRoute,
  show: showRequestRoute,
  create: createRequestRoute,
  delete: deleteRequestRoute,
  update: updateRequestRoute
};
