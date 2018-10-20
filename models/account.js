var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    _id: Schema.Types.ObjectId,
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    block: {type: String, required: true}, // might change later, depending on the format
    admin: Boolean
});

Account.plugin(passportLocalMongoose, { usernameField : 'email' }); //use email as source of identification

module.exports = mongoose.model('Account', Account);