angular.module('ps.muine.sports', [])

.controller('MuineSportsCtrl', ['$scope',function ($scope) {
  console.log('> SportsCtrl load');
  $scope.sport = 'windsurfing';
  $scope.purple = true;
}]);
