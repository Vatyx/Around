var express = require('express');
var router = express.Router();

var Achievements = require('../models/Achievement.js');


/* GET home page. */
router.post('/addAchievements', function(req, res, next) {
    console.log("adding achievement");

    var achievements = req.body.achievements;
    var promises = [];
    achievements.forEach(function(a){
        var promise = Achievements.create(a);
        promises.push(promise);
    });
    Promise.all(promises).then(function(p){
        res.json(p);
    })
});

module.exports = router;
