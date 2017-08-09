var express = require('express'),
	app = express(),
	path = require('path'),
	logger = require('morgan'),
	helmet = require('helmet'),
	compression = require('compression'),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	storage = multer.diskStorage({
		destination: function(req, file, callback) {
			callback(null, './uploads');
		},
		filename: function(req, file, callback) {
			callback(null, file.originalname);
		}
	}),
	upload = multer({storage: storage}).array('file');
app.set('view engine', 'ejs');
app.use(compression());
app.use(helmet());
app.use(express.static(path.join(__dirname, '/')));
app.use(logger(':method :url :status :response-time ms :remote-addr'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function(req, res) {
	res.send('Het Dude!');
});
app.post('/up', function(req, res) {
	upload(req, res, function(err) {
		if (err) {
			return res.end("Error uploading file.");
		} else {
			res.end("File is uploaded");
		}
	});
});
app.use(function(req, res) {
	res.status(404).send("Not found!");
});
app.listen(3000);