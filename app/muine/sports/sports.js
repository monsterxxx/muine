(function(){
'use strict';

angular.module('ps.muine.sports', [])

.controller
('MuineSportsCtrl', ['$scope', '$stateParams', 'muineData', 'PsUtils', '$rootScope', 'Sport',
function            ( $scope ,  $stateParams ,  muineData ,  PsUtils ,  $rootScope ,  Sport){
  console.log('> SportsCtrl load');
  var doLog = false;

  $rootScope.sportsResolving = false;
  //get data
  $scope.sport = Sport;
  if (doLog) console.log('$scope.sport'+JSON.stringify($scope.sport , null, 2));

  $scope.bgImg = 'assets/img/sports/' + Sport.name.toLowerCase() +'/'+ Sport.home.bgImg;

  $scope.currPhoto = 0;

  $scope.sectionFocus = function (bool) {
    $scope.sectionInFocus = bool;
    var $controls = $('#sports').find('.slider-control');
    if (bool) {
      $controls.removeClass('hide-slider-controls');
    } else {
      $controls.addClass('hide-slider-controls');
    }
  };



}]);

})();
