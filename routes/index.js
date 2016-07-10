var express = require('express');
var router = express.Router();
var User = require('../models/User');


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
  	res.end();
});

router.post('/git/hook', function(req, res, next){
    console.log("HOOK")
    // console.log(req.body);

    var author = req.body.head_commit.author.name;
    var repo   = req.body.repository.name;

    console.log(author);
    console.log(repo);

    User.findOne({githubUsername: author}, function(err, user){
        user.scanRepo(author, repo);
    })
    res.send("THANKSBRAH")
});

module.exports = router;
