var app= angular.module('app');
const successColor = "lime";
const failureColor = "red";
const instagramUsername = "instagramUsername";
const tags = "tags";
const likesPerDay = "likesPerDay";
const maxLikesForOneTag = "maxLikesForOneTag";
const followsPerDay = "followsPerDay";
const unfollowsPerDay = "unfollowsPerDay";
const hoursInADay = 24;
app.controller('profile', ['$scope', function ($scope) {
    $scope.init = function() {
        var user = getById();
        $scope.instagramUsername = user.instagramUsername;
        $scope.tags = user.tags;
        $scope.likesPerDay = user.likesPerDay / hoursInADay;
        $scope.maxLikesForOneTag = user.maxLikesForOneTag;
        $scope.followsPerDay = user.followsPerDay / hoursInADay;
        $scope.unfollowsPerDay = user.unfollowsPerDay / hoursInADay;
    }
    $scope.setInstagramUsername = function() {
        setInstagramUsername($scope.instagramUsername);
    }
    $scope.setTags=function() {
        outline(tags, successColor);
    }
    $scope.setLikesPerDay = function() {
        outline(likesPerDay, successColor);
    }
    $scope.setMaxLikesForOneTag = function() {
        outline(maxLikesForOneTag, successColor);
    }
    $scope.setFollowsPerDay = function() {
        outline(followsPerDay, successColor);
    }
    $scope.setUnfollowsPerDay = function() {
        outline(unfollowsPerDay, successColor);
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
function setInstagramUsername(username) {
    $.ajax
    ({
        url: "/setInstagramUsername",
        dataType: 'json',
        type: 'POST',
        data: username,
        success: function(data, status, headers, config){
            outline(instagramUsername, successColor);
        }.bind(this),
        error: function(data, status, headers, config){
            outline(instagramUsername, failureColor);
        }.bind(this)
    });
}
function setReceiverEmail(data){
    if(data.receiverEmail) {
        $.ajax
        ({
            url: "/setReceiverEmail",
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function(data, status, headers, config){
                outline("receiverEmailAccount", "lime");
            }.bind(this),
            error: function(data, status, headers, config){
                outline("receiverEmailAccount", "red");
            }.bind(this)
        });
    }
}