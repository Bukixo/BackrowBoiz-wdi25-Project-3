const router = require('express').Router();
const userController = require('../controllers/user');

router.route('/users')
  .get(userController.index)
  .post(userController.create);

router.route('/users/:id')
  .get(userController.show)
  .put(userController.update)
  .delete(userController.delete);

// catch all 404 response
router.all('*', (req, res) => res.notFound());

module.exports = router;
