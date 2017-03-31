/*global describe, should, expect, it, beforeEach, */
process.env.NODE_ENV = 'test'; // Set the process environment to be test so we don't log Morgan
const chai = require('chai');
const should = require('chai').should();
const expect = require('chai').expect; //requires Chai which is giving us the actualtesting methods (describe, should,expect )
const chaiHttp = require('chai-http');
const server = require('../server');
const app = require('supertest')(require('../server')); // requires the app from server.js and supertest
const Item = require('../models/item'); // requires the Model we want to test our restful routing on
const User = require('../models/user');
chai.use(chaiHttp);
//<--- Some secure Routes may interrupt with the testing
//Create fake data we are going to run our tests on
const userData = [{
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
const testData = [{
  name: 'Ball',
  createdBy: '58d54d45f028b0f6b0375803',
  price: 120,
  image: 'imageofball.jpg',
  description: 'It is round',
  size: 'Small'
},{
  name: 'Ice',
  createdBy: '58d54d45f028b0f6b0375803',
  price: 160,
  image: 'imageofIce',
  description: 'It should be cold',
  size: 'huge'
},{
  name: 'Police',
  createdBy: '58d54d45f028b0f6b0375803',
  price: 890,
  image: 'imageOFpopo',
  description: 'It should be Cold',
  size: 'Medium'
}];
//Runs before each test it will drop a collection and create a new collection to prevent us from passing in reused Data to our tests
beforeEach((done)=>{
  Item.collection.drop();
  Item.create(testData);
  User.collection.drop();
  User.create(userData, done);

});
//<------------------TEST SETUP OVER NOW WE CAN WRITE SOME TEST-------------->
//Describes what we are going to test in this describe block
xdescribe('GET /api/item', ()=>{
// it describes what is going to be logged in the terminal , app.get is the function we testing and expect is the result we expect to get
  it('should return a 200 response', (done)=>{
    app.get('/api/item')
    .end((err, res)=>{
      expect(res.text).to.contain('createdBy');
      expect(res.text).to.contain('price');
      expect(res.text).to.contain('image');
      expect(res.text).to.contain('description');
      expect(res.text).to.contain('size');
      res.should.have.status(200);
      done();
    });
  });

  //Should gives a 404 not found because our URL is false
  it('should return a 404 not found', (done)=>{
    app.get('/api/THISISNOTAURL')
    .end((err, res)=>{
      expect(res.body).to.have.property('message').to.equal('Not Found');
      res.should.have.status(404);
      done();
    });
  });

  it('should render Json, return the length and be an array', (done)=>{
    app.get('/api/item')
    .end((err,res)=>{
      //res.should.have.status(200);
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(3);
      expect(res.body).to.be.a('Array');
      done();
    });
  });
});

xdescribe('Post /api/item', ()=>{
  let user;
  beforeEach((done)=>{
    User.findOne({username: 'Hannah' }, (err, firstUser)=>{
      user = firstUser;
      done();
    });
  });


  it('should return a 201status and have all the properties',(done)=>{
    const item = {
      name: 'Bacon',
      createdBy: user.id,
      price: 117,
      image: 'ImageofBacon',
      description: 'Sweet Bacon',
      size: 'Hippo'
    };
    app.post('/api/item')
  .send(item)
  .end((err, res)=>{
    console.log(res);
    expect(res.status).to.equal(204);
    expect(res.body).to.be.a('object');
    done();
  });
  });
});

xdescribe('get api/item/:id', ()=>{
  let user;
  beforeEach((done)=>{
    user = new User({
      username: 'Rocky',
      password: 'hippo',
      email: 'zoo@loo',
      location: 'sweden',
      profileImage: 'missHomeRip',
      passwordConfirmation: 'hippo'});
    done();

  });


  it('should return one item', ()=>{
    const item = new Item({
      name: 'Short pink shiny dress',
      price: 4,
      image: '/images/seed-pics/pink.jpg',
      description: 'Sexy pink dress, show-stopper.',
      rating: '',
      size: 'M',
      catagory: 'Women',
      createdBy: user.id
    });
    item.save((err, item)=>{
      //chai.request(server)
      app.get(`/api/item/${item.id}`)
      .end((err, res)=>{
        console.log(res);
        expect(res.status).to.equal(200);
        expect(res.body).be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('name');
      });
    });
  });

});

xdescribe('PUT /api/item/:id', ()=>{
  let user;
  beforeEach((done)=>{
    user = new User({
      username: 'Rocky',
      password: 'hippo',
      email: 'zoo@loo',
      location: 'sweden',
      profileImage: 'missHomeRip',
      passwordConfirmation: 'hippo'});
    done();

  });
  it('should update our selected item',(done)=>{
    const item = new Item({
      name: 'Short pink shiny dress',
      price: 4,
      image: '/images/seed-pics/pink.jpg',
      description: 'Sexy pink dress, show-stopper.',
      rating: '2',
      size: 'M',
      catagory: 'Women',
      createdBy: user.id
    });
    item.save((err, item)=>{

      app.put(`/api/item/${item.id}`)
        .send({
          name: 'Peter Griffin',
          price: 4,
          image: '/images/seed-pics/pink.jpg',
          description: 'Sexy pink dress, show-stopper.',
          rating: '2',
          size: 'M',
          catagory: 'Women',
          createdBy: user.id})
        .end((err, res)=>{
          expect(res.status).to.equal(200);
          expect(res.text).to.have.contain('Peter Griffin');
          expect(res.text).to.contain(4);
          expect(res.text).to.contain('/images/seed-pics/pink.jpg');
          expect(res.text).to.contain('Sexy pink dress, show-stopper.');
          expect(res.text).to.contain('M');
          expect(res.text).to.contain('Women');
          expect(res.text).to.contain('2');
          done();
        });
    });
  });
});
