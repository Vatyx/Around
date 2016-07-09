var express = require('express');
var router = express.Router();

var userController = require('../controller/user-controller');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/save', userController.mock);
router.get('/me', userController.me);

module.exports = router;
