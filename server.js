var fs = require('fs');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/bot');
app.use(express.static(__dirname + ''));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var userDAO = require('./server/dao/UserDAO.js');
app.use(bodyParser.urlencoded({
        extended: true
}));


var portNumber = 3000;
var server = app.listen(portNumber, function() {
	console.log("Started on port " + portNumber);
	var host = server.address().address;
	var port = server.address().port;
});


app.post('/startBot', function(req, res) {
	var bot = req.body.bot;
	var instagramUsername = bot.instagramUsername;
	var hashTags = bot.tags;
	var likesPerDay = bot.likesPerDay;
	var maxLikesForOneTag = bot.maxLikesForOneTag;
	var followsPerDay = bot.followsPerDay;
	var unfollowsPerDay = bot.unfollowsPerDay;
	var instagramPassword = bot.instagramPassword;

	var exec = require('child_process').exec;

	var command = "python example.py " + instagramUsername + " " + instagramPassword + " " 
				  + hashTags + " " + likesPerDay + " " + maxLikesForOneTag + " " + followsPerDay
				  + " " + unfollowsPerDay;
	function puts(error, stdout, stderr) { console.log(stdout) }
	exec(command, puts);
	res.json({});
});
app.post('/signup', function(req, res) {
	userDAO.signUp(req.body, res);
});
app.post('/login', function(req, res) {
	userDAO.login(req.body, res);
});
app.post('/getById', function(req, res) {
	userDAO.getById(req.body.id, res);
});
app.post('/setById', function(req, res) {
	userDAO.setById(req.body, res);
});
