'use strict'


var GitHubApi = require("github");
var User = require('../models/User.js');
var cron = require('node-cron');

var PullController = {};

var github = new GitHubApi({
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    pathPrefix: "", // for some GHEs; none for GitHub
    headers: {
        "user-agent": "him229" // GitHub is happy with a unique user agent
    },
    Promise: require('bluebird'),
    followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
    timeout: 5000
});

PullController.start = function(){
	cron.schedule('1 * * * * *', function(){
  	console.log('running every second');

  	User.find({}, function(err, users){
  		if (err) return next(err)
  		if (0 === users.length) return next(new NotFoundError)
  		users.forEach(function(user){
			github.authenticate({
			   type: "oauth",
			   token: user.githubToken
			});
			github.activity.getEventsForUser({user:user.username}, function(err,res){
				if (err) return next(err);
				console.log(res)
			});			
			var gh = new GitHub({
			   token: user.token
			});  

  		});	
  	});

	}, true);


};

module.exports = PullController;
