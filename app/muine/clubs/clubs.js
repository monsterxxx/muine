angular.module('ps.muine.clubs', [])

.controller('MuineClubsCtrl', ['$scope', function ($scope) {
  console.log('> ClubsCtrl load');
  $scope.club = 'Rids';
}]);
