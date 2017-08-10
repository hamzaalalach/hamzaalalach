var express = require('express'),
    router = express.Router(),
    actions = require('../bin/actions');
router.get('/boss', ensureAuthenticated, function(req, res) {
  res.render('boss');
});
router.post('/boss/newpost/:title/:category/:size/:content/', ensureAuthenticated, function(req, res) {
  actions.createStory(req.params.title, req.params.category, req.params.content, req.params.size, function(story) {
    res.send(JSON.stringify(story));
  });
});
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.render('login');
	}
}
module.exports = router;
