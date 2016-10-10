var app = angular.module('app');


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
		$scope.currentBotText = currentBotText;
		assignPid($scope.instagramUsername);
		$scope.botRunning = isABotRunning();
		$scope.stopThisBotText = stopThisBotText;
		
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
			instagramPassword: $scope.instagramPassword,
			id: localStorage.botToken
		};
		sendBotToServer(bot);
		$scope.botRunning = isABotRunning();
		assignPid($scope.instagramUsername);
	}
	$scope.isABotRunning = function() {
		return isABotRunning();
	}
	$scope.stopThisBot = function() {
		var user = getById();
		$scope.botRunning = stopBot(user.pid);
		$scope.showConfirmation = false;
	}
}]);
function stopBot(pid) {
	var botRunning = true;
	$.ajax
	({
		url: "/stopBot",
		dataType: 'json',
		type: 'POST',
		async: false,
		data: {pid: pid},
		success: function(data, status, headers, config){
		  botRunning = data.botRunning;
		}.bind(this),
		error: function(data, status, headers, config){
		}.bind(this)
	});
	return botRunning;
}
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
