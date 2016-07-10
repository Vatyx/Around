'use strict'

var User = require('../models/User.js');
var Achievements = require('../models/Achievement.js');


var DashboardController = {};


DashboardController.me = function(req, res, render) {
    console.log("User test function");

    console.log(req.user)
    res.json(req.user);

};

DashboardController.getInfo = function(req, res, next) {

    //Get all achievements for each language.
    var response = {};
    User.findOne({githubUsername: req.user.githubUsername}, function(err, user){
        if (err) return next(err);
        response.username = user.githubUsername;
        response.completedAchievements = user.achievements;
        response.allAchievements = Achievements.getAll();
        console.log(user);
        console.log("a");
        user.getPoints().then(function(points){
            console.log(points);
            response.points = points;
            res.json(response);
        })
    });


}

module.exports = DashboardController;
