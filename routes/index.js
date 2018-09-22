var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var authentication = require('../middlewares/authentication'); //authentication middlewares


router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    if (req.body.password != req.body.passwordConf) {
        return res.render('register', {info: "Password and Password Confirmation don't match!"})
    }

    Account.register(new Account({ username : req.body.username, email: req.body.email, block: req.body.block }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/questions', authentication.isLoggedIn, function(req, res) {
  res.render('questions', {user: req.user});
});

router.get('/history', authentication.isLoggedIn, function(req, res) {
  res.render('history', {user: req.user});
});

router.get('/historyAdmin', authentication.isLoggedIn, authentication.isAdmin, function(req, res) {
  res.render('historyAdmin', {user: req.user});
});

router.get('/admin', authentication.isLoggedIn, authentication.isAdmin, function(req, res) {
  res.render('admin', {user: req.user});
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;