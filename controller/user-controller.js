var User = require('../models/User.js');

UserController = {};


UserController.me = function(req, res, render) {
    console.log("User test function");

    console.log(req.user)
    res.json(req.user);

};


module.exports = UserController;
