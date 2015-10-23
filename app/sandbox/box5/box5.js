(function(){

'use strict';

angular.module('myApp.box5', [])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('box5', {
    url: '/box5',
    templateUrl: 'sandbox/box5/box5.html',
    controller: 'Box5Ctrl'
  });
}])

.controller('Box5Ctrl', function($scope, $interval, $timeout) {
  $scope.listOrigin = [0,1,2,3,4,5,6];
  $scope.leaveSpeed = 0.5;
  $scope.isOld = function (item) {
    return item === $scope.old;
  };
  $scope.isSelected = function (item) {
    return item === $scope.selected;
  };
  $scope.select = function () {
    $scope.old = 0;
    $scope.selected = 4;
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
  }, 10);
  $timeout(function () {
    $scope.select();
  }, 2000);

})

.animation('.b5-c', ['$animateCss', function($animateCss) {
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
        duration: $scope.listOrigin.length*$scope.leaveSpeed,
      });
    }
  };
}])

.animation('.b5-old', ['$animateCss', function($animateCss) {
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
        duration: $scope.leaveSpeed,
        delay: ($scope.selected - 1 ) * $scope.leaveSpeed
      });
    }
  };
}])

.animation('.b5-selected', ['$animateCss', function($animateCss) {
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
        duration: $scope.selected * $scope.leaveSpeed
      });
    }
  };
}]);

})();
