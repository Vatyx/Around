'use strict'

var User = require('../models/User.js');
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

UserController.save = function(req, res, render) {
    console.log("User save function");
	var language = req.body.language;
	var fileString = req.body.fileString;

    User.findOne({"githubUsername": user.githubUsername}, function(err, newUser){
        if (err) return;

		var pendingAchievements = AllAchievements.filter(function(a) { return (a.language === language || a.language === "general") })
												 .filter(function(a) { return (user.achievements.indexOf(a) === -1) })
												 .filter(function(a) { return (a.check(fileString)) });
    	res.json(pendingAchievements);
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
    console.log("test2")
    mongoose.model('User').find({}, function(err, users){
        console.log(err)
        console.log(JSON.stringify(users))
        res.send("OK")
    })
    // mongoose.model('Achievement').create({name:"name"}, function(err, a){
    //     console.log(JSON.stringify(a));
    //     mongoose.model('Achievement').find({}, function(err, aa){console.log("A"); console.log(aa); });
    // });
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


