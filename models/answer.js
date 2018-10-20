var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Answer = new Schema({
    student: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    // question: { type: Schema.Types.ObjectId, ref: 'CustomQuestion'},
    date: {type: Date, required: true},
    answer1: String,
    answer2: String,
    answer3: String
});

module.exports = mongoose.model('Answer', Answer);