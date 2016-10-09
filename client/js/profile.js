var app= angular.module('app');

app.controller('profile', ['$scope', function ($scope) {
    
    $scope.setInstagramUsername = function() {
        var user = getById();
        user.instagramUsername = $scope.instagramUsername;
        setById(user, instagramUsernameId);
    }
    $scope.setTags=function() {
        var user = getById();
        user.tags = $scope.tags.trim();
        setById(user, tagsId);
    }
    $scope.setLikesPerDay = function() {
        var user = getById();
        if(!isValidNumber($scope.likesPerDay)) {
            outline(likesPerDayId, failureColor);
            return;
        }
        user.likesPerDay = $scope.likesPerDay * hoursInADay;
        setById(user, likesPerDayId);
    }
    $scope.setMaxLikesForOneTag = function() {
        var user = getById();
        if(!isValidNumber($scope.maxLikesForOneTag)) {
            outline(maxLikesForOneTagId, failureColor);
            return;
        }
        user.maxLikesForOneTag = $scope.maxLikesForOneTag;
        setById(user, maxLikesForOneTagId);
    }
    $scope.setFollowsPerDay = function() {
        var user = getById();
        if(!isValidNumber($scope.followsPerDay)) {
            outline(followsPerDayId, failureColor);
            return;
        }
        user.followsPerDay = $scope.followsPerDay * hoursInADay;
        setById(user, followsPerDayId);
    }
    $scope.setUnfollowsPerDay = function() {
        var user = getById();
        if(!isValidNumber($scope.unfollowsPerDay)) {
            outline(unfollowsPerDayId, failureColor);
            return;
        }
        user.unfollowsPerDay = $scope.unfollowsPerDay * hoursInADay;
        setById(user, unfollowsPerDayId);
    }
}]);

/*******************************************************************************************************************/
                                                //Server senders
/*******************************************************************************************************************/
function setById(user, htmlID) {
    $.ajax
    ({
        url: "/setById",
        dataType: 'json',
        type: 'POST',
        data: user,
        success: function(data, status, headers, config){
            outline(htmlID, successColor);
        }.bind(this),
        error: function(data, status, headers, config){
            outline(htmlID, failureColor);
        }.bind(this)
    });
}