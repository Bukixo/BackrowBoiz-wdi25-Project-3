const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const User = require('../models/user');

User.collection.drop();

User
  .create([{
    username: 'LLcoolJ',
    password: 'password',
    passwordConfirmation: 'password',
    email: 'jj@jj',
    location: 'London',
    profileImage: 'cool'
  },{
    username: 'BigBadBuki',
    password: 'password',
    passwordConfirmation: 'password', 
    email: 'buki@buki',
    location: 'London',
    profileImage: 'cool'
  }])
  .then((users) => console.log(`${users.length} users created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
