var currentLanguage = "";

Vue.component('goal', {
  template: "#goal-template",
  props: ['goal']
});

Vue.component('language', {
  template: "#language-template",
  props: ['language']
});

Vue.component('achievement', {
  template: "#achievement-template",
  props: ['achievement']
});

Vue.component('expand', {
  template: "#expand-template",
  props: ['expand']
});

var vm = new Vue({
  el: "#lists",
  data: {
    goals: [{
                title: "Oh looky a title",
                points: 15,
				desc: "This will be more descriptive once we have actual achievements",
				code: "var a = x;\n console.log(a);"
            },
            {
                title: "Oh looky a title",
                points: 15,
				desc: "This will be more descriptive once we have actual achievements",
				code: "var a = x; console.log(a);"
            },
            {
				title: "Oh looky a title",
				points: 15,
				desc: "This will be more descriptive once we have actual achievements",
				code: "var a = x; console.log(a);"
            }],
	languages: [{
					imgsrc: "https://golang.org/doc/gopher/gopherbw.png",
					language: "Go",
					progress: 50
				},
				{
					imgsrc: "https://camo.githubusercontent.com/eb464a60a4a47f8b600aa71bfbc6aff3fe5c5392/68747470733a2f2f7261772e6769746875622e636f6d2f766f6f646f6f74696b69676f642f6c6f676f2e6a732f6d61737465722f6a732e706e67",
					language: "Javascript",
					progress: 80
				}],
    achievements: [{
                title: "Oh looky a title",
                points: 15,
				desc: "This will be more descriptive once we have actual achievements",
            },
            {
                title: "Oh looky a title",
                points: 15,
				desc: "This will be more descriptive once we have actual achievements",
            },
            {
				title: "Oh looky a title",
				points: 15,
				desc: "This will be more descriptive once we have actual achievements",
            }]
  }
});

var another = new Vue({
  el: "#mine",
  data: {
    achievements: [{
                title: "Oh looky a title",
                points: 15,
				desc: "This will be more descriptive once we have actual achievements",
            },
            {
                title: "Oh looky a title",
                points: 15,
				desc: "This will be more descriptive once we have actual achievements",
            },
            {
				title: "Oh looky a title",
				points: 15,
				desc: "This will be more descriptive once we have actual achievements",
            }],
	expands: [{
				title: "name",
				points: 15,
				desc: "sdafasdfasdf",
				sample: "asdfhasdklfjasd"
			}]
  }
});

var ex = new Vue({
	el: "#expanding",
	data: {
	expands: [{
			}]
	}
});


$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

var achievements = [];
var test;
var mock = {"username":"codefitTEst","completedAchievements":[{"id":"5781ec2dfceb956c1f321dfc","url":"https://github.com/codefitTEst/test1/blob/master/test.js#L3","_id":"5782704aae6dc5f0533080b5"},{"id":"5781ec2dfceb956c1f321e04","url":"https://github.com/codefitTEst/test1/blob/master/test.js#L6","_id":"578271119f6c1bd159185f92"}],"allAchievements":[{"_id":"5781ec2dfceb956c1f321dfb","name":"Declaring a Variable","language":"JavaScript","description":"You declared your first variable in JavaScript!","points":50,"image":"quote","sample":"var a = 5;","pattern":"const [a-zA-Z0-9_] =","__v":0},{"_id":"5781ec2dfceb956c1f321dff","name":"To Code or not to Code","language":"JavaScript","description":"You've used an IF statement","points":50,"image":"ruby","sample":"if (a == 5) {\nconsole.log('wooo')}","pattern":"if((.*)){","__v":0},{"_id":"5781ec2dfceb956c1f321e00","name":"Sharing is Caring I","language":"JavaScript","description":"Exporting using module.exports","points":50,"image":"ruby","sample":"var controller = {}; module.exports = controller;","pattern":"module.exports","__v":0},{"_id":"5781ec2dfceb956c1f321e01","name":"Sharing is Caring II","language":"JavaScript","description":"Exporting CommonJS modules","points":50,"image":"ruby","sample":"TODO","pattern":"export const","__v":0},{"_id":"5781ec2dfceb956c1f321e02","name":"Stay Classy","language":"JavaScript","description":"You've made your first class in JS","points":50,"image":"ruby","sample":"TODO","pattern":"class","__v":0},{"_id":"5781ec2dfceb956c1f321e03","name":"Afunctionado I","language":"JavaScript","description":"You've used MAP! You're on your way to learning functional programming","points":50,"image":"ruby","sample":"[1,2,3].map(function(a){return a+1});","pattern":".map","__v":0},{"_id":"5781ec2dfceb956c1f321e04","name":"Afunctionado II","language":"JavaScript","description":"You've used REDUCE!","points":50,"image":"ruby","sample":"[1,2,3].reduce(function(a,b){return a+b},0)","pattern":".reduce","__v":0},{"_id":"5781ec2dfceb956c1f321dfe","name":"Use Promises","language":"JavaScript","description":"Sometimes promises work even better than callbacks","points":50,"image":"ruby","sample":"return new Promise(function(resolve, reject){resolve(1)})","pattern":"new Promise","__v":0},{"_id":"5781ec2dfceb956c1f321dfc","name":"Hello World!","language":"JavaScript","description":"You're on your way to becoming a JavaScript guru","points":50,"image":"octoface","sample":"console.log('hello world')","pattern":"console.log((.*))","__v":0},{"_id":"5782728ce990f9f6ebbb7c4e","name":"Declarae a Variable","language":"JavaScript","description":"varvarvar","points":50,"image":"ruby","sample":"var a = 5;","pattern":"var (.*) =","__v":0},{"_id":"57827370e990f9f6ebbb7c50","name":"What time is it?","language":"JavaScript","description":"Use a date object","points":50,"image":"ruby","sample":"var a = new Date();","pattern":"new Date(","__v":0}],"points":100}

$.get("/dashboard/info", function(data){
	console.log(data);
	achievements = [];
	var goals = [];
	var allAchievements = data["allAchievements"];
	for(var i = 0; i < allAchievements.length; i++) {
		for(var j = 0; j < data["completedAchievements"].length; j++) {
			if(data["completedAchievements"][j]["id"] == allAchievements[i]["_id"]) {
				allAchievements[i].color = "lightgreen";	
				allAchievements[i].url = data["completedAchievements"][j]["url"];
				console.log("got it");
			}
			else {
				allAchievements[i].color = "black";
			}
		}
		achievements.push(allAchievements[i]);
	}
	for(var i = 0; i < 5; i++) {
		goals.push(allAchievements[i]);
	}
	vm.goals = goals;
	another.achievements = achievements;

	temp = allAchievements.filter(function(a) {return (a.completed === true)});
	obj = {imgsrc:"https://camo.githubusercontent.com/eb464a60a4a47f8b600aa71bfbc6aff3fe5c5392/68747470733a2f2f7261772e6769746875622e636f6d2f766f6f646f6f74696b69676f642f6c6f676f2e6a732f6d61737465722f6a732e706e67", language: "Javascript", progress: (temp.length / allAchievements.length) * 100}
	vm.languages = [obj];
});

setInterval(function () {
$.get("/dashboard/info", function(data){
	console.log(data);
	achievements = [];
	var goals = [];
	var names = [];
	var allAchievements = data["allAchievements"];
	for(var i = 0; i < allAchievements.length; i++) {
		for(var j = 0; j < data["completedAchievements"].length; j++) {
			if(data["completedAchievements"][j]["id"] == allAchievements[i]["_id"]) {
				allAchievements[i].color = "lightgreen";	
				allAchievements[i].url = data["completedAchievements"][j]["url"];
				names.push(allAchievements[i].name);
				console.log("got it");
			}
			else {
				allAchievements[i].color = "black";
			}
		}
		achievements.push(allAchievements[i]);
	}
	for(var i = 0; i < 5; i++) {
		goals.push(allAchievements[i]);
	}
	vm.goals = goals;
	another.achievements = achievements;
	
	temp = allAchievements.filter(function(a) {return (a.completed === true)});
	obj = {imgsrc:"https://camo.githubusercontent.com/eb464a60a4a47f8b600aa71bfbc6aff3fe5c5392/68747470733a2f2f7261772e6769746875622e636f6d2f766f6f646f6f74696b69676f642f6c6f676f2e6a732f6d61737465722f6a732e706e67", language: "Javascript", progress: (temp.length / allAchievements.length) * 100}
});
	vm.languages = [obj];
	
}, 5000);

function loadNew(id) {
	var str = id;
$.get("/dashboard/info", function(data){
	var allAchievements = data["allAchievements"];
	for(var i = 0; i < allAchievements.length; i++) {
		for(var j = 0; j < data["completedAchievements"].length; j++) {
			if(data["completedAchievements"][j]["id"] == allAchievements[i]["_id"]) {
				allAchievements[i].color = "lightgreen";	
				allAchievements[i].url = data["completedAchievements"][j]["url"];
				console.log("here it");
			}
			else {
				allAchievements[i].color = "black";
			}
		}
		temp = allAchievements.filter(function(a) { return (a.name === str)});
		console.log(temp.url, "yuep");
		ex.expands = temp;
	}
});
}

function nextPage() {
	currentLanguage = $(this).attr("id");
	$("#lists").addClass('animated fadeOutLeft');
	$("#titles").addClass('animated fadeOutLeft');
	$(".unique").show();
	$(".unique").addClass('animated fadeInRight');
}
