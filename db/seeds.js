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

    return Item.create([{
      name: 'Addidas Jumper',
      price: 3,
      image: '/images/seed-pics/Addidas.jpg',
      description: 'Vinateg, mens jumper in perfect conditon - well loved!',
      rating: '',
      size: 'M',
      createdBy: users[1]
    }, {
      name: 'Black Evening Dress',
      price: 10,
      image: '/images/seed-pics/black.jpg',
      description: 'Stunning fit and covering the shoulders. Extremely popular from a smoke free home',
      rating: '',
      size: 'S',
      createdBy: users[1]
    }, {
      name: 'Chic Chiffon Dress',
      price: 15,
      image: '/images/seed-pics/blackc.jpg',
      description: 'A real show-stopper, black chiffon and netting with pink roses.',
      rating: '',
      size: 'S',
      createdBy: users[1]
    }, {
      name: 'Blue dress with diamond waistband',
      price: 20,
      image: '/images/seed-pics/blu.jpg',
      description: 'Glamourous long blue dress with diamond detail',
      rating: '',
      size: 'L',
      createdBy: users[1]
    }, {
      name: 'Cream Cardigan',
      price: 4,
      image: '/images/seed-pics/cardy.jpg',
      description: 'Obviously a typical part of any man’s wardrobe never be without it again. Not to be worn by women, super edgy and alternative',
      rating: '',
      size: 'M',
      createdBy: users[0]
    }, {
      name: 'Long Grey Cardigan',
      price: 4,
      image: '/images/seed-pics/cardy2.jpg',
      description: 'Not to be worn by women, super edgy and alternative',
      rating: '',
      size: 'M',
      createdBy: users[1]
    }, {
      name: 'Burberry Coat',
      price: 21,
      image: '/images/seed-pics/coat.jpg',
      description: 'Classic long trench coat',
      rating: '',
      size: 'M',
      createdBy: users[1]
    }, {
      name: 'Vintage bomber jacket',
      price: 15,
      image: '/images/seed-pics/coat2.jpg',
      description: 'Classic style, well-worn and loved - keep cosy this winter!',
      rating: '',
      size: 'M',
      createdBy: users[1]
    }, {
      name: 'Burberry coat',
      price: 22,
      image: '/images/seed-pics/coat3.jpg',
      description: 'Short Burberry trench coat - limited edition',
      rating: '',
      size: 'M',
      createdBy: users[1]
    }, {
      name: 'Burberry coat',
      price: 18,
      image: '/images/seed-pics/coat4.jpg',
      description: 'Japanese detail, slim fit, limited edition',
      rating: '',
      size: 'S',
      createdBy: users[0]
    }, {
      name: 'Long Floral Dress',
      price: 15,
      image: '/images/seed-pics/flowers.jpg',
      description: 'Floaty, summer dress, blue and white flowers.',
      rating: '',
      size: 'L',
      createdBy: users[1]
    }, {
      name: 'Childs floral dress',
      price: 9,
      image: '/images/seed-pics/flowers2.jpg',
      description: 'Short red flowery dress with ruffles.',
      rating: '',
      size: 'M',
      createdBy: users[0]
    }, {
      name: 'Tudor style dress',
      price: 25,
      image: '/images/seed-pics/gold.jpg',
      description: 'Long Tudor style dress covering shoulders and arms, glamourous and elegant with empire line.',
      rating: '',
      size: 'L',
      createdBy: users[2]
    }, {
      name: 'Purple jeans',
      price: 15,
      image: '/images/seed-pics/jeans.jpg',
      description: 'Vintage jeans, Levis, classic fit',
      rating: '',
      size: 'L',
      createdBy: users[1]
    }, {
      name: 'Painty jeans',
      price: 8,
      image: '/images/seed-pics/jeans3.jpg',
      description: 'Children\'s jeans, super fun with paint splatters',
      rating: '',
      size: 'S',
      createdBy: users[1]
    }, {
      name: 'Vintage Jumper',
      price: 8,
      image: '/images/seed-pics/jumper.jpg',
      description: 'Colourful and well loved, stand out from the crowd and keep cosy warm.',
      rating: '',
      size: 'M',
      createdBy: users[1]
    }, {
      name: 'Micky Mouse t-shirt',
      price: 8,
      image: '/images/seed-pics/mcky.jpg',
      description: 'Fun kid\'s t-shirt, light pink',
      rating: '',
      size: 'S',
      createdBy: users[2]
    }, {
      name: 'Short pink shiny dress',
      price: 4,
      image: '/images/seed-pics/pink.jpg',
      description: 'Sexy pink dress, show-stopper.',
      rating: '',
      size: 'M',
      createdBy: users[1]
    }, {
      name: 'Child\'s light pink summer dress',
      price: 10,
      image: '/images/seed-pics/pink2.jpg',
      description: 'Playful and flowery, ideal for weddings or summer gatherings',
      rating: '',
      size: 'M',
      createdBy: users[1]
    }, {
      name: 'Pink patterned trousers',
      price: 5,
      image: '/images/seed-pics/pinkt.jpg',
      description: 'Great for little girls - super cute!',
      rating: '',
      size: 'L',
      createdBy: users[1]
    }, {
      name: 'Gold evening dress',
      price: 18,
      image: '/images/seed-pics/gold2.jpg',
      description: 'Fitted elegant dress, stand out from the crowd with this metallic gold dazzler ',
      rating: '',
      size: 'S',
      createdBy: users[1]
    }, {
      name: 'Patterned girl\'s skirt',
      price: 9,
      image: '/images/seed-pics/skirt3.jpg',
      description: 'Cute light pink skirt with patterned flowers detail',
      rating: '',
      size: 'L',
      createdBy: users[2]
    }, {
      name: 'Hugo Boss Suit',
      price: 25,
      image: '/images/seed-pics/suit1.jpg',
      description: 'Tight fit, long trouser length, includes jacket and trousers, but not the shirt',
      rating: '',
      size: 'S',
      createdBy: users[1]
    }, {
      name: 'Linen Zara men\'s suit',
      price: 23,
      image: '/images/seed-pics/suit2.jpg',
      description: 'Great for summer, neat little suit - not too hot.  Shirt not included.',
      rating: '',
      size: 'M',
      createdBy: users[1]
    }, {
      name: 'Calvin Klein Suit',
      price: 35,
      image: '/images/seed-pics/suit3.jpg',
      description: 'Very high quality, has been looked after very well',
      rating: '',
      size: 'M',
      createdBy: users[1]
    }, {
      name: 'Tiger jumper',
      price: 6,
      image: '/images/seed-pics/tiger.jpg',
      description: 'Cute jumper for little girls, sequins are a nice touch',
      rating: '',
      size: 'L',
      createdBy: users[1]
    }, {
      name: 'Pink kid\'s t-shirt',
      price: 3,
      image: '/images/seed-pics/tshirt.jpg',
      description: 'Great with jeans for children',
      rating: '',
      size: 'M',
      createdBy: users[1]
    }, {
      name: 'Edgy Unicorn T-shirt',
      price: 4,
      image: '/images/seed-pics/unicorn.jpg',
      description: 'Limited edition hipster t-shirt',
      rating: '',
      size: 'L',
      createdBy: users[1]
    }, {
      name: 'Vintage sequined dress',
      price: 21,
      image: '/images/seed-pics/vint.jpg',
      description: 'Perfect for Gatsby themed events, glitzy and glamourous.  Silver',
      rating: '',
      size: 'M',
      createdBy: users[1]
    }, {
      name: 'Watermelon T-shirt',
      price: 3,
      image: '/images/seed-pics/watermelon.jpg',
      description: 'Cute girl\'s T-shirt',
      rating: '',
      size: 'M',
      createdBy: users[2]
    }, {
      name: 'Gucci red dress',
      price: 40,
      image: '/images/seed-pics/red.jpg',
      description: 'Stunning backless Gucci dress, absolute show-stopper.  Sexy, long and silk.',
      rating: '',
      size: 'M',
      createdBy: users[1]
    }])
    .then((items) => {
      console.log(`${items.length} items created!`);

      return Request
        .create([{
          numberOfDays: 12,
          item: items[0],
          requester: users[0],
          message: 'ITEMPOPULATE',
          accepted: false
        }]);
    });
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
