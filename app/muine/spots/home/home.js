(function(){
'use strict';

angular.module('ps.muine.spots.home', [])

.controller
('MuineSpotsHomeCtrl', ['$scope',
function                ( $scope ){
  console.log('> SpotsHomeCtrl load');
  var doLog = true;

  //Data
  //from ancestor's template used
  //$scope.section

  $scope.bgImg = 'assets/img/spots/' + $scope.spot.home.img;
}]);

})();
