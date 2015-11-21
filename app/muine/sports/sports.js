angular.module('ps.muine.sports', [])

.controller
('MuineSportsCtrl', ['$scope', '$stateParams', 'muineData', 'PsUtils',
function            ( $scope ,  $stateParams ,  muineData ,  PsUtils ){
  console.log('> SportsCtrl load');
  var doLog = false;

  //get data
  $scope.sport = PsUtils.getById(muineData.sports, $stateParams.sportId);
  if (doLog) {console.log('$scope.sport'+JSON.stringify($scope.sport , null, 2));}

  $scope.bgImg = 'assets/img/sports/' + $scope.sport.name +'/'+ $scope.sport.home.img;
}])

.controller('MuineSportsChildCtrl', ['$scope', function ($scope) {
  console.log('> SportsChildCtrl load');
}]);
