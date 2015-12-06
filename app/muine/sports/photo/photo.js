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
    if (index > $scope.currSlide) {
      $scope.slideRight = false;
    } else {
      $scope.slideRight = true;
    }
    $timeout(function () {
      $scope.currSlide = index;
    }, 5);
  };

  var prevIndex = function (array, index) {
    if (index === 0) return array.length - 1; else return --index;
  };

  var nextIndex = function (array, index) {
    if (index === array.length - 1) return 0; else return ++index;
  };

  $scope.nextSlide = function () {
    $scope.selectSlide(nextIndex($scope.slides, $scope.currSlide));
  };

  $scope.prevSlide = function () {
    $scope.selectSlide(prevIndex($scope.slides, $scope.currSlide));
  };

}]);

})();
