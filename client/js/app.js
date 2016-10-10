const instagramUsernameId = "instagramUsername";
const successColor = "lime";
const failureColor = "red";
const hoursInADay = 24;
const tagsId = "tags";
const likesPerDayId = "likesPerDay";
const maxLikesForOneTagId = "maxLikesForOneTag";
const followsPerDayId = "followsPerDay";
const unfollowsPerDayId = "unfollowsPerDay";
const tagsConfirmationText = "Tags";
const instagramPasswordId = "instagramPassword";
const startBotButtonText = "Start bot";
const instagramPasswordText = "Instagram password (no #'s)";
const instagramPasswordConfirmationText = "Instagram password";
const panelHeadingText = "Make a new bot";
const confirmBotMessage = "Please confirm these are the correct settings.";
const confirmMessage = "Confirmation";
const officialBotStartText = "Start!";
const goBackToEditText = "Incorrect, go back!";
const maxLikesForOneTagConfirmationText = "Max likes for one tag";
const perDayText = ' per day';
const arrow = '-> ';
const currentBotText = "Current bot";
const stopThisBotText = "Stop this bot";


var app = angular.module('app', ['ngRoute']);
app.factory('simpleFactory', function(){
    var factory = {};

    return factory;
});

app.controller('app', function ($scope, simpleFactory) {
  $scope.isLoggedIn = false;
  $scope.isLoggedIn = function() {
    $scope.loggedIn = localStorage.botToken != null && localStorage.botToken != "";
    return $scope.loggedIn;
  }
  $scope.init = function() {
    if(checkIfNotLoggedIn()) return;
    var user = getById();

    $scope.instagramUsernameText = "Instagram username";
    $scope.instagramUsername = user.instagramUsername;
    $scope.tagsText = "Tags (comma separated)";
    $scope.tags = user.tags;
    $scope.tagsConfirmationText = tagsConfirmationText;
    $scope.likesPerDay = user.likesPerDay / hoursInADay;
    $scope.likesPerHourText = "Likes per hour";
    $scope.maxLikesForOneTag = user.maxLikesForOneTag;
    $scope.maxLikesForOneTagText = "Max likes for one tag (put 0 for no limit)";
    $scope.followsPerDay = user.followsPerDay / hoursInADay;
    $scope.followsPerHourText = "Follows per hour"
    $scope.unfollowsPerDay = user.unfollowsPerDay / hoursInADay;
    $scope.unfollowsPerHourText = "Unfollows per hour";
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
    .when('/#/login',
    {
      controller: 'app',
      templateUrl: 'client/html/login.html'
    })
    .otherwise({ redirectTo: '/bot' });

});
/*******************************************************************************************************************/
                                                //BASIC FUNCTIONS
/*******************************************************************************************************************/
function isString(str) {
  return typeof str === 'string';
}
function checkIfNotLoggedIn() {
  if(isEmpty(localStorage.botToken)) {
      window.location ='/#/login';
      return true;
  }
  return false;
}
function outline(id, color){
    id = "#" + id;
    $(id).css("borderColor", color);
    var millisecondsToWait = 2000;
    setTimeout(function() {
        $(id).css("borderColor", "initial");
    }, millisecondsToWait);
}
function isEmpty(str) {
  return str === null || str === undefined || str === '' ? true : false;
}
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
  if(isEmpty(localStorage.botToken)) {
    window.location = '/#/login';
    return;
  }
  var user;
  $.ajax
  ({
      url: "/getById",
      dataType: 'json',
      type: 'POST',
      async: false,
      data: {id: localStorage.botToken},
      success: function(data, status, headers, config){
          user = data.data;
      }.bind(this),
      error: function(data, status, headers, config){
      }.bind(this)
  });
  user.id = localStorage.botToken;
  return user;
}
function assignPid(instagramUsername) {
  $.ajax
  ({
      url: "/assignPid",
      dataType: 'json',
      type: 'POST',
      async: false,
      data: {instagramUsername: instagramUsername, userId: localStorage.botToken},
      success: function(data, status, headers, config){
      }.bind(this),
      error: function(data, status, headers, config){
      }.bind(this)
  });
}
function isABotRunning() {
  if(checkIfNotLoggedIn()) return;
  var user = getById();
  var pid = user.pid;
  var userHasPid = pid === -1 ? false : true;
  var botRunning = false;
  $.ajax
  ({
      url: "/isPidAlive",
      dataType: 'json',
      type: 'POST',
      async: false,
      data: {pid: pid},
      success: function(data, status, headers, config) {
        botRunning = data.botRunning;
      }.bind(this),
      error: function(data, status, headers, config) {
      }.bind(this)
  });
  return botRunning;
}
function isValidNumber(num) {
  return  num === undefined || num === null || 
          !Number.isInteger(num) || num < 0 ? false : true;
}