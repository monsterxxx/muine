(function(){

'use strict';

angular.module('myApp.view1', [])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('view1', {
    url: '/view1',
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function() {

  $('.a').velocity({
    //'top' : '300',
    translateY: 300
  }, 10000);

})

.directive('view1Dir', function ($parse) {
  return function link($scope, element, attrs){



  };
});

})();
