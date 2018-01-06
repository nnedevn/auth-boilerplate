var express = require('express');
var router = express.Router();
var passport = require('../config/passportConfig.js');
var db = require('../models/');

router.get('/login', function(req,res){
  res.render('auth/login.ejs');
})

router.post('/login', passport.authenticate('local', {
            successRedirect: '/profile',
            successFlash: 'Login Successful',
            failureRedirect: '/auth/login',
            failureFlash: 'Incorect Credentials'
}));

router.get('/signup', function(req, res){
  res.render('auth/signup.ejs');
});

router.post('/signup', function(req, res, next){
  console.log(req.body);
  db.user.findOrCreate({
    where: {email:req.body.email},
    defaults: {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password
    }
  }).spread(function(user, wasCreated){
    if(wasCreated){
      //Good job you didn't try to make a duplicate!
      //passport.authenticate returns a fx
      passport.authenticate('local', {
        successRedirect: '/profile',
        successFlash: 'Successfully logged in.',
      })(req, res, next);
    } else {
      //Tried signing up when had to log in.
      req.flash('error', 'Email already exists.');
      res.redirect('/auth/login');
    }
  }).catch(function(err){
    req.flash('error', err.message);
    res.redirect('/auth/signup');
  });
});

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'Successfully logged out.');
  res.redirect('/');
});

module.exports = router;