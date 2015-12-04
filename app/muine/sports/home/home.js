(function(){
'use strict';

angular.module('ps.muine.sports.home', [])

.controller
('MuineSportsHomeCtrl', ['$scope', 'Sport',
function                ( $scope ,  Sport){
  console.log('> SportsHomeCtrl load');
  var doLog = true;

  //Data
  //from ancestor's template used
  //$scope.section
  $scope.sport = Sport;

  $scope.bgImg = 'assets/img/sports/' + Sport.name.toLowerCase() +'/'+ Sport.home.bgImg;
  $scope.cardImg = 'assets/img/sports/' + Sport.name.toLowerCase() +'/'+ Sport.home.cardImg;
}]);

})();
