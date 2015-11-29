(function(){
'use strict';

angular.module('ps.muine.spots', [])

.controller
('MuineSpotsCtrl', ['$scope', '$stateParams', 'muineData', 'PsUtils',
function           ( $scope ,  $stateParams ,  muineData ,  PsUtils ){
  console.log('> SpotsCtrl load');
  var doLog = false;

  //get data
  $scope.spot = PsUtils.getById(muineData.spots, $stateParams.spotId);
  if (doLog) console.log('$scope.spot: '+JSON.stringify($scope.spot , null, 2));
}]);

})();
