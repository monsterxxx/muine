(function(){

'use strict';

angular.module('myApp.box3', [])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('box3', {
    url: '/box3',
    templateUrl: 'sandbox/box3/box3.html',
    controller: 'Box3Ctrl'
  });
}])

.controller('Box3Ctrl', function($scope, $interval, $timeout) {
  $scope.select = function () {

  };
  // the most raugh list control method
  $scope.list = [0];
  $timeout(function () {
    $scope.list = [0,1,2,3,4,5,6];
    // $scope.list.push.apply($scope.list, [1,2,3,4,5,6]);
  }, 1);
  $timeout(function () {
    $scope.list = [0];
    // $scope.list.splice(1,10);
  }, 2000);
  $timeout(function () {
    $scope.list = [0,1,2,3,4,5,6];
    // $scope.list.push.apply($scope.list, [1,2,3,4,5,6]);
  }, 4000);
  $timeout(function () {
    $scope.list.splice(0, 0, $scope.list.splice(4, 1)[0]);
  }, 6000);
  $timeout(function () {
    $scope.list = [0];
  }, 6001);


  // $interval(function () {
  //   $scope.list = [0,1,2,3,4,5,6];
  //   $timeout(function () {
  //     $scope.list.splice(0, 0, $scope.list.splice(4, 1)[0]);
  //     $timeout(function () {
  //       $scope.list.splice(1,6);
  //     }, 10);
  //   }, 2000);
  //   $timeout(function () {
  //     $scope.list = [0];
  //   }, 9000);
  // }, 10000);
});


})();
