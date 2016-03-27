(function(){
'use strict';

angular.module('ps.muine.home', [])

.controller('MuineHomeCtrl', ['$scope', '$rootScope', '$timeout', '$q', '$state',
function                     ( $scope ,  $rootScope ,  $timeout ,  $q ,  $state ){
  console.log('> HomeCtrl load');

  //animation on enter
  // var $controls = $('#sports').find('.slider-control');
  // $controls.addClass('hide-slider-controls');
  // window.setTimeout(function () {
  //   $controls.removeClass('hide-slider-controls');
  // }, 100);

  //ANIMATIONS
  //animation on leave
  $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
    if (fromState.name === 'muine.home' ) {
      if ($rootScope.firstInit) return;
      fixSelectedItemStyle();
    }
  });

  //This is a fix for strange navcontrol > selected items behavior.
  //  Could not get it done with css transition.
  var fixSelectedItemStyle = function () {
    var $selected = $('li.selected');
    $selected.velocity({
      backgroundColorAlpha: 0
    },{
      duration: 0,
      delay: 0
    }).velocity({
      backgroundColorAlpha: 1
    },{
      duration: 0,
      delay: 1000
    });
  };

}]);


})();
