const router = require('express').Router();
const userController = require('../controllers/user');
const itemController = require('../controllers/item');
const requestController = require('../controllers/request');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');
const imageUpload = require('../lib/imageUpload');


router.route('/users')
  .get(userController.index); //landing page

router.route('/users/:id')
  .get(userController.show)
  .put(secureRoute, userController.update)
  .delete(userController.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/item')
  .get(imageUpload, itemController.index)
  .post(itemController.create);

router.route('/request')
  .get(requestController.index)
  .post(requestController.create);

router.route('/request/:id')
  .get(requestController.show)
  .delete(requestController.delete);

router.route('/item/:id')
  .get(itemController.show)
  .put(imageUpload, itemController.update)
  .post(requestController.create)
  .delete(itemController.delete);

router.route('/item/:id/comments')
  .post(itemController.createComment);

router.route('/item/:id/comments/:commentId')
  .delete(itemController.deleteComment);

// catch all 404 response
router.all('*', (req, res) => res.notFound());

module.exports = router;
