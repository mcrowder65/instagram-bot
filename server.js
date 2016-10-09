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


app.post('/botCity', function(req, res) {

	console.log(req);
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

/*
var hashTags = [];
var contents = fs.readFileSync('tags.txt', 'utf8');
hashTags = contents.split(',');
// console.log(arr);
contents = fs.readFileSync('matthewlogin.txt', 'utf8');
var userCredentials = contents.split(',');
var username = userCredentials[0];
var password = userCredentials[1];
// or more concisely
var exec = require('child_process').exec;
var command = "python example.py " + username + " " + password + " " + hashTags
function puts(error, stdout, stderr) { console.log(stdout) }
exec(command, puts);
*/