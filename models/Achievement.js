var mongoose = require('mongoose');


var achievementSchema = mongoose.Schema({
    name        : {type: String,   required: true},
    // description : {type: String,   required: true},
    // image       : {type: String,   required: true},
    // language    : {type: String,   required: true}, //TODO use enum instead
    // // checkFn     : {type: Function, required: true}, // TODO fix
    // points      : {type: Number,   required: true},
    // sample      : {type: String,   required: true},
});


achievementSchema.statics.checkFile = function(language, fileString) {
    // this.find({$or: [{language: language}, {language: "general"}]}, function(err, possibleAchievements))
}

module.exports = mongoose.model('Achievement', achievementSchema);
