
var app = angular.module('app', ['ngRoute']);
app.factory('simpleFactory', function(){
    var factory = {};

    return factory;
});

app.controller('app', function ($scope, simpleFactory) {
  $scope.isLoggedIn = false;
  $scope.isLoggedIn = function() {
    $scope.loggedIn = localStorage.token != null && localStorage.token != "";
  }
});

app.config(function ($routeProvider) {

	$routeProvider
    .when('/bot',
    {
        controller: 'app',
        templateUrl: 'client/html/bot.html'
    })
    .when('/profile',
    {
      controller: 'app',
      templateUrl: 'client/html/profile.html'
    })
    .when('/signup',
    {
      controller: 'app',
        templateUrl: 'client/html/signup.html'
    })
    .when('/login',
    {
      controller: 'app',
        templateUrl: 'client/html/login.html'
    })
    .otherwise({ redirectTo: '/bot' });

});
/*******************************************************************************************************************/
                                                //BASIC FUNCTIONS
/*******************************************************************************************************************/


function get(parameter) {  
  var url = window.location.href;
  var index = url.indexOf(parameter);
  if(index == -1)
    return null;
  index += parameter.length + 1; //if the word we're looking for is address, get a index
                                 //then add address.length +1 to get start of value 
   
  var i = index;
  while(url[i] != '?' && url[i] != '&') {
    if(i > url.length)
      break;
    i++;
  }
  return url.substring(index, i);
} 

function removeGet(parameter, dateToSend) {
  var url = window.location.href;
  var index = url.indexOf(parameter);
  if(index == -1)
    return null;
   
  var i = index + parameter.length + 1;
  while(url[i] != '?' && url[i] != '&') {
    if(i > url.length)
      break;
    i++;
  }
  window.location.href = String(window.location.href).replace(url.substring(index, i), "") + 'date=' + dateToSend;
}
/*******************************************************************************************************************/
                                                //Server senders
/*******************************************************************************************************************/
function getById() {
  var user;
  $.ajax
  ({
      url: "/getById",
      dataType: 'json',
      type: 'POST',
      async: false,
      data: {id: localStorage.token},
      success: function(data, status, headers, config){
          user = data.data;
      }.bind(this),
      error: function(data, status, headers, config){
      }.bind(this)
  });
  user.id = localStorage.token;
  return user;
}


function isValidNumber(num) {
  return  num === undefined || num === null || 
          !Number.isInteger(num) || num < 0 ? false : true;
}