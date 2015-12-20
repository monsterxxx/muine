(function(){
'use strict';

angular.module('ps.muine.spots.home', [])

.controller
('MuineSpotsHomeCtrl', ['$scope', '$rootScope', 'Spot', '$timeout', '$state',
function               ( $scope ,  $rootScope ,  Spot ,  $timeout ,  $state){
  console.log('> SpotsHomeCtrl load');
  var doLog = true;

  //Data
  $scope.spot = Spot;

  $scope.bgImg = 'assets/img/spots/' + Spot.home.bgImg;
}]);

})();
