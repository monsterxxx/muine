(function(){
'use strict';

angular.module('ps.muine.sports.video', [])

.controller
('MuineSportsVideoCtrl', ['$scope', 'Sport', '$timeout',
function                ( $scope  ,  Sport ,  $timeout ){
  console.log('> SportsVideoCtrl load');
  var doLog = true;

  //Data
  $scope.sport = Sport;

  $scope.slides = Sport.video.slides;

  //Init
  $scope.currSlide = 0;

  $scope.slideRight = false;

  //FUNCTIONS
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
    }, 500);
  };

  var prevIndex = function (array, index) {
    if (index === 0) return array.length - 1; else return --index;
  };

  var nextIndex = function (array, index) {
    if (index === array.length - 1) return 0; else return ++index;
  };

  // var resolveSlide = function (index) {
  //   $('#sports-loader').show();
  //   var imageSrc = $scope.slides[index];
  //   var deferred = $q.defer();
  //   var image = new Image();
  //   image.onload = function () {
  //     $('#sports-loader').hide();
  //     deferred.resolve();
  //   };
  //   image.src = imageSrc;
  //   return deferred.promise;
  // };

  //UI
  $scope.nextSlide = function () {
    var nextSlide = nextIndex($scope.slides, $scope.currSlide);
    $scope.selectSlide(nextSlide);
  };

  $scope.prevSlide = function () {
    var prevSlide = prevIndex($scope.slides, $scope.currSlide);
    $scope.selectSlide(prevSlide);
  };

}]);

})();
