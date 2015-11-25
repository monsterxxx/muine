(function(){
'use strict';

angular.module('ps.muine.clubs.home', [])

.controller
('MuineClubsHomeCtrl', ['$scope',
function                ( $scope ){
  console.log('> ClubsHomeCtrl load');
  var doLog = true;

  //Data
  //from ancestor's template used
  //$scope.section

  $scope.bgImg = 'assets/img/clubs/' + $scope.club.home.img;
}]);

})();
