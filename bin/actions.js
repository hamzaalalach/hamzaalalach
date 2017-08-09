var mongoose = require('mongoose'),
		Story = require('../models/story'),
		db = mongoose.connection;
mongoose.connect('mongodb://localhost/hamzaalalach');
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function() {
	exports.findAll = function(callback) {
		Story.find({}, function(error, data) {
			if (error) {
				console.log(error);
			} else {
				callback(data);
			}
		});
	}
});
