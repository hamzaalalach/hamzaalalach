var express = require('express'),
    router = express.Router();
router.get('/boss', ensureAuthenticated, function(req, res) {
  res.render('boss');
});
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.render('login');
	}
}
module.exports = router;
