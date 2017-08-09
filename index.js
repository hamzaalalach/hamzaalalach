var express = require('express'),
	app = express(),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	helmet = require('helmet'),
	session = require('express-session'),
	compression = require('compression'),
	passport = require('./bin/auth'),
	bodyParser = require('body-parser'),
	home = require('./routes/home'),
	login = require('./routes/login'),
	boss = require('./routes/boss');
app.set('view engine', 'ejs');
app.use(compression());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/images/favicon.png')));
app.use(logger(':method :url :status :response-time ms :remote-addr'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(home);
app.use(login);
app.use(boss);
app.use(function(req, res) {
	res.status(404).send("Not found!");
});
module.exports = app;
