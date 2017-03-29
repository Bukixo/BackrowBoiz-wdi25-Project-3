const Request = require('../models/request');

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

function showRequestRoute(req, res, next)s{
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
  .then((request)=>{
    res.status(201).json(request);
  })
  .catch(next);
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
