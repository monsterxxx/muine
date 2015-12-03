(function(){
'use strict';

angular.module('ps.muine.sports', [])

.controller
('MuineSportsCtrl', ['$scope', '$stateParams', 'muineData', 'PsUtils', '$rootScope',
function            ( $scope ,  $stateParams ,  muineData ,  PsUtils ,  $rootScope){
  console.log('> SportsCtrl load');
  var doLog = false;

  $rootScope.sportsResolving = false;
  //get data
  $scope.sport = PsUtils.getById(muineData.sports, $stateParams.sportId);
  if (doLog) console.log('$scope.sport'+JSON.stringify($scope.sport , null, 2));
}]);

})();
