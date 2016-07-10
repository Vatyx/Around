var express = require('express');
var router = express.Router();

var dashboardController = require('../controller/dashboard-controller');

router.get('/', function(req, res, next) {
	res.render('dashboard');
	res.end();
});

router.get('/me', dashboardController.me);

module.exports = router;
