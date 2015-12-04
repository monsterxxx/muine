(function(){
'use strict';

angular.module('ps.muine.sports.photo', [])

.controller
('MuineSportsPhotoCtrl', ['$scope', 'Sport',
function                ( $scope ,  Sport){
  console.log('> SportsPhotoCtrl load');
  var doLog = true;

  //Data
  //from ancestor's template used
  //$scope.section
  $scope.sport = Sport;

  $scope.bgImg = 'assets/img/sports/' + Sport.name.toLowerCase() +'/'+ Sport.home.bgImg;
}]);

})();
