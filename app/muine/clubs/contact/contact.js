(function(){
'use strict';

angular.module('ps.muine.clubs.contact', [])

.controller
('MuineClubsContactCtrl', ['$scope', '$rootScope', 'Club', '$timeout', '$state',
function                  ( $scope ,  $rootScope ,  Club ,  $timeout ,  $state){
  console.log('> ClubsContactCtrl load');
  var doLog = true;

  //Data
  $scope.club = Club;

  $scope.cardLogo = 'assets/img/clubs/' + Club.home.cardLogo;
  $scope.cardAvatar = 'assets/img/clubs/' + Club.home.cardAvatar;

  $('.card-club-top').css({'background-color': Club.home.cardTopBackground});

  $('.collapsible').collapsible();

  // animation on state enter
  //$scope.showCard is used in ng-show directive which is hooked to animation
  //animation lies in switching $scope.showCard to true
  $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    var doLog = false;
    if (toState.name !== 'muine.clubs.club.contact') return;
    //if it was vertical state transition, showCard with a little delay
    //so that in case of indirect transition (see scrolling.js), card never appears
    if (fromState.name.indexOf('muine.clubs.club') === -1) {
      $timeout(function () {
        if (doLog) console.log('showCard1');
        $scope.showCard = true;
      }, 300);
      return;
    }
    //if transition is for this item (sport, club, spot) take a little timeout
    if (toParams.clubId === fromParams.clubId) {
      $timeout(function () {
        if (doLog) console.log('showCard2');
        $scope.showCard = true;
      }, 300);
      return;
    }
    //moving between states (when id param changes) involves horizontal slide
    //animation. In this case wait for slide animation to be completed
    $timeout(function () {
      if (doLog) console.log('showCard3');
      $scope.showCard = true;
    }, 1100);
  });

  //animation on state leave.
  //$scope.showCard is used in ng-show directive which is hooked to animation
  //animation lies in switching $scope.showCard to false
  $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
    var doLog = false;
    if (fromState.name !== 'muine.clubs.club.contact' ) return;
    //don't switch if moving vertically
    if (toState.name.indexOf('muine.clubs.club') === -1) return;
    //switch implies delay in state transition in order for animation to take place.
    //this delay is not welcome when indirect transition takes place (see scrolling.js)
    if (!$scope.showCard) return;
    //switch:
    if (doLog) console.log('hideCard and wait');
    event.preventDefault();
    $scope.showCard = false;
    $timeout(function () {
      $state.go(toState, toParams);
    }, 600);
  });

  // // animation on state enter
  // $timeout(function () {
  //   $scope.showCard = true;
  // }, 1200);


}]);

})();
