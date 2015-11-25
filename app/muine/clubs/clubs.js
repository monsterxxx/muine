(function(){
'use strict';

angular.module('ps.muine.clubs', [])

.controller
('MuineClubsCtrl', ['$scope', '$stateParams', 'muineData', 'PsUtils',
function           ( $scope ,  $stateParams ,  muineData ,  PsUtils ){
  console.log('> ClubsCtrl load');
  var doLog = true;

  //get data
  $scope.club = PsUtils.getById(muineData.clubs, $stateParams.clubId);
  if (doLog) console.log('$scope.club'+JSON.stringify($scope.club , null, 2));
}]);

})();
