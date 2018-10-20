var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomQuestion = new Schema({
    question: {type: String, required: true},
    date: {type: Date, unique: true, required: true, dropDups: true}
});

module.exports = mongoose.model('CustomQuestion', CustomQuestion);