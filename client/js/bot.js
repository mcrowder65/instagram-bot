var app = angular.module('app');


app.controller('bot', ['$scope', '$http', function($scope, $http) {
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
		$http({
	      method: 'POST',
	      url: '/startBot',
	      data: {bot: bot},
	    }).then(function successCallback(response) {
	    	$scope.getById();
	    }, function errorCallback(response) {
	        throw new Error("start bot busted");
	    });

	}
	$scope.stopThisBot = function() {
		var user = $scope.getUser();
		$http({
	      method: 'POST',
	      url: '/stopBot',
	      data: {
	      		 pid: user.pid,
	      		 id: localStorage.botToken,
	      		 instagramUsername: user.instagramUsername},
	    }).then(function successCallback(response) {
	    	$scope.getById();
	    	$scope.showConfirmation = false;
	    }, function errorCallback(response) {
	        throw new Error("start bot busted");
	    });
	}
}]);
