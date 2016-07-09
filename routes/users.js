var express = require('express');
var router = express.Router();

var userController = require('../controller/user-controller');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/save', userController.mock);
router.get('/me', userController.me);
router.get('/achivements/:language', userController.achievements);

module.exports = router;
