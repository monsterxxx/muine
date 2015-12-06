(function(){
'use strict';

angular.module('ps.muine.sports.photo', [])

.controller
('MuineSportsPhotoCtrl', ['$scope', 'Sport', '$timeout',
function                ( $scope  ,  Sport ,  $timeout){
  console.log('> SportsPhotoCtrl load');
  var doLog = true;

  //Data
  //from ancestor's template used
  //$scope.section
  $scope.sport = Sport;

  var sportName = Sport.name.toLowerCase();

  $scope.bgImg = 'assets/img/sports/' + sportName +'/'+ Sport.home.bgImg;

  $scope.slides = Sport.photo.slides.map(function (imgName) {
    return 'assets/img/sports/' + sportName +'/'+ imgName;
  });

  $scope.currSlide = 0;

  $scope.isCurrSlide = function (index) {
    return index === $scope.currSlide;
  };

  $scope.selectSlide = function (index) {
    $scope.currSlide = index;
  };

  $scope.nextSlide = function () {
    $scope.slideRight = false;
    $timeout(function () {
      $scope.currSlide++;
    }, 5);
  };

  $scope.prevSlide = function () {
    $scope.slideRight = true;
    $timeout(function () {
      $scope.currSlide--;
    }, 5);
  };

}]);

})();
