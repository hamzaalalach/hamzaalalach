var mongoose = require('mongoose'),
	storySchema = mongoose.Schema({
		date: String,
		content: String,
		category: String,
		title: String,
		size: String
	}),
	Story = mongoose.model('Story', storySchema);
module.exports = Story;
