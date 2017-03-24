const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');


function register(req, res, next) {
  console.log(req.body);
  User
    .create(req.body)
    .then(() => res.json({ message: 'Registration successful'}))
    .catch((err) => {
      console.log(err);
    });
}

function login(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) return res.unauthorized();

      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1hr' });
      res.json({ token, message: `Welcome back ${user.username}` });
    })
    .catch(next);
}

module.exports = {
  register,
  login
};
