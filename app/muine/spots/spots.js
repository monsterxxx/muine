angular.module('ps.muine.spots', [])

.controller('MuineSpotsCtrl', ['$scope', function ($scope) {
  console.log('> SpotsCtrl load');
  $scope.spot = 'Suoi Nuoc';
}]);
