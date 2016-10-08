
var app = angular.module('app');
var validName1 = 'Brittany';
var validName2 = 'Lindsay';
app.controller('bot', ['$scope', function($scope) {
	$scope.init = function() {

	}
	$scope.validate = function() {
		// if(!validateName($scope.name)) {
		// 	alert('Your name was not ' + validName1 + ' or ' + validName2 + '\n'
		// 		+ 'Your name is: ' + $scope.name);
		// 	return;
		// }
		// if(!validateTags($scope.tags)) {

		// 	alert("Tags are invalid...make sure there's an entry");
		// 	return;
		// }
		// console.log($scope.likesPerDay);
		// try {
		// 	validateNumber($scope.likesPerDay, "Likes per day");
		// } catch(error) {
		// 	alert(error);
		// }
		// console.log($scope.likesPerDay);
		// console.log($scope.maxLikesForOneTag);
		// console.log($scope.followsPerDay);
		// console.log($scope.providedPassword);
		sendToServer();
	}
}]);

function sendToServer() {
	var obj = {
		username: 'mcrowder65',
		password: 'helloworld'
	};
	$.ajax({
        url: "/signup",
        dataType: 'json',
        type: 'POST',
        async: false,
        data: obj,
        success: function(data, status, headers, config) {
        	console.log('success!');
        }.bind(this),
        error: function(data, status, headers, config) {
        	console.log('failure');
        }.bind(this)
    });
}
function validateNumber(number, message) {
	if(!Number.isInteger(number)) {
		throw(message + " isn't a number.");
	}
	if(number < 0) {
		throw(message + " is negative");
	}
}
function validateName(name) {
	return name === 'Brittany' || name === 'Lindsay' ? true : false;
}

function validateTags(tags) {
	if(tags === undefined || tags === null || tags === '') {
		return false;
	}
}