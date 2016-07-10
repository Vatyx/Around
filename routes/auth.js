var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GitHubStrategy({
        //TODO Make this oauth
        clientID: 'e8fb29470d9300f226b0',
        clientSecret: '6d74d44bd0e389a3eb783d1a554c7942e71ca3f4',
        callbackURL: "http://localhost:3000" + "/auth/callback" }, function(accessToken, refreshToken, profile, done) {
            mongoose.model('User')
                .findOrCreate({ githubUsername: profile.username,
                                githubEmail: profile.emails ? profile.emails[0].value : "no@email.com",
                                githubToken: accessToken,
                               },
                function (err, user) {
                    return done(err, user);
                });
        }
));

router.get('/',passport.authenticate('github'));

router.get('/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
        function(req, res) {
            console.log("call")
            res.redirect('/dashboard/info'); //TODO change
        }
    );

router.post('/logout', function(req, res){
    req.session.destroy();
    res.status(200).send({ "message": "Logout successful" });
});

module.exports = router;
