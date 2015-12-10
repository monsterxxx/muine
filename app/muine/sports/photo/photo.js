(function(){
'use strict';

angular.module('ps.muine.sports.photo', [])

.controller
('MuineSportsPhotoCtrl', ['$scope', '$rootScope', 'Sport', '$timeout', '$q', '$state',
function                ( $scope  ,  $rootScope ,  Sport ,  $timeout ,  $q ,  $state ){
  console.log('> SportsPhotoCtrl load');
  var doLog = true;


  //DATA
  $scope.sport = Sport;

  var sportName = Sport.name.toLowerCase();

  $scope.slides = Sport.photo.slides.map(function (imgName) {
    return 'assets/img/sports/' + sportName +'/'+ imgName;
  });

  //from ancestor's template
  $scope.currSlide = $scope.$parent.currPhoto;


  //animation on enter
  var $controls = $('#sports').find('.slider-control');
  $controls.addClass('hide-slider-controls');
  window.setTimeout(function () {
    $controls.removeClass('hide-slider-controls');
  }, 100);

  //animation on leave
  $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
    if ($rootScope.firstInit || $controls.hasClass('hide-slider-controls') || toState.name.indexOf('muine.sports.sport') === -1) return;
    if (fromState.name === 'muine.sports.sport.photo' ) {
      event.preventDefault();
      $controls.addClass('hide-slider-controls');
      $timeout(function () {
        $state.go(toState, toParams);
      }, 400);
    }
  });


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
    resolveSlide(index).then(function () {
      $scope.currSlide = index;
      $scope.$parent.bgImg = $scope.slides[index];
      $scope.$parent.currPhoto = index;
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
