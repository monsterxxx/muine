(function(){
'use strict';

angular.module('ps.muine.clubs.home', [])

.controller
('MuineClubsHomeCtrl', ['$scope', '$rootScope', 'Club', '$timeout', '$state',
function               ( $scope ,  $rootScope ,  Club ,  $timeout ,  $state){
  console.log('> ClubsHomeCtrl load');
  var doLog = true;

  //Data
  $scope.club = Club;

  // animation on state enter
  $timeout(function () {
    $scope.showCard = true;
  }, 500);

  $scope.bgImg = 'assets/img/clubs/' + Club.home.bgImg;
  $scope.cardLogo = 'assets/img/clubs/' + Club.home.cardLogo;
  $scope.cardAvatar = 'assets/img/clubs/' + Club.home.cardAvatar;

  $('.card-club-top').css({'background-color': Club.home.cardTopBackground});

  $('.collapsible').collapsible();

}]);

})();
