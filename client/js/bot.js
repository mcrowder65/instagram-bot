var app = angular.module('app');

const instagramPasswordId = "instagramPassword";
const startBotButtonText = "Start bot";
const instagramPasswordText = "Instagram password (no #'s)";
const panelHeadingText = "Make a new bot";
app.controller('bot', ['$scope', function($scope) {
	$scope.initBot = function() {
		$scope.instagramPasswordText = instagramPasswordText;
		$scope.startBotButtonText = startBotButtonText;
		$scope.panelHeadingText = panelHeadingText;
	}
	$scope.startBot = function() {
		if(isEmpty($scope.instagramPassword) || $scope.instagramPassword.indexOf('#') != -1) {
			outline(instagramPasswordId, failureColor);
			return;
		}
		var bot = {
			instagramUsername: $scope.instagramUsername,
			tags: $scope.tags,
			likesPerDay: $scope.likesPerDay * hoursInADay,
			maxLikesForOneTag: $scope.maxLikesForOneTag,
			followsPerHour: $scope.followsPerDay * hoursInADay,
			unfollowsPerHour: $scope.unfollowsPerDay * hoursInADay,
			instagramPassword: $scope.instagramPassword
		};

		console.log(bot);
	}
}]);