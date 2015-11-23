(function(){
'use strict';

angular.module('ps.muine.sports.home', [])

.controller
('MuineSportsHomeCtrl', ['$scope',
function                ( $scope ){
  console.log('> SportsHomeCtrl load');
  var doLog = true;

  //Data
  //from sport ancestor used
  //$scope.sport

  $scope.bgImg = 'assets/img/sports/' + $scope.sport.name +'/'+ $scope.sport.home.img;
}]);

})();
