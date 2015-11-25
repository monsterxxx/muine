(function(){
'use strict';

angular.module('ps.muine.spots', [])

.controller
('MuineSpotsCtrl', ['$scope', '$stateParams', 'muineData', 'PsUtils',
function           ( $scope ,  $stateParams ,  muineData ,  PsUtils ){
  console.log('> SpotsCtrl load');
  var doLog = true;

  //get data
  $scope.spot = PsUtils.getById(muineData.spots, $stateParams.spotId);
  console.log($stateParams.spotId, JSON.stringify(muineData.spots , null, 2));
  if (doLog) console.log('$scope.spot: '+JSON.stringify($scope.spot , null, 2));
}]);

})();
