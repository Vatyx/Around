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
    achievement: [{
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

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

function nextPage() {
	currentLanguage = $(this).attr("id");
	$("#lists").addClass('animated fadeOutLeft');
	$("#titles").addClass('animated fadeOutLeft');
	$(".unique").show();
	$(".unique").addClass('animated fadeInRight');
}
