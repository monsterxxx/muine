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
    var $a = $('.view1-a');


    console.log($a);
    $a.append('<p>Vasja!</p>');
    function handler1(e) {
      console.log('handler1');
      e.preventDefault();
    }
    function handler2(e) {
      console.log('handler2');
    }

    function handler3(e) {
      console.log('scrolling');
      e.preventDefault();
    }

    $a.on('click', handler1);
    $a.on('click', handler2);

    $window.on('scroll', handler3);

    function preventDefault(e) {
      console.log('onwheel');
      // e = e || window.event;
      // if (e.preventDefault)
      //     e.preventDefault();
      // e.returnValue = false;
    }
    window.onwheel = preventDefault;
  });

})

.directive('view1Dir', function ($parse) {
  return function link($scope, element, attrs){



  };
});

})();
