
var app = angular.module('app', ['ngRoute']);
app.factory('simpleFactory', function(){
    var factory = {};

    return factory;
});

app.controller('app', function ($scope, simpleFactory) {
    
   
});

app.config(function ($routeProvider) {

	$routeProvider
    .when('/bot',
    {
        controller: 'app',
        templateUrl: 'client/html/bot.html'
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
function deleteReminder(_id) {
    var success = false;
    $.ajax
    ({
        url: "/deleteReminder",
        dataType: "json",
        type: "POST",
        async: false,
        data: {_id: _id},
        success: function(data, status, headers, config){
            success = true;
        }.bind(this),
        error: function(data, status, headers, config){
        }.bind(this)
    });
    return success;
}
