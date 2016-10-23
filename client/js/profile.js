var app= angular.module('app');

app.controller('profile', ['$scope', '$http', function ($scope, $http) {
    
    $scope.setInstagramUsername = function() {
        var user = $scope.getUser();
        user.instagramUsername = $scope.instagramUsername;
        $scope.setById(user, instagramUsernameId);
    }
    $scope.setTags=function() {
        var user = $scope.getUser();
        user.tags = $scope.tags.trim();
        $scope.setById(user, tagsId);
    }
    $scope.setLikesPerDay = function() {
        var user = $scope.getUser();
        if(!isValidNumber($scope.likesPerDay)) {
            outline(likesPerDayId, failureColor);
            return;
        }

        user.likesPerDay = $scope.likesPerDay * hoursInADay;
        $scope.setById(user, likesPerDayId);
    }
    $scope.setMaxLikesForOneTag = function() {
        var user = $scope.getUser();
        if(!isValidNumber($scope.maxLikesForOneTag)) {
            outline(maxLikesForOneTagId, failureColor);
            return;
        }
        user.maxLikesForOneTag = $scope.maxLikesForOneTag;
        $scope.setById(user, maxLikesForOneTagId);
    }
    $scope.setFollowsPerDay = function() {
        var user = $scope.getUser();
        if(!isValidNumber($scope.followsPerDay)) {
            outline(followsPerDayId, failureColor);
            return;
        }
        user.followsPerDay = $scope.followsPerDay * hoursInADay;
        $scope.setById(user, followsPerDayId);
    }
    $scope.setUnfollowsPerDay = function() {
        var user = $scope.getUser();
        if(!isValidNumber($scope.unfollowsPerDay)) {
            outline(unfollowsPerDayId, failureColor);
            return;
        }
        user.unfollowsPerDay = $scope.unfollowsPerDay * hoursInADay;
        $scope.setById(user, unfollowsPerDayId);
    }
    $scope.setById = function(user, htmlID) {
        $http({
          method: 'POST',
          url: '/setById',
          data: user,
        }).then(function successCallback(response) {
            outline(htmlID, successColor);       
        }, function errorCallback(response) {
            outline(htmlID, failureColor);
            throw new Error("busted setbyid");
        });
    }
}]);
