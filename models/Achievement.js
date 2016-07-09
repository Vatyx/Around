var mongoose = require('mongoose');


var achievementSchema = mongoose.Schema({
    name        : {type: String,   required: true},
    description : {type: String,   required: true},
    image       : {type: String,   required: true},
    language    : {type: String,   required: true}, //TODO use enum instead
    checkFn     : {type: Function, required: true},
    points      : {type: Number,   required: true},
});


module.exports = mongoose.model('Achievement', userSchema);
