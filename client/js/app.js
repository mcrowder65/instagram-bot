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
const tagsText = "Tags (comma separated)";
const instagramUsernameText = "Instagram username";
const likesPerHourText = "Likes per hour";
const maxLikesForOneTagText = "Max likes for one tag (put 0 for no limit)";
const followsPerHourText = "Follows per hour";
const unfollowsPerHourText = "Unfollows per hour";

var app = angular.module('app', ['ngRoute']);
app.factory('simpleFactory', function(){
    var factory = {};

    return factory;
});

app.controller('app', ['$scope','$http', function ($scope, $http, simpleFactory) {
  $scope.isLoggedIn = false;
  $scope.isLoggedIn = function() {
    $scope.loggedIn = localStorage.botToken != null && localStorage.botToken != "";
    return $scope.loggedIn;
  }
  $scope.init = function() {
    $scope.tagsConfirmationText = tagsConfirmationText;
    $scope.tagsText = tagsText;
    $scope.likesPerHourText = likesPerHourText;
    $scope.maxLikesForOneTagText = maxLikesForOneTagText;
    $scope.followsPerHourText = followsPerHourText;
    $scope.unfollowsPerHourText = unfollowsPerHourText;
    $scope.instagramUsernameText = instagramUsernameText;
    if(checkIfNotLoggedIn()) return;
    $scope.getById();

  }
  $scope.getUser = function() {
    return {
      id: localStorage.botToken,
      instagramUsername: $scope.instagramUsername,
      tags: $scope.tags,
      likesPerDay: $scope.likesPerDay * hoursInADay,
      maxLikesForOneTag: $scope.maxLikesForOneTag,
      followsPerDay: $scope.followsPerDay * hoursInADay,
      unfollowsPerDay: $scope.unfollowsPerDay * hoursInADay,
      pid: $scope.pid
    };
  }
  $scope.getById = function() {
    if(isEmpty(localStorage.botToken)) {
      window.location = '/#/login';
      return;
    }
    $http({
      method: 'POST',
      url: '/getById',
      data: {id: localStorage.botToken},
    }).then(function successCallback(response) {
      var user = response.data.data;
      $scope.instagramUsername = user.instagramUsername;
      $scope.tags = user.tags;
      $scope.likesPerDay = user.likesPerDay / hoursInADay;
      $scope.maxLikesForOneTag = user.maxLikesForOneTag;
      $scope.followsPerDay = user.followsPerDay / hoursInADay;
      $scope.unfollowsPerDay = user.unfollowsPerDay / hoursInADay;
      $scope.pid = user.pid;
      $scope.isABotRunning();
    }, function errorCallback(response) {

        throw new Error("Get by id may be busted?");
    });
  }
  $scope.assignPid = function(instagramUsername) {
    $http({
      method: 'POST',
      url: '/assignPid',
      data: {instagramUsername: $scope.instagramUsername, userId: localStorage.botToken},
    }).then(function successCallback(response) {
       if(response.data.status === 'botoverload') {
         alert('For some reason, you have more than one bot running right now. '
              + 'Please kill one bot and refresh this page. This message '
              + 'will keep appearinng as long as there are two bots. So keep '
              + 'killing until it\'s gone. Once you click stop, this will redirect you '
              + 'to the create a bot screen. Be sure to refresh again to be sure there '
              + 'are no more bots running!!!');
         $scope.botRunning = true;
       }
    }, function errorCallback(response) {
        throw new Error("assignPid busted");
    });
  }
  $scope.isABotRunning = function() {
    var user = $scope.getUser();
    var pid = user.pid;
    console.log('pid ', pid);
    if(!pid) {
      return;
    }
    $http({
      method: 'POST',
      url: '/isPidAlive',
      data: {pid: pid, instagramUsername: $scope.instagramUsername},
    }).then(function successCallback(response) {
      $scope.assignPid();
      $scope.botRunning = response.data.running;

    }, function errorCallback(response) {
      $scope.botRunning = false;
        throw new Error("isABotRunning busted");
    });
  }
}]);

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


function isValidNumber(num) {
  return  num === undefined || num === null ||
          !Number.isInteger(num) || num < 0 ? false : true;
}
