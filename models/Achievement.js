var mongoose = require('mongoose');

var achievementSchema = mongoose.Schema({
    name        : {type: String,   required: true},
    description : {type: String,   required: true},
    image       : {type: String,   required: true},
    language    : {type: String,   required: true}, //TODO use enum instead
    pattern     : {type: String,   required: true},
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

achievementSchema.statics.getAll = function(){
    return allAchievements;
}

achievementSchema.statics.checkFile = function(user, language, fileString) {
    console.log("Checking if File has new achievements")
    fulfilledAchievements = allAchievements.filter(function(a){ return a.language === language})
                                           .filter(function(a){ return RegExp(a.pattern).test(fileString)})
                                           .filter(function(a) {
                                                for (i in user.achievements){
                                                    if (user.achievements[i].id == a._id) return false;
                                                }
                                                return true;
                                            });

    console.log(JSON.stringify(fulfilledAchievements));

    return fulfilledAchievements;
}


module.exports = mongoose.model('Achievement', achievementSchema);
