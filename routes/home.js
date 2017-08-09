var express = require('express'),
		router = express.Router(),
		actions = require('../bin/actions');
router.get('/', function(req, res) {
	actions.findAll(function(data) {
		res.render('index', {data});
	})
});
module.exports = router;
