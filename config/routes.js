const router = require('express').Router();
const userController = require('../controllers/user');
const itemController = require('../controllers/item');
const requestController = require('../controllers/request');
const auth = require('../controllers/auth');
const oauth = require('../controllers/oauth');
const geoCoder = require('../controllers/geoCoder');
const secureRoute = require('../lib/secureRoute');
const imageUpload = require('../lib/imageUpload');


router.route('/location')
.get(geoCoder.getLocation);

router.route('/users')
  .get(userController.index); //landing page

router.route('/users/:id')
  .get(userController.show)
  .put(imageUpload, userController.update)
  .delete(userController.delete);

router.route('/register')
  .post(imageUpload, auth.register);

router.route('/login')
  .post(auth.login);

router.route('/request')
  .get(requestController.index)
  .post(requestController.create);

router.route('/request/:id')
  .get(requestController.show)
  .put(requestController.update)
  .delete(secureRoute, requestController.delete);

router.route('/request/decline/:id')
  .delete(secureRoute, requestController.decline);

router.route('/item')
  .get(itemController.index)
  .post(secureRoute, imageUpload, itemController.create);

router.route('/item/:id')
  .get(itemController.show)
  .put(imageUpload, itemController.update)
  // .post(requestController.create)
  .delete(itemController.delete);

router.route('/item/:id/comments')
  .post(secureRoute, itemController.createComment);

router.route('/item/:id/comments/:commentId')
  .delete(itemController.deleteComment);

router.route('/profile')
  .get(secureRoute, userController.profile);

router.route('/payment')
  .get(requestController.payment)
  .post(requestController.postPayment);

router.route('/oauth/github')
  .post(oauth.github);

router.route('/oauth/facebook')
  .post(oauth.facebook);

router.route('/oauth/instagram')
  .post(oauth.instagram);
// catch all 404 response
router.all('*', (req, res) => res.notFound());

module.exports = router;
