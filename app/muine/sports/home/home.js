(function(){
'use strict';

angular.module('ps.muine.sports.home', [])

.controller
('MuineSportsHomeCtrl', ['$scope',
function                ( $scope ){
  console.log('> SportsHomeCtrl load');
  var doLog = true;

  //Data
  //from ancestor's template used
  //$scope.section

  $scope.bgImg = 'assets/img/sports/' + $scope.sport.name +'/'+ $scope.sport.home.img;
}]);

})();
