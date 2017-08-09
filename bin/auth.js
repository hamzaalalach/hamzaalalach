var express = require('express'),
    actions = require('./actions'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy;
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  actions.getUserById(id, function(user) {
  	done(null, user);
  });
});
passport.use(new localStrategy(
	function(username, password, done) {
		actions.getUserByUsername(username, function(user) {
			actions.comparePassword(password, user.password, function(isMatch) {
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			});
		});
	}
));
module.exports = passport;
