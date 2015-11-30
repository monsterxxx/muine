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


  $(document).ready(function () {
    var $window = $(window);

    var a = 0;
    var b = 1;
    var c = a || console.log('hi from a');
    c();
    //b || console.log('hi from b');

  });

})

.directive('view1Dir', function ($parse) {
  return function link($scope, element, attrs){



  };
});

})();
