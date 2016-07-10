var express = require('express');
var router = express.Router();

var userController = require('../controller/user-controller');

function authenticate(req, res, next) {
    if (req.user) next();
    else res.redirect('/auth');
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/save', userController.mock);
router.get('/me', userController.me);

router.get('/allcode', authenticate, userController.test);

module.exports = router;
