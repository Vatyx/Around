'use strict'

var User = require('../models/User.js');

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

UserController.achievements = function(req, res, render) {
	language = req.params.language
	languageAchievements = [];
	for each (var achievement in AllAchievements) {
		if (achievement.language === language) {
			languageAchievements.push(achievement)
		}
	}
	console.log(languageAchievements);
	res.json(languageAchievements)
};
module.exports = UserController;
