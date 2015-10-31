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


})

.directive('view1Dir', function ($parse) {
  return function link($scope, element, attrs){
    var $appendix = $('<div class="a">dsgs</div>');
    element.append($appendix).velocity({
      translateY: 'translateY(400px)'
    },{
      duration: 5000,
      easing: 'linear'
    });
    $('.a').animate({
      'width' : '500'
      //translateY: menuOffset + 'px'
    }, 3000);
    // $appendix.animate({
    //   opacity: 0.25,
    //   left: "+=50",
    //   height: "toggle",
    //   translateY: '400px'
    // }, {
    //   duration: 5000
    // });
  };
});

})();
