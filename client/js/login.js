var app= angular.module('app');
app.controller('login', ['$scope', function ($scope) {

    $scope.login = function() {
        $scope.isLoggedIn = login($scope.username, $scope.password);
    }
    
}]);

/*******************************************************************************************************************/
                                                //Server senders
/*******************************************************************************************************************/

function login(username, password) {
    var success= false;
    username = username.toLowerCase();
    $.ajax
    ({
        url: "/login",
        dataType: 'json',
        type: 'POST',
        data: {username: username, password: password},
        async: false,
        success: function(data, status, headers, config){
            localStorage.botToken = data.token;
            window.location="/index.html";
            success = true;
        }.bind(this),
        error: function(data, status, headers, config){
            localStorage.botToken="";
        }.bind(this)
    });
}


function signup(username, password) {
    var obj = {
        username: username,
        password: password
    };
    $.ajax({
        url: "/signup",
        dataType: 'json',
        type: 'POST',
        async: false,
        data: obj,
        success: function(data, status, headers, config) {
            console.log('success!');
        }.bind(this),
        error: function(data, status, headers, config) {
            console.log('failure');
        }.bind(this)
    });
}

