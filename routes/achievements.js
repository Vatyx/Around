var express = require('express');
var router = express.Router();

var achievementsController = require('../controller/achievements-controller');

router.get('/:language', achievementsController.start);

module.exports = router;
