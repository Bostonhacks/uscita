var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    email: String,
    password: String,
    block: String, // might change later, depending on the format
    admin: Boolean
});

Account.plugin(passportLocalMongoose, { usernameField : 'email' }); //use email as source of identification

module.exports = mongoose.model('Account', Account);