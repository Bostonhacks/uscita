var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var CustomQuestion = require('../models/custom_question');
var Answer = require('../models/answer');
var router = express.Router();
var authentication = require('../middlewares/authentication'); //authentication middlewares
var moment = require('moment');

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
  // hack around -4 time zone of US. Change to -5 for Ecuador
  CustomQuestion.findOne({date: moment().startOf("day").subtract(4, "hours").toISOString()}, (err, question) => {
    // if cannot find question of the day
    if (question) {
      res.render('questions', {user: req.user, custom_question: question.question});
    } else {
      res.render('questions', {user: req.user, custom_question: "You can skip this one"});
    }    
  });  
});

// handle answer submission
router.post('/questions', authentication.isLoggedIn, function(req, res){
  console.log(moment());
  Answer.create({
    student: req.user._id,
    date: moment().startOf("day").subtract(4, "hours"), // -4 time zone of Boston
    answer1: req.body.question1,
    answer2: req.body.question2,
    answer3: req.body.question3
  }, function(err, answer){
    if (err) {
      return res.render('questions', {info: err});
    }
  });
  res.redirect("/questions");
});

router.get('/history', authentication.isLoggedIn, function(req, res) {
  Answer.find({student: req.user._id}, null, {sort: {date: -1}}, (err, answers) => {
    if (err) {
      return res.render('history', {info: err});
    }
    res.render('history', {user: req.user, answers: answers});
  });
});

router.get('/historyAdmin', authentication.isLoggedIn, authentication.isAdmin, function(req, res) {
  res.render('historyAdmin', {user: req.user});
});

router.get('/admin', authentication.isLoggedIn, authentication.isAdmin, function(req, res) {
  res.render('admin', {user: req.user, current_date: moment().format('YYYY-MM-DD')} );
});

router.post('/admin', authentication.isLoggedIn, authentication.isAdmin, function(req, res) {
    let date = new Date(req.body.date);
    CustomQuestion.create({question: req.body.question, date: date}, function(err, question){
      if (err) {
        return res.render('admin', {info: err}); // FIX TO HAVE BETTER ERROR MESSAGES
      }
      res.redirect('/');
    });
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;