var User = require('../models/User.js');

UserController = {};


UserController.me = function(req, res, render) {
    console.log("User test function");

    console.log(req.user)
    res.json(req.user);

};

UserController.mock = function(req, res, render) {
    console.log("User mock function");
    console.log(req.body.language);
    console.log(req.body.fileString);

	var achivements = {
        pendingAchievements: [
            {
                name : "hello world",
                description: "cool dude",
                image : "no"
            },
            {
                name : "hello world2",
                description: "cool dude2",
                image : "no2"
            },

        ]
    };

    res.json(achivements);

};

UserController.save = function(req, res, render) {
    console.log("User save function");
	var achivements = {test: "save string"};

    console.log(req.user)
    res.json(achivements);

};

//Function to test getAllCode. TODO Remove.
UserController.test = function(req, res, next) {
    User.findOne({githubEmail: req.user.githubEmail}, function(err, user){
        user.getAllCode(function(results){
            res.json(results);
        });
    });
};


module.exports = UserController;
