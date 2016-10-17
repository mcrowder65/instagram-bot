var express = require('express');
var app = express();
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/bot');
var ps = require('ps-node');
var exec = require('child_process').exec;
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
function cleanArray(actual) {
  var newArray = [];
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

function puts(error, stdout, stderr) { 
	

}
function isPidAlive(pid, res) {
	var firstDigit = pid[0];
	var restOfPid = pid.substring(1);
	var pid = "[" + pid[0] + "]" + restOfPid;
	var command = "python ps.py " + "\'" + pid + "\'";
	exec(command, 
		function puts(error, stdout, stderr) {
			
			stdout = stdout.replace(/\r?\n|\r/g, "");
			if(!stdout || stdout === pid) {
				res.json({running: false});
			} else {
				res.json({running:true});
			}

		}
	);

}
function getPid(instagramUsername, userId, res) {
	var command = "python ps.py \"\'[p]ython example.py " + instagramUsername + "\'\"";
	exec(command, 
		function parsePid(error, stdout, stderr) {
			if(!stdout) {
				res.json({});
			} else {
				var output = stdout.split('\n');
				output = cleanArray(output);
				output = output.length === 2 ? output[1] : output[0];
				if(output > 2) {
					res.json({status:"too many bots running"});
				} else {
					output = output.trim();
					output = output.split(' ');
					output = cleanArray(output);
					var pid = output[1];
					userDAO.setPid(pid, userId, res);
				}
				
			}
			
		}
	);
}
app.post('/startBot', function(req, res) {
	var bot = req.body.bot;
	var instagramUsername = bot.instagramUsername;
	var hashTags = bot.tags;
	var likesPerDay = bot.likesPerDay;
	var maxLikesForOneTag = bot.maxLikesForOneTag;
	var followsPerDay = bot.followsPerDay;
	var unfollowsPerDay = bot.unfollowsPerDay;
	var instagramPassword = bot.instagramPassword;
	var userId = bot.id;
	

	var command = "python example.py " + instagramUsername + " " + instagramPassword + " " 
				  + hashTags + " " + likesPerDay + " " + maxLikesForOneTag + " " + followsPerDay
				  + " " + unfollowsPerDay;
	exec(command, puts);
	getPid(instagramUsername, userId, res);

});
app.post('/assignPid', function(req, res) {
	var instagramUsername = req.body.instagramUsername;
	var userId = req.body.userId;
	getPid(instagramUsername, userId, res);
});
app.post('/stopBot', function(req, res) {
	var instagramUsername = req.body.instagramUsername;
	var pid = req.body.pid;
	var userId = req.body.userId;
	var command = "python kill.py " + pid;
	exec(command, puts);	
	getPid(instagramUsername, userId, res);
});
app.post('/isPidAlive', function(req, res) {

	var pid = req.body.pid;
	isPidAlive(pid, res);
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
