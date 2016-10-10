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
exec("ps aux | grep mcrowder65", puts);

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
	var output = stdout.split('\n');
	output = output[0];
	output = output.trim();

	output = output.split(' ');
	output = cleanArray(output);
	console.log(output);
	var pid = output[1];
	console.log(pid);

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
	console.log('assignPid');
	var instagramUsername = req.body.instagramUsername;
	var userId = req.body.userId;
	// var command = "pidof python";
	// var pid;
	// exec(command, function puts(error, stdout, stderr) { 
	// 	pid = stdout;
	// 	console.log(pid);
	// 	userDAO.setPid(pid, userId, res);
	// });
	ps.lookup({
		command: 'python'
	}, function(err, resultList ) {
		if (err) {

		    throw new Error(err);
		}
		var resSent = false;
		console.log(resultList);
		for(var i = 0; i < resultList.length; i++) {
			var temp = resultList[i];
			console.log(temp);
			if(temp.arguments.indexOf(instagramUsername) != -1) {
		    	var pid = temp.pid;
		    	resSent = true;
		    	console.log(pid);
		    	userDAO.setPid(pid, userId, res);
	        }
		}
		if(!resSent) {

			res.json({});
		}

	});
});
app.post('/stopBot', function(req, res) {
	console.log("stop bot");
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
		    console.log(resultList);
		    var process = resultList[0];	 
		    console.log(process);
		    if(process) {
		    	console.log("true!");
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
