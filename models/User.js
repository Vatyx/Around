var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    githubUsername : {type: String, required: true},
    githubEmail    : {type: String, required: true},
    achievements   : []
    //TODO Add more stuff
});

userSchema.statics.findOrCreate = function(parameters, callback){
    mongoose.model('User').findOne({"githubUsername": parameters.githubUsername}, function(err, user){
        if (err) return callback(err);
        if(user) return callback(null, user);
        mongoose.model('User').create(parameters, function (err, user){user.init; callback(err,user)});
    });
};

userSchema.methods.init = function(){};

module.exports = mongoose.model('User', userSchema);
