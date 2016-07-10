'use strict'


var GitHubApi = require("github");
var User = require('../models/User');
var cron = require('node-cron');
var m = require('mongoose');

var PullController = {};
var GITHUB_TOKEN = "a1cddf2b65c9e7f6c6fb6ff76da312ec065ef454";


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

PullController.start = function(req, res, next){
    console.log("starting poll")
	var TIMEOUT = 2 //TODO change

	cron.schedule('1 * * * * *', function(){
		console.log('running every second');
	  	m.model('User').find({}, function(err, users){
	  		if (err) return next(err)
	  		if (0 === users.length) return next(new NotFoundError)
	  		users.forEach(function(user){
				github.authenticate({
				   type: "oauth",
				   token: GITHUB_TOKEN
				});
				github.activity.getEventsForUser({user:user.githubUsername, page:1, per_page:10}, function(err,resp){
					if (err) return next(err);
					resp.forEach(function(item){
						if (item['type']==='PushEvent') {
							var timeStamp = new Date(item['created_at'])
							var time_diff = new Date() - timeStamp
							if (time_diff/60000 < TIMEOUT) {
								console.log(item['repo']['name'])
								var d = new Date()
                                // user.scanRepo
							}
						}
					});
				});
	  		});
	  	});
	}, true);
};

module.exports = PullController;

