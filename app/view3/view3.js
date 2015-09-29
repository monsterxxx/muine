'use strict';

angular.module('myApp.view3', ['ngRoute'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  })
  .when('/view3/1', {
    templateUrl: 'view3/view3.html'
  })
  .when('/view3/2', {
    templateUrl: 'view3/view3.html'
  })
  .when('/view3/3', {
    templateUrl: 'view3/view3.html'
  });
}])
.controller('View3Ctrl', function($scope, $rootScope) {
  $scope.name = 'modelNameValue';
})
.controller('ListController', ['$scope', '$location', '$window', '$rootScope', function($scope, $location, $window, $rootScope) {
  //$scope =
  $scope.successPath = '';
  $scope.successNewUrl = '';
  $scope.successOldUrl = '';
  $scope.names = ['Igor', 'Misko', 'Vojta'];
  $scope.counter = 0;
  $scope.incrementCounter = function(){
    console.log('> incCounter()');
    $scope.counter++;
    $scope.successPath = $location.path();
    console.log('< incCounter()');
  };
  $scope.$on('$locationChangeSuccess', function (event, newUrl, oldUrl) {
    console.log('> $on.$locationChangeSuccess');
    console.log(newUrl, oldUrl);
    $scope.counter++;
    console.log('$scope.counter > '+$scope.counter);
    //$scope.incrementCounter();
    $scope.successPath = $location.path();
    console.log('$scope.successPath > '+$scope.successPath);
    console.log('$scope.successNewUrl > '+$scope.successNewUrl);
    $scope.successNewUrl = newUrl;
    console.log('$scope.successNewUrl > '+$scope.successNewUrl);
    $scope.successOldUrl = oldUrl;
    console.log('< $on.$locationChangeSuccess');
  });
  $scope.back = function () {
    $window.history.back();
  };
  $scope.forward = function () {
    $window.history.forward();
  };
}]);
