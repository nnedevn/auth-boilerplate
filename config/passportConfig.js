var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var db = require('../models/');

// serialize and deserialize users (stringify and parse)

passport.serializeUser(function(user, callback) {
  //take the whole object and use just the id
  callback(null, user.id);
});

passport.deserializeUser(function(id, callback) {
  db.user.findById(id).then(function(user) {
    callback(null, user);
  }).catch(function(err) {
    //use the first argument of the callback to pass in the error
    callback(err, null);
  });
});
//define which fields are to be used for authentication
passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, callback) {
    db.user.findOne({
      where: {
        email: email
      }
    }).then(function(user){
      if(!user || !user.isValidPassword(password)){
        callback(null, false);
      } else {
        callback(null, user);
      }
    }).catch(function(err){
      callback(err, null);
    });
  }));

module.exports = passport;