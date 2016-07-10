'use strict'

var achievementsController = {};

achievementsController.start = function(req, res, render) {
    console.log("Inside achievements controller");
	var Achievements = require('../models/Achievements.js')
	Achievements.find({language: req.params.language}, function(err, achievements){
		console.log(achievements)
	});
    console.log(req.user)
    res.json(req.user);

};

module.exports = achievementsController;
