(function(){

'use strict';

angular.module('myApp.box4', [])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('box4', {
    url: '/box4',
    templateUrl: 'sandbox/box4/box4.html',
    controller: 'Box4Ctrl'
  });
}])

.controller('Box4Ctrl', function($scope, $interval, $timeout) {
  $scope.listOrigin = [0,1,2,3,4,5,6];
  $scope.speed = 0.5;
  $scope.isOld = function (item) {
    return item === $scope.old;
  };
  $scope.isSelected = function (item) {
    return item === $scope.selected;
  };
  $scope.select = function () {
    $scope.old = 0;
    $scope.selected = Math.floor(Math.random()*($scope.listOrigin.length - 1)) + 1;
    $timeout(function () {
      $scope.list.splice(0, 0, $scope.list.splice($scope.selected, 1)[0]);
    }, 100);
    $timeout(function () {
      $scope.list = [$scope.selected];
    }, 102);
  };
  $scope.list = [0];
  $timeout(function () {
    $scope.list = [0,1,2,3,4,5,6];
    // $scope.list.push.apply($scope.list, [1,2,3,4,5,6]);
  }, 1);
  $timeout(function () {
    $scope.select();
  }, 2000);

})

.animation('.b4-c', ['$animateCss', function($animateCss) {
  var getScope = function(e) {
    return angular.element(e).scope();
  };
  return {
    enter: function(element, doneFn) {
      return $animateCss(element, {
        from: { transform: 'translate(0,-180px)' },
        to: { transform: 'translate(0,0)' },
        duration: 1.5,
      });
    },
    leave: function(element, doneFn) {
      var $scope = getScope(element);
      var height = element[0].offsetHeight;
      var startHeight = $scope.item < $scope.selected ? height : 0;
      console.log($scope.item, startHeight);
      return $animateCss(element, {
        from: { transform: 'translate(0,-' + startHeight + 'px)' },
        to: { transform: 'translate(0,-' + (startHeight + height * $scope.listOrigin.length) +'px)' },
        duration: $scope.listOrigin.length*$scope.speed,
      });
    }
  };
}])

.animation('.b4-old', ['$animateCss', function($animateCss) {
  var getScope = function(e) {
    return angular.element(e).scope();
  };
  return {
    leave: function(element, doneFn) {
      var $scope = getScope(element);
      var height = element[0].offsetHeight;
      return $animateCss(element, {
        from: { transform: 'translate(0,-'+ height +'px)' },
        to: { transform: 'translate(0,-'+ 2*height +'px)' },
        duration: $scope.speed,
        delay: ($scope.selected - 1 ) * $scope.speed
      });
    }
  };
}])

.animation('.b4-selected', ['$animateCss', function($animateCss) {
  var getScope = function(e) {
    return angular.element(e).scope();
  };
  return {
    move: function(element, doneFn) {
      var $scope = getScope(element);
      var height = element[0].offsetHeight;
      return $animateCss(element, {
        from: { transform: 'translate(0,'+ $scope.selected * height +'px)' },
        to: { transform: 'translate(0,0)' },
        duration: $scope.selected * $scope.speed
      });
    }
  };
}]);

})();
