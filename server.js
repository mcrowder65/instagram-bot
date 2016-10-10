var express = require('express');
var app = express();
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/bot');
var ps = require('ps-node');

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
function puts(error, stdout, stderr) { 
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
	var exec = require('child_process').exec;

	var command = "python example.py " + instagramUsername + " " + instagramPassword + " " 
				  + hashTags + " " + likesPerDay + " " + maxLikesForOneTag + " " + followsPerDay
				  + " " + unfollowsPerDay;

	exec(command, puts);
	ps.lookup({
		command: 'python',
	}, function(err, resultList ) {
		if (err) {
		    throw new Error(err);
		}
		for(var i = 0; i < resultList.length; i++) {
			var temp = resultList[i];
			if(temp.arguments.indexOf(instagramUsername) != -1) {
		    	var pid = temp.pid;
		    	userDAO.setPid(pid, userId, res);
	        }
		}

	});

});
app.post('/assignPid', function(req, res) {
	var instagramUsername = req.body.instagramUsername;
	var userId = req.body.userId;
	ps.lookup({
		command: 'python',
	}, function(err, resultList ) {
		if (err) {
		    throw new Error(err);
		}
		for(var i = 0; i < resultList.length; i++) {
			var temp = resultList[i];
			if(temp.arguments.indexOf(instagramUsername) != -1) {
		    	var pid = temp.pid;
		    	userDAO.setPid(pid, userId, res);
	        }
		}

	});
});
app.post('/stopBot', function(req, res) {
	var pid = req.body.pid;
	ps.kill( pid, function(err) {
		res.json({botRunning: false});
	});
});
app.post('/isPidAlive', function(req, res) {
	var pid = req.body.pid;
	if(pid === -1) {
		res.json({botRunning: false});
	} else {
		ps.lookup({ pid: pid }, function(err, resultList ) {
		    if (err) {
		        throw new Error(err);
		    }
		    var process = resultList[0];	 
		    if(process) {
		 		res.json({botRunning: true});
		    }
		    else {
		    	res.json({botRunning:false});
		    }
		});
	}
	
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
