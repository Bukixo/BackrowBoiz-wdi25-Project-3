/* Global should, expect, supertest, it, describe */
process.env.NODE_ENV = 'test';
const should = require('chai').should(); // require Should which gives us the should keyword when we describe the test
const expect = require('chai').expect; // gives us expect which is the action that actual runs the funciton
const User = require('../models/user'); // require the User Model we are going to use
const app = require('supertest')(require('../server')); // requires the app and uses the supertast REMEBER TO EXPORT THE SERVER !
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// gives us test data
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
//runs before each function
beforeEach((done)=>{
  User.collection.drop();
  User.create(data, done);
});

// describing what is going to be tested
xdescribe('/api/users', ()=>{
// tells you what is expected and runs the test
  it('should return a 200 response',(done)=>{
    app.get('/api/users')
    .expect(200, done);
  });
// runs the same test as above but now checks if users have all data
  it('should return an array of users', (done)=>{
    app.get('/api/users')
    .end((req, res)=>{
      expect(res.body).to.be.a('Array');
      expect(res.body.length).to.equal(3);
      expect(res.text).to.contain('username');
      expect(res.text).to.contain('password');
      expect(res.text).to.contain('email');
      expect(res.text).to.contain('location');
      expect(res.text).to.contain('profileImage');
      done();
    });
  });

});
//going to use the :id which means we need to find one user and use the USER id in the url to get One user
xdescribe('/api/users/:id',()=>{
  let user;
// runs beforeEach and finds a user from the testdata and returns it to us we assign it to our global function variable so we can use it during the tests
  beforeEach((done)=>{
    User.findOne({username: 'BigBadBuki' }, (err, firstUser)=>{
      user = firstUser;
      done();
    });
  });
//Pretty much the same as the /api/users but now with a :id aswell
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
//test the post request when we make a User This is with the $auth /register
xdescribe('POST /api/register ', ()=>{
//Creates a template user we are going to create
  const user = {
    username: 'Bear',
    password: 'dasd',
    email: 'as@jj',
    location: 'Poland',
    profileImage: 'dad',
    passwordConfirmation: 'dasd'
  };
  //Makes the post request and send the userTemplate we just created
  it('should give us 201', (done)=>{
    app.post('/api/register')
    .send(user)
    .end((err,res)=>{
      // sees that we get the right status code if not see in the controller which res.status(xxx).json is returned
      expect(res.status).to.equal(201);
      expect(res.body).to.be.a('Object');
      expect(res.body).to.have.property('message').to.equal('Registration successful');
      done();
    });
  });
  //checks the error if the API is going to run our customErrorHandler on a badrequest
  it('should not create user without username', (done)=>{
    app.post('/api/register')
  .send({
    //Sends data without a username which i required in the model
    password: 'dasd',
    email: 'as@jj',
    location: 'Poland',
    profileImage: 'dad',
    passwordConfirmation: 'dasd'
  }).end((err, res)=>{
    //checks for the right status and error messages
    expect(res.status).to.equal(400);
    expect(res.body).to.be.a('Object');
    expect(res.body).to.have.property('message').to.equal('Bad Request');
    expect(res.body).to.have.property('errors');
    done();
  });

  });
});
//describes the Updatefunction
xdescribe('PUT, /api/users/:id', ()=>{
  //says what is going to be tested in this block
  it('should update the user created ',(done)=>{
    // Create a new user with the new Method works the same as User.create beacuse the UserSChema we required is a Construtor Function
    const user = new User({
      username: 'Rocky',
      password: 'hippo',
      email: 'zoo@loo',
      location: 'sweden',
      profileImage: 'missHomeRip',
      passwordConfirmation: 'hippo'});
    user.save((err, user )=>{
//Saves the user and the use the bluebird Promise to do a PUT request
  //saves the user so we can put the previous users ID to the queryString so we can target this specific user
      app.put(`/api/users/${user.id}`)
      .send({
        // puts in the updated Object and sends it to the databese
        username: 'bobby Brown baby',
        email: 'zoo@loo',
        location: 'sweden',
        profileImage: 'missHomeRip'})
        .end((err,res)=>{
          //checks if the res.status is updated right and if the updated Object has the correct values
          expect(res.status).to.equal(302);
          expect(res.text).to.have.contain('bobby Brown baby');
          expect(res.text).to.have.contain('email');
          expect(res.text).to.have.contain('location');
          expect(res.text).to.have.contain('profileImage');
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });
});
//Deletes the user
xdescribe('DELETE, /api/users/:id delete a user', ()=>{
  it('should remove one user and', (done)=>{
      // Create a new user with the new Method works the same as User.create beacuse the UserSChema we required is a Construtor Function
    const user = new User({
      username: 'Rocky',
      password: 'hippo',
      email: 'zoo@loo',
      location: 'sweden',
      profileImage: 'missHomeRip',
      passwordConfirmation: 'hippo'});
    user.save((err, user)=>{
      //saves the user so we can put the previous users ID to the queryString so we can target this specific user
      app.delete(`/api/users/${user.id}`)
    .end((err, res)=>{
      //Sees if everytinh went correct
      expect(res.status).to.equal(204);
      expect(res.body).to.be.a('Object');
      done();
    });
    });
  });
});
