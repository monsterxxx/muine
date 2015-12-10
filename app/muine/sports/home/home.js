(function(){
'use strict';

angular.module('ps.muine.sports.home', [])

.controller
('MuineSportsHomeCtrl', ['$scope', '$rootScope', 'Sport', '$timeout', '$state',
function                ( $scope ,  $rootScope ,  Sport ,  $timeout ,  $state){
  console.log('> SportsHomeCtrl load');
  var doLog = true;

  //Data
  //from ancestor's template used
  //$scope.section
  $scope.sport = Sport;

  $scope.cardImg = 'assets/img/sports/' + Sport.name.toLowerCase() +'/'+ Sport.home.cardImg;

  // animation on state enter
  $timeout(function () {
    $scope.showCard = true;
  }, 500);

  //animation on state leave
  $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
    if ($rootScope.firstInit || !$scope.showCard || toState.name.indexOf('muine.sports.sport') === -1) return;
    if (fromState.name === 'muine.sports.sport.home' ) {
      event.preventDefault();
      $scope.showCard = false;
      $timeout(function () {
        $state.go(toState, toParams);
      }, 600);
    }
  });

}]);

})();
