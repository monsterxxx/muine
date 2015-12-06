(function(){
'use strict';

angular.module('ps.muine.sports.photo', [])

.controller
('MuineSportsPhotoCtrl', ['$scope', 'Sport', '$timeout', '$q',
function                ( $scope  ,  Sport ,  $timeout ,  $q ){
  console.log('> SportsPhotoCtrl load');
  var doLog = true;

  //Data
  //from ancestor's template used
  //$scope.section
  $scope.sport = Sport;

  var sportName = Sport.name.toLowerCase();

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
    resolveSlide(index).then(function () {
      $scope.currSlide = index;
    });
    // $timeout(function () {
    //
    // }, 5);
  };

  var prevIndex = function (array, index) {
    if (index === 0) return array.length - 1; else return --index;
  };

  var nextIndex = function (array, index) {
    if (index === array.length - 1) return 0; else return ++index;
  };

  var resolveSlide = function (index) {
    $('#sports-loader').show();
    var imageSrc = $scope.slides[index];
    var deferred = $q.defer();
    var image = new Image();
    image.onload = function () {
      $('#sports-loader').hide();
      deferred.resolve();
    };
    image.src = imageSrc;
    return deferred.promise;
  };

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
