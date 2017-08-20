var mongoose = require('mongoose'),
		Story = require('../models/story'),
		User = require('../models/user'),
		bcrypt = require('bcryptjs'),
		db = mongoose.connection;
mongoose.connect('mongodb://localhost/hamzaalalach', {useMongoClient: true	});
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
	exports.getUserByUsername = function(username, callback) {
		User.findOne({'username': username}, function(error, user) {
			if (error) {
				console.log(error);
			} else {
				callback(user);
			}
		});
	}
	exports.comparePassword = function(candidatePass, hash, callback) {
		bcrypt.compare(candidatePass, hash, function(error, isMatch) {
			if (error) {
				console.log(error);
			} else {
				callback(isMatch);
			}
		});
	}
	exports.getUserById = function(id, callback) {
		User.findById(id, function(error, user) {
			if (error) {
				console.log(error);
			} else {
				callback(user);
			}
		});
	}
	exports.createUser = function(username, password) {
		bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(password, salt, function(err, hash) {
						if (err) {
							console.log(err);
						} else {
							User.create([{
								username: username,
								password: hash
							}], function(error) {
								if (error) {
									console.log(error);
								}
							});
						}
				});
		});
	}
	exports.createStory = function(title, category, content, size, callback) {
		var date = new Date(),
				storyDate = date.getFullYear() + ' - ' + (date.getMonth() + 1) + '/' + date.getDate();
		Story.create([{
			date: storyDate,
			content: content,
			category: category,
			title: title,
			size: size
		}], function(error, story) {
			if (error) {
				console.log(error);
			} else {
				callback(story);
			}
		});
	}
	exports.removeStory = function(id) {
		Story.remove({_id: id}, function(error) {
			if (error) {
				console.log(error);
			}
		});
	}
	exports.updateStory = function(id, title, category, content, size, callback) {
		Story.update({_id: id}, {$set: {title: title, category: category, size: size, content: content}}, function(error) {
			if (error) {
				console.log(error);
			} else {
				var date = new Date(),
					storyDate = date.getFullYear() + ' - ' + (date.getMonth() + 1) + '/' + date.getDate();
				var data = [{_id: id, title: title, category: category, content: content, size: size, date: storyDate}];
				callback(data);
			}
		});
	}
});
