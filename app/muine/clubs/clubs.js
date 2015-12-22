(function(){
'use strict';

angular.module('ps.muine.clubs', [])

.controller
('MuineClubsCtrl', ['$scope', '$stateParams', 'muineData', 'PsUtils', 'Club',
function           ( $scope ,  $stateParams ,  muineData ,  PsUtils ,  Club ){
  console.log('> ClubsCtrl load');
  var doLog = false;

  //get data
  $scope.club = Club;
  if (doLog) console.log('$scope.club'+JSON.stringify($scope.club , null, 2));

  $scope.bgImg = 'assets/img/clubs/' + Club.home.bgImg;

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
