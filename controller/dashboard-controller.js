'use strict'

var DashboardController = {};

DashboardController.me = function(req, res, render) {
    console.log("User test function");

    console.log(req.user)
    res.json(req.user);

};

module.exports = DashboardController;
