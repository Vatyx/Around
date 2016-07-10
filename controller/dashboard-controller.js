'use strict'

var User = require('../models/User.js');
var Achievements = require('../models/Achievement.js');


var DashboardController = {};


DashboardController.me = function(req, res, render) {
    console.log("User test function");

    console.log(req.user)
    res.json(req.user);

};

DashboardController.getInfo = function(req, res, next) {

    return res.json({"username":"codefitTEst","completedAchievements":[{"id":"5781ec2dfceb956c1f321dfc","url":"https://github.com/codefitTEst/test1/blob/master/test.js#L3","_id":"5782704aae6dc5f0533080b5"},{"id":"5781ec2dfceb956c1f321e04","url":"https://github.com/codefitTEst/test1/blob/master/test.js#L6","_id":"578271119f6c1bd159185f92"}],"allAchievements":[{"_id":"5781ec2dfceb956c1f321dfb","name":"Declaring a Variable","language":"JavaScript","description":"You declared your first variable in JavaScript!","points":50,"image":"quote","sample":"var a = 5;","pattern":"const [a-zA-Z0-9_] =","__v":0},{"_id":"5781ec2dfceb956c1f321dff","name":"To Code or not to Code","language":"JavaScript","description":"You've used an IF statement","points":50,"image":"ruby","sample":"if (a == 5) {\nconsole.log('wooo')}","pattern":"if((.*)){","__v":0},{"_id":"5781ec2dfceb956c1f321e00","name":"Sharing is Caring I","language":"JavaScript","description":"Exporting using module.exports","points":50,"image":"ruby","sample":"var controller = {}; module.exports = controller;","pattern":"module.exports","__v":0},{"_id":"5781ec2dfceb956c1f321e01","name":"Sharing is Caring II","language":"JavaScript","description":"Exporting CommonJS modules","points":50,"image":"ruby","sample":"TODO","pattern":"export const","__v":0},{"_id":"5781ec2dfceb956c1f321e02","name":"Stay Classy","language":"JavaScript","description":"You've made your first class in JS","points":50,"image":"ruby","sample":"TODO","pattern":"class","__v":0},{"_id":"5781ec2dfceb956c1f321e03","name":"Afunctionado I","language":"JavaScript","description":"You've used MAP! You're on your way to learning functional programming","points":50,"image":"ruby","sample":"[1,2,3].map(function(a){return a+1});","pattern":".map","__v":0},{"_id":"5781ec2dfceb956c1f321e04","name":"Afunctionado II","language":"JavaScript","description":"You've used REDUCE!","points":50,"image":"ruby","sample":"[1,2,3].reduce(function(a,b){return a+b},0)","pattern":".reduce","__v":0},{"_id":"5781ec2dfceb956c1f321dfe","name":"Use Promises","language":"JavaScript","description":"Sometimes promises work even better than callbacks","points":50,"image":"ruby","sample":"return new Promise(function(resolve, reject){resolve(1)})","pattern":"new Promise","__v":0},{"_id":"5781ec2dfceb956c1f321dfc","name":"Hello World!","language":"JavaScript","description":"You're on your way to becoming a JavaScript guru","points":50,"image":"octoface","sample":"console.log('hello world')","pattern":"console.log((.*))","__v":0},{"_id":"5782728ce990f9f6ebbb7c4e","name":"Declarae a Variable","language":"JavaScript","description":"varvarvar","points":50,"image":"ruby","sample":"var a = 5;","pattern":"var (.*) =","__v":0},{"_id":"57827370e990f9f6ebbb7c50","name":"What time is it?","language":"JavaScript","description":"Use a date object","points":50,"image":"ruby","sample":"var a = new Date();","pattern":"new Date(","__v":0}],"points":100})
    //Get all achievements for each language.
    var response = {};
    User.findOne({githubUsername: req.user.githubUsername}, function(err, user){
        if (err) return next(err);
        response.username = user.githubUsername;
        response.completedAchievements = user.achievements;
        response.allAchievements = Achievements.getAll();
        console.log(user);
        console.log("a");
        user.getPoints().then(function(points){
            console.log(points);
            response.points = points;
            res.json(response);
        })
    });


}

module.exports = DashboardController;
