(function(){
'use strict';

angular.module('ps.muine.sports', [])

.controller
('MuineSportsCtrl', ['$scope', '$stateParams', 'muineData', 'PsUtils',
function            ( $scope ,  $stateParams ,  muineData ,  PsUtils ){
  console.log('> SportsCtrl load');
  var doLog = true;

  //get data
  $scope.sport = PsUtils.getById(muineData.sports, $stateParams.sportId);
  if (doLog) console.log('$scope.sport'+JSON.stringify($scope.sport , null, 2));
}]);

})();
