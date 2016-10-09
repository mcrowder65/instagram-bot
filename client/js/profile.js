var app= angular.module('app');
const successColor = "lime";
const failureColor = "red";
const instagramUsernameId = "instagramUsername";
const tagsId = "tags";
const likesPerDayId = "likesPerDay";
const maxLikesForOneTagId = "maxLikesForOneTag";
const followsPerDayId = "followsPerDay";
const unfollowsPerDayId = "unfollowsPerDay";
const hoursInADay = 24;
app.controller('profile', ['$scope', function ($scope) {
    $scope.init = function() {
        var user = getById();
        $scope.instagramUsernameText = "Instagram username";
        $scope.instagramUsername = user.instagramUsername;
        $scope.tagsText = "Tags (comma separated)";
        $scope.tags = user.tags;
        $scope.likesPerDay = user.likesPerDay / hoursInADay;
        $scope.likesPerHourText = "Likes per hour";
        $scope.maxLikesForOneTag = user.maxLikesForOneTag;
        $scope.maxLikesForOneTagText = "Max likes for one tag (put 0 for no limit)";
        $scope.followsPerDay = user.followsPerDay / hoursInADay;
        $scope.followsPerHourText = "Follows per hour"
        $scope.unfollowsPerDay = user.unfollowsPerDay / hoursInADay;
        $scope.unfollowsPerHourText = "Unfollows per hour";
    }
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
/*******************************************************************************************************************
                                                Utility functions
*******************************************************************************************************************/
function outline(id, color){
    id = "#" + id;
    $(id).css("borderColor", color);
    var millisecondsToWait = 2000;
    setTimeout(function() {
        $(id).css("borderColor", "initial");
    }, millisecondsToWait);
}

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