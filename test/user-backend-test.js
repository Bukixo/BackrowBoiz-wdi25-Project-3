/* global should, expect, supertest, it, describe */
process.env.NODE_ENV = 'test';
const should = require('chai').should();
const expect = require('chai').expect;
const User = require('../models/user');
const server = require('../server');
const app = require('supertest')(require('../server'));
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


  const data = [{
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
  }];

beforeEach((done)=>{
  User.collection.drop();
  User.create(data, done);
});

xdescribe('/api/users', ()=>{

  it('should return a 200 response',(done)=>{
    app.get('/api/users')
    .expect(200, done);
  });

  it('should return an array of users', (done)=>{
    app.get('/api/users')
    .end((req, res)=>{
      expect(res.body).to.be.a('Array');
      done();
    });
  });

});

xdescribe('/api/users/:id',()=>{
  let user;

  beforeEach((done)=>{
    User.findOne({username: 'BigBadBuki' }, (err, firstUser)=>{
      user = firstUser;
      done();
    });
  });

  it('should give us the first user in the database', (done)=>{
    app.get(`/api/users/${user.id}`)
    .expect(200, done);
  });

  it('should have all the properties', (done)=>{
    app.get(`/api/users/${user.id}`)
    .end((req, res)=>{
      expect(res.body).to.have.property('username');
      expect(res.body).to.have.property('password');
      expect(res.body).to.have.property('email');
      expect(res.body).to.have.property('location');
      expect(res.body).to.have.property('profileImage');
      done();
    });
  });
});

describe('POST /api/register ', ()=>{
  it('should give us 201', (done)=>{
    app.post('/api/register')
    .send({
      username: 'Bear',
      password: 'dasd',
      email: 'as@jj',
      location: 'Poland',
      profileImage: 'dad',
      passwordConfirmation: 'dasd'
    })
    .end((err,res)=>{
      expect(res.status).to.equal(302);
      done();
    });
  });
});
