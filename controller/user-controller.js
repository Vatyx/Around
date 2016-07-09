var User = require('../models/User.js');

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


module.exports = UserController;
