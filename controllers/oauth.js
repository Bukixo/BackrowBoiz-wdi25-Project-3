const rp = require('request-promise');
const oauth = require('../config/oauth');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function github(req, res, next) {
  return rp({
    method: 'POST',
    url: oauth.github.accessTokenURL,
    qs: {
      client_id: oauth.github.clientId,
      client_secret: oauth.github.clientSecret,
      code: req.body.code
    },
    json: true
  })
  .then((token) => {
    return rp({
      method: 'GET',
      url: oauth.github.profileURL,
      qs: token,
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true

    });
  })
  .then((profile) => {
    return User
      .findOne({ email: profile.email })
      .then((user) => {
        if(!user) {
          user = new User({
            username: profile.login,
            email: profile.email
          });
        }
        user.githubId = profile.id;
        // user.image = profile.avatar_url;

        return user.save();
      });
  })
  .then((user) => {
    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1hr' });
    return res.json({
      token,
      message: `Welcome back ${user.username}!`
    });
  })
  .catch(next);
}

//=============================FACEBOOK=========================

function facebook(req, res, next) {
  return rp({
    method: 'GET',
    url: oauth.facebook.accessTokenURL,
    qs: {
      client_id: oauth.facebook.clientId,
      redirect_uri: req.body.redirectUri,
      client_secret: oauth.facebook.clientSecret,
      code: req.body.code
    },
    json: true
  })
  .then((token) => {
    return rp.get({
      url: 'https://graph.facebook.com/v2.5/me?fields=id,name,email,picture.height(961)',
      qs: token,
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true

    });
  })
  .then((profile) => {
    return User
      .findOne({ email: profile.email })
      .then((user) => {
        if(!user) {
          user = new User({
            username: profile.name,
            email: profile.email,
            image: profile.picture.data.url
          });
        }
        user.facebookId = profile.id;

        return user.save();
      });
  })
  .then((user) => {
    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1hr' });
    return res.json({
      token,
      message: `Welcome back ${user.username}!`
    });
  })
  .catch(next);
}

// =============INSTAGRAM===================

function instagram(req, res, next) {
  return rp({
    method: 'POST',
    url: oauth.instagram.accessTokenURL,
    form: {
      client_id: process.env.RENTAPP_INSTA_CLIENT_ID,
      client_secret: process.env.RENTAPP_INSTA_CLIENT_SECRET,
      redirect_uri: oauth.instagram.redirectUri,
      grant_type: 'authorization_code',
      code: req.body.code //query
    },
    json: true
  })
  .then((profile) => {
    console.log(profile);
    return User
      .findOne({ instagramId: profile.user.id })
      .then((user) => {
        if(!user) {
          user = new User({
            username: profile.user.username
          });
        }
        user.instagramId = profile.user.id;
        user.image = profile.user.profile_picture;

        return user.save();
      });
  })
  .then((user) => {
    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1hr' });
    return res.json({
      token,
      message: `Welcome back ${user.username}!`
    });
  })
  .catch(next);
}

module.exports = { facebook, github, instagram };
