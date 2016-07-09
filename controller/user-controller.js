var User = require('../models/User.js');
var mongoose = 
UserController = {};
AllAchievements = [];

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
	
	pendingAchievements = [];
	for each (var achievement in AllAchievements) {
		 if(achievement.check(fileString)) {
			 pendingAchievements.push(achievement);
		 }
	}

    console.log(req.user)
    res.json(pendingAchievements);

};

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

	var Achievements = require('../models/Achievements')
	Achievements.find({language: req.params.language}, function(err, a){console.log(a)}
};
module.exports = UserController;
