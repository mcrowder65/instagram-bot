var app = angular.module('app');

const instagramPasswordId = "instagramPassword";
const startBotButtonText = "Start bot";
const instagramPasswordText = "Instagram password (no #'s)";
const instagramPasswordConfirmationText = "Instagram password";
const panelHeadingText = "Make a new bot";
const confirmBotMessage = "Please confirm these are the correct settings.";
const confirmMessage = "Confirmation";
const officialBotStartText = "Start!";
const goBackToEditText = "Incorrect, go back!";
const maxLikesForOneTagConfirmationText = "Max likes for one tag";
const perDayText = ' per day';
const arrow = '-> ';
app.controller('bot', ['$scope', function($scope) {
	$scope.initBotView = function() {
		$scope.instagramPasswordText = instagramPasswordText;
		$scope.startBotButtonText = startBotButtonText;
		$scope.panelHeadingText = panelHeadingText;
		$scope.confirmBotMessage = confirmBotMessage;
		$scope.confirmMessage = confirmMessage;
		$scope.officialBotStartText = officialBotStartText;
		$scope.goBackToEditText = goBackToEditText;
		$scope.instagramPasswordConfirmationText = instagramPasswordConfirmationText;
		$scope.maxLikesForOneTagConfirmationText = maxLikesForOneTagConfirmationText;
		$scope.showConfirmation = false;
	}
	$scope.multiplyValueByHours = function(value) {
		var temp = value * hoursInADay;
		return value !== 0 ? arrow + temp + perDayText : '';
	}
	$scope.startBot = function() {
		if(isEmpty($scope.instagramPassword) || $scope.instagramPassword.indexOf('#') != -1) {
			outline(instagramPasswordId, failureColor);
			return;
		}
		
		if(isString($scope.tags)) {
			$scope.tags =$scope.tags.split(',');	
		}
		$scope.showConfirmation = true;
	}
	$scope.sendBotToServer = function() {
		var bot = {
			instagramUsername: $scope.instagramUsername,
			tags: $scope.tags,
			likesPerDay: $scope.likesPerDay * hoursInADay,
			maxLikesForOneTag: $scope.maxLikesForOneTag,
			followsPerDay: $scope.followsPerDay * hoursInADay,
			unfollowsPerDay: $scope.unfollowsPerDay * hoursInADay,
			instagramPassword: $scope.instagramPassword
		};
		sendBotToServer(bot);

	}
}]);

function sendBotToServer(bot) {
	$.ajax
	({
		url: "/startBot",
		dataType: 'json',
		type: 'POST',
		async: false,
		data: {bot: bot},
		success: function(data, status, headers, config){
		  user = data.data;
		}.bind(this),
		error: function(data, status, headers, config){
		}.bind(this)
	});
}
