var app= angular.module('app');
app.controller('login', ['$scope','$http', function ($scope, $http) {

    $scope.login = function() {
        var username = $scope.username;
        var password = $scope.password;
        username = username.toLowerCase();
        password = password.trim();
        password = password.replace(/ /g, '');
        $http({
          method: 'POST',
          url: '/login',
          data:{username: username, password: password},
        }).then(function successCallback(response) {
            localStorage.botToken = response.data.token;
            window.location="/index.html";
        }, function errorCallback(response) {
            alert('Your username/password combo does not work.');
        });
    }
    
}]);