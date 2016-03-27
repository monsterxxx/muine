(function(){
'use strict';

angular.module('ps.muine.spots', [])

.controller
('MuineSpotsCtrl', ['$scope', '$stateParams', 'muineData', 'PsUtils', 'Spot',
function           ( $scope ,  $stateParams ,  muineData ,  PsUtils ,  Spot ){
  console.log('> SpotsCtrl load');
  var doLog = false;

  //get data
  $scope.spot = Spot;
  if (doLog) console.log('$scope.spot'+JSON.stringify($scope.spot , null, 2));

  $scope.bgImg = 'assets/img/spots/' + Spot.home.bgImg;

  $scope.currPhoto = 0;

  $scope.sectionFocus = function (bool) {
    $scope.sectionInFocus = bool;
    var $controls = $('#spots').find('.slider-control');
    if (bool) {
      $controls.removeClass('hide-slider-controls');
    } else {
      $controls.addClass('hide-slider-controls');
    }
  };
}]);

})();
