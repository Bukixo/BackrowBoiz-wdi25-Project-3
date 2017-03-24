const router = require('express').Router();
const userController = require('../controllers/user');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router.route('/users')
  .get(userController.index)
  .post(userController.create);

router.route('/users/:id')
  .get(userController.show)
  .put(userController.update)
  .delete(userController.delete);

// router.route('/register')
//   .post(auth.register);
//
// router.route('/login')
//   .post(auth.login);


// catch all 404 response
router.all('*', (req, res) => res.notFound());

module.exports = router;
