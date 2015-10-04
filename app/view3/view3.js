'use strict';

angular.module('myApp.view3', [])
.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $stateProvider
  .state('view3', {
    url: '/view3',
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
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
  $rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
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
    console.log('event.defaultPrevented > '+event.defaultPrevented);
    console.log('< $on.$locationChangeSuccess');
  });
  $scope.$on('listItemEvent', function(event){
    console.log('> ListController $on.listItemEvent');
    console.log('event > '+ angular.toJson(event));
    console.log('< ListController $on.listItemEvent');
  });
  $scope.back = function () {
    $window.history.back();
  };
  $scope.forward = function () {
    $window.history.forward();
  };
}])
.controller('ListItemCtrl', function($scope){
  $scope.counter = 0;
  $scope.incrementCounter = function(){
    console.log('> ListItemCtrl incCounter()');
    $scope.counter++;
    $scope.$emit('listItemEvent');
    console.log('< ListItemCtrl incCounter()');
  };
  $scope.$on('$locationChangeSuccess', function (event, newUrl, oldUrl) {
    console.log('> ListItemCtrl $on.$locationChangeSuccess');
    $scope.counter++;
    console.log('< ListItemCtrl $on.$locationChangeSuccess');
  });
})
.controller('ExperimentServiceCtrl', function(PSExperimentService, PSAnotherExperimentFactory, $scope){
  $scope.value = PSExperimentService.value
  $scope.getValue = function(){
    return PSExperimentService.value;
  };
  $scope.incValue = function(){
    PSExperimentService.incValue();
    $scope.value = PSExperimentService.getValue();
    console.log('ExperimentServiceCtrl>PSExperimentService.value>'+PSExperimentService.value);
    console.log('>ExperimentServiceCtrl>$scope.value>'+$scope.value);
    console.log('>ExperimentServiceCtrl>PSExperimentService.getValue>'+PSExperimentService.getValue());
  };
  $scope.getAnotherValue = function(){
    return PSAnotherExperimentFactory();
  };
});
