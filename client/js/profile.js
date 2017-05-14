var app= angular.module('app');

app.controller('profile', ['$scope', '$http', function ($scope, $http) {
  $scope.set = () => {
    var user = {
      id: localStorage.botToken,
      instagramUsername: $scope.instagramUsername,
      tags: $scope.tags,
      likesPerDay: $scope.likesPerDay * hoursInADay,
      maxLikesForOneTag: $scope.maxLikesForOneTag,
      followsPerDay: $scope.followsPerDay * hoursInADay,
      unfollowsPerDay: $scope.unfollowsPerDay * hoursInADay,
      pid: $scope.pid
    };
    $scope.setById(user);
  }

  $scope.setById = function(user) {
      $http({
        method: 'POST',
        url: '/setById',
        data: user,
      }).then(function successCallback(response) {
        alert('profile set');
      }, function errorCallback(response) {
          throw new Error("busted setbyid");
      });
  }
}]);
