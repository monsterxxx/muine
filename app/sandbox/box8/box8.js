(function(){

'use strict';

angular.module('myApp.box8', [])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('box8', {
    url: '/box8',
    templateUrl: 'sandbox/box8/box8.html',
    controller: 'Box8Ctrl'
  })
  .state('box8.sports', {
    abstract: true,
    sticky: true,
    url: '/sports/{sportId:int}'
  })
    .state('box8.sports.home', {
      url: '/home'
    })
    .state('box8.sports.photo', {
      url: '/photo'
    })
    .state('box8.sports.video', {
      url: '/video'
    })
  .state('box8.clubs', {
    abstract: true,
    url: '/clubs/{clubId:int}'
  })
    .state('box8.clubs.home', {
      url: '/home'
    })
    .state('box8.clubs.photo', {
      url: '/photo'
    })
    .state('box8.clubs.video', {
      url: '/video'
    })
    .state('box8.clubs.contact', {
      url: '/contact'
    })
  .state('box8.spots', {
    abstract: true,
    url: '/spots/{spotId:int}'
  })
    .state('box8.spots.home', {
      url: '/home'
    })
    .state('box8.spots.photo', {
      url: '/photo'
    })
    .state('box8.spots.video', {
      url: '/video'
    })
  .state('box8.prices', {
    url: '/prices'
  });
  }])

  .controller('Box8Ctrl', function($scope, MuineDataSvc, $state) {

  $scope.data = MuineDataSvc.getData();

  $scope.dataKeysList = Object.keys($scope.data);

  $scope.rootState = $state.current.name.split('.')[0];

  $scope.stateList = $state.get();

  })

  .controller('mainMenuItemCtrl3', function ($scope, $timeout, $stateParams, $state) {
  console.log($scope.dataPath + ' > controller load');

  //light version of data collection (only names and ids) for this menu item (dataPath)
  $scope.col = [];
  $scope.data[$scope.dataPath].forEach(function (item) {
    $scope.col.push({
      name: item.name,
      id: item.id
    });
  });
  //collection length is frequently used in following functions
  $scope.colLength = $scope.col.length;
  //itemIdParam - to access this item's $stateParam id
  $scope.itemIdParam = $scope.dataPath.slice(0, -1).concat('Id');

  //current id is either allready specified or provided in url and accessed through $stateParams. Otherwise take first collection element
  $scope.id = $scope.id || parseInt($stateParams[$scope.itemIdParam]) || $scope.col[0].id;

  //index of current item in collection is used to access its properties and find siblings
  $scope.indexById = function (id) {
    for (var i = 0; i < $scope.colLength; i++) {
      if ($scope.col[i].id === id) {
        return i;
      }
    }
  };
  $scope.index = $scope.indexById($scope.id);

  $scope.$watch('index', function () {
    //console.log('ctrl watch index > '+$scope.index);
  });

  //list of all child states
  $scope.childStates = [];
  $scope.stateList.forEach(function (state) {
    var nameArr = state.name.split('.');
    if (nameArr[0] === $scope.rootState && nameArr[1] === $scope.dataPath && nameArr[2]) {
      $scope.childStates.push(nameArr[2]);
    }
  });

  $scope.prevId = function () {
    if ($scope.index === 0) {return $scope.col[$scope.colLength - 1].id;}
    return $scope.col[$scope.index - 1].id;
  };
  $scope.nextId = function () {
    if ($scope.index === $scope.colLength - 1) {return $scope.col[0].id;}
    return $scope.col[$scope.index + 1].id;
  };

  //functions to populate ng-href links
  //TODO check situation with to many requests per stateChange to the following functions
  $scope.uiSref = function () {
    return '#/'+ $scope.rootState +'/'+ $scope.dataPath +'/'+$scope.id+'/';
  };
  $scope.prevUiSref = function () {
    return '#/'+ $scope.rootState +'/'+ $scope.dataPath +'/'+$scope.prevId()+'/'+ $scope.childStates[0];
  };
  $scope.nextUiSref = function () {
    return '#/'+ $scope.rootState +'/'+ $scope.dataPath +'/'+$scope.nextId()+'/'+ $scope.childStates[0];
  };

});

})();
