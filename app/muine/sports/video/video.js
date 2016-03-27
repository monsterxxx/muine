(function(){
'use strict';

angular.module('ps.muine.sports.video', [])

.controller
('MuineSportsVideoCtrl', ['$scope', '$rootScope', 'Sport', '$state', '$timeout',
function                ( $scope  ,  $rootScope ,  Sport ,  $state ,  $timeout ){
  console.log('> SportsVideoCtrl load');
  var doLog = true;

  //Data
  $scope.sport = Sport;

  $scope.slides = Sport.video.slides;

  //Init
  $scope.currSlide = 0;
  $scope.slideRight = false;
  $scope.youtubePlayers = [];
  var noPauseStates = [-1, 5];

  //animation on enter
  var $controls = $('#sports').find('.slider-control');
  $controls.addClass('hide-slider-controls');
  window.setTimeout(function () {
    $controls.removeClass('hide-slider-controls');
  }, 100);

  //animation and pause video on leave
  $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
    var playerState = $scope.youtubePlayers[$scope.currSlide].getPlayerState();
    if (toState.name.indexOf('muine.sports.sport') === -1 &&  noPauseStates.indexOf(playerState) === -1) {
      $scope.youtubePlayers[$scope.currSlide].pauseVideo();
    }
    if ($rootScope.firstInit || $controls.hasClass('hide-slider-controls') || toState.name.indexOf('muine.sports.sport') === -1) return;
    if (fromState.name === 'muine.sports.sport.video' ) {
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
    var playerState = $scope.youtubePlayers[$scope.currSlide].getPlayerState();
    console.log('videoState > '+playerState);
    if (noPauseStates.indexOf(playerState) === -1) $scope.youtubePlayers[$scope.currSlide].pauseVideo();
    $timeout(function () {
      $scope.currSlide = index;
    }, 100);
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
