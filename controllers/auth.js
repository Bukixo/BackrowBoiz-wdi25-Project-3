const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const mail = require('../lib/mail');

function register(req, res, next) {
  if(req.file) req.body.image = req.file.filename;
//pass in the to, subject and text into the send function.
  User
    .create(req.body)
    .then((user) => {
      mail.send(user.email, 'Thanks for registering!', `Hey ${user.username}! Thanks for registering, for real!`, (err) => {
        if(err) next(err);
        res.status(201).json({ message: 'Registration successful'});
      });
    })
    .catch(next);
}

function login(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) return res.unauthorized();

      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1hr' });
      res.json({ token, user, message: `Welcome back ${user.username}` });
    })
    .catch(next);
}

module.exports = {
  register,
  login
};
