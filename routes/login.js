var express = require('express'),
    router = express.Router(),
		passport = require('../bin/auth');
router.get('/login', function(req, res) {
  res.render('login');
});
router.post('/login',
  passport.authenticate('local', {successRedirect: '/boss', failureRedirect: '/login'}),
  function(req, res) {
    res.redirect('/');
});
module.exports = router;
