(function(){
'use strict';

angular.module('ps.muine.sports.home', [])

.controller
('MuineSportsHomeCtrl', ['$scope', '$rootScope', 'Sport', '$timeout', '$state',
function                ( $scope ,  $rootScope ,  Sport ,  $timeout ,  $state){
  console.log('> SportsHomeCtrl load');
  var doLog = false;

  //Data
  $scope.sport = Sport;

  $scope.cardImg = 'assets/img/sports/' + Sport.name.toLowerCase() +'/'+ Sport.home.cardImg;

  // animation on state enter
  $timeout(function () {
    $scope.showCard = true;
  }, 1200);

  //animation on state leave.
  //$scope.showCard is used in ng-show directive which is hooked to animation
  //animation lies in switching $scope.showCard to false
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
    if (fromState.name === 'muine.sports.sport.home' ) {
      if (doLog) console.log('> $stateChangeStart toState.name: '+ toState.name);
      //don't switch if moving vertically
      if (toState.name.indexOf('muine.sports.sport') === -1) return;
      //switch implies delay in state transition in order for animation to take place.
      //this delay is not welcome when indirect transition takes place (see scrolling.js)
      if (!$scope.showCard) return;
      //switch:
      if (doLog) console.log('> $stateChangeStart switch');
      event.preventDefault();
      $scope.showCard = false;
      $timeout(function () {
        $state.go(toState, toParams);
      }, 600);
    }
  });


}]);

})();
