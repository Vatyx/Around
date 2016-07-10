'use strict'

var User = require('../models/User.js');
var Achievements = require('../models/Achievement.js');
Achievements.initAchievements();

var Pulling = require('./pull-controller.js');
var mongoose = require('mongoose');



var UserController = {};
var AllAchievements = [];

UserController.me = function(req, res, render) {
    console.log("User test function");

    console.log(req.user)
    res.json(req.user);

};

UserController.mock = function(req, res, render) {
    console.log("User mock function");
	var achivements = {test: "test string"};

    console.log(req.user)
    res.json(achivements);

};

UserController.save = function(req, res, next) {
    console.log("User save function");
	var language = req.body.language;
	var fileString = req.body.fileString;
    var username = 'Fertogo';//TODO


    User.findOne({"githubUsername": username}, function(err, user){
        if (err) return next(err);

        res.json({pendingAchievements: Achievements.checkFile(user, language, fileString)});

	});
};

//Function to test getAllCode. TODO Remove.
UserController.test = function(req, res, next) {
    User.findOne({githubEmail: req.user.githubEmail}, function(err, user){
        user.getAllCode(function(results){
            res.json(results);
        });
    });
};

UserController.testtest = function(req, res, next) {
    User.findOne({githubEmail: req.user.githubEmail}, function(err, user){
        user.initAll();
    });
}


UserController.achievements = function(req, res, render) {
	// language = req.params.language
	// languageAchievements = [];
	// for each (var achievement in AllAchievements) {
	// 	if (achievement.language === language) {
	// 		languageAchievements.push(achievement)
	// 	}
	// }
	// console.log(languageAchievements);
	// res.json(languageAchievements)

	var Achievements = require('../models/Achievements.js')
	Achievements.find({language: req.params.language}, function(err, a){console.log(a)})
};
module.exports = UserController;


