var express = require('express'),
    router = express.Router(),
    actions = require('../bin/actions');
router.get('/boss', ensureAuthenticated, function(req, res) {
  var user = req.user;
  actions.findAll(function(stories) {
    user.stories = stories;
    user.storiesL = oLength(stories);
    for (var x in user.stories) {
      if (user.stories[x].size == 'l') {
        user.stories[x].size = 'Large';
      } else if (user.stories[x].size == 'm') {
        user.stories[x].size = 'Medium';
      } else {
        user.stories[x].size = 'Small';
      }
    }
    res.render('boss', {user});
  });
});
router.post('/boss/newStory/:title/:category/:size/:content/', ensureAuthenticated, function(req, res) {
  actions.createStory(req.params.title, req.params.category, req.params.content, req.params.size, function(story) {
    res.send(JSON.stringify(story));
  });
});
router.post('/boss/updateStory/:id/:title/:category/:size/:content/', ensureAuthenticated, function(req, res) {
  actions.updateStory(req.params.id, req.params.title, req.params.category, req.params.content, req.params.size, function(story) {
    res.send(JSON.stringify(story));
  });
});
router.post('/boss/removeStory/:id/', ensureAuthenticated, function(req, res) {
  actions.removeStory(req.params.id);
});
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.render('login');
	}
}
function oLength(o) {
  var length = 0;
  for (var i in o) {
    length++;
  }
  return length;
}
module.exports = router;
