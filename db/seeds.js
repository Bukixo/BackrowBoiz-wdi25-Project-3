const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const User = require('../models/user');
const Item = require('../models/item');
const Request = require('../models/request');
User.collection.drop();
Item.collection.drop();
Request.collection.drop();

User
  .create([{
    username: 'LLcoolJ',
    password: 'password',
    email: 'jj@jj',
    location: 'London',
    profileImage: 'cool',
    passwordConfirmation: 'password'
  },{
    username: 'Hannah',
    password: 'p',
    email: 'h@h',
    location: 'London',
    profileImage: '/images/seed-pics/red.jpg',
    passwordConfirmation: 'p'
  },{
    username: 'BigBadBuki',
    password: 'password',
    email: 'buki@buki',
    location: 'London',
    passwordConfirmation: 'password',
    profileImage: 'cool'
  }])

  .then((users) => {
    console.log(`${users.length} users created!`);

    return Request
      .create([{
        numberOfDays: 12,
        item: items[0],
        requester: users[1],
        message: 'ITEMPOPULATE',
        accepted: false
      }]);
    })

  .then((requests) => {
    console.log(`${requests.length} requests created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
