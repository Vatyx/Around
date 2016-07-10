var mongoose = require('mongoose');
require('mongoose-function')(mongoose);

var achievementSchema = mongoose.Schema({
    name        : {type: String,   required: true},
    description : {type: String,   required: true},
    image       : {type: String,   required: true},
    language    : {type: String,   required: true}, //TODO use enum instead
    checkFn     : {type: Function, required: true},
    points      : {type: Number,   required: true},
    sample      : {type: String,   required: true},
});

var allAchievements = [];

achievementSchema.statics.initAchievements = function() {
    this.find({}, function(err, achievements){
        console.log("got all achievements");
        allAchievements = achievements;
    });
}

achievementSchema.statics.checkFile = function(user, language, fileString) {
    // console.log(fileString);
    fulfilledAchievements = allAchievements.filter(function(a) { return a.language === language})
                                           .filter(function(a){ return a.checkFn(fileString)})
                                           .filter(function(a) { return (user.achievements.indexOf(a) === -1) });

    console.log(JSON.stringify(fulfilledAchievements));
    return fulfilledAchievements;
}


module.exports = mongoose.model('Achievement', achievementSchema);
