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

.controller('View1Ctrl', function($scope) {

  $scope.slides = [
    {img: 'assets/img/sports/windsurfing/1.jpg'},
    {img: 'assets/img/sports/windsurfing/6.jpg'},
    {img: 'assets/img/sports/windsurfing/7.jpg'}
  ];

})

.directive('view1Dir', function ($parse, $timeout) {
  return function link($scope, element, attrs){

    $timeout(function () {
      $scope.test = 'buya1';
      window.alert('dir1 timeout');
    }, 6000);

    $scope.$on('$destroy', function () {
      window.alert('dir1 destroied');
    });


  };
})

.directive('view1SecondDir', function ($parse, $timeout) {
  return function link($scope, element, attrs){

    $timeout(function () {
      $scope.test = 'buya2';
    }, 3000);

    $scope.$on('$destroy', function () {
      window.alert('dir2 destroied');
    });


  };
});

})();
