var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomQuestion = new Schema({
    question: String,
    date: Date
});

module.exports = mongoose.model('CustomQuestion', CustomQuestion);