const Request = require('../models/request');
const mail = require('../lib/mail');
const User = require('../models/user');
const Promise = require('bluebird');
const Item = require('../models/item');
const stripe = require('stripe')('sk_test_RbXPNxb0rbgsI2mRZW113s7D');


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

//sending an email to the item owner (const user) telling them that someone has made a request
    mail.send(user.email, 'Someone\'s made a request!', `Hey ${user.username}! Great News! ${currentUser.username} has requested ${item.name} for ${request.numberOfDays}.  To accept this request, please go to heroku.com and accept the payment from ${currentUser.username}`, (err) => {
      if(err) next(err);
    //  res.status(201).json(request);
    });
//sending email to user (const currentuser) telling them that they've successfully made a request
    mail.send(currentUser.email, 'Thanks for making a request!', `Hey ${currentUser.username}! Thanks for requesting ${item.name} from ${user.username} for ${request.numberOfDays} days at £${request.price} per day, we'll let you know when the request has been accepted or not!`, (err) => {

      if(err) next(err);
      res.status(201).json(request);
    });
  })
    .catch(next);
}
//deleteRequestRoute Deletes the request only used by the owner of the request
// PUT NODEMAILER EMAIL HERE!!
function deleteRequestRoute(req, res, next){
  console.log(req.body, 'payment accepted');
  Request
  .findById(req.params.id)
  .exec()
  .then((request)=>{
    if(!request) return res.notFound();
    // if the boolean on the request is not accepted and not paid it will return a callback which removes the request.
    if(!req.body.accepted && !req.body.paid) return declineRequestRoute(req, res, next);
    //Here use a promiseProps and send email to owner and requster
    return Promise.props({ request, user: User.findById(req.body.requester), item: Item.findById(request.item)})
    .then((data)=>{
      const item = data.item; // the item currently requested
      return Promise.props({ request: data.request, user: data.user, item: data.item, itemOwner: User.findById(item.createdBy.id)});
    })
    .then((data)=>{
      const request = data.request; // the request being handled
      const user = data.user ;// The user who did the request,
      const item = data.item; // item being currently requested
      const itemOwner = data.itemOwner; // the Owner of the rent

      //sending an email to the item owner (const itemOwner) telling them that someone has paid for the request
      mail.send(user.email, 'Payment made!', `Hey ${user.username}!  ${itemOwner.username} has made a payment for ${item.name} for ${request.numberOfDays}.  You'll naeed to send the ${item.name} to ${itemOwner.username} at ${itemOwner.location}.`, (err) => {
        if(err) next(err);
        res.status(201).json(request);
      });
        //sending email to requester (const user) telling them that they've successfully made a payment
      mail.send(itemOwner.email, 'Successful Payment!', `Hey ${itemOwner.username}! Thanks for your payment for ${item.name} from ${user.username} for ${request.numberOfDays} days at £${request.price} per day.  ${itemOwner.username} will send the item next day delivery.`, (err) => {
        if(err) next(err);
        res.status(201).json(request);
      })
      .then((request)=>{
        return request.remove();
      });
    })
    .then(()=> res.status(204).end())
    .catch(next);
  });
}

//Removes the request with no further or do bc it's been declined
function declineRequestRoute(req, res, next){
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

//owner of item clicked 'accepted', then function runs.  then up to requester to pay.


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
//click on oay, this takes you to the payment form.
function paymentRoute(req, res, next) {
  Request
    .find()
    .then((items) => res.json(items))
    .catch(next);
}
//payment form.  Fun shit happens.
function postPaymentRoute(req, res, next) {
  var token = req.body.token;
  stripe.charges.create({
    //amount: parseInt(parseFloat(req.body.amount * 100), 10),
    amount: req.body.amount, 
    currency: req.body.currency,
    source: token,
    description: 'TEST'
  }, function(err) {
    if(err) return res.status(500).json({ message: err });
    res.status(200).json({ message: 'Payment successful' });
  })

  //email to requester, telling them it's gone through

  //emial to item owner, telling them that thye've paid, and this is their address.
  .catch(next);
}

module.exports = {
  index: indexRequestRoute,
  show: showRequestRoute,
  create: createRequestRoute,
  delete: deleteRequestRoute,
  update: updateRequestRoute,
  payment: paymentRoute,
  postPayment: postPaymentRoute
};
