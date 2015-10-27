(function(){

'use strict';

angular.module('myApp.box5', [])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('box5', {
    url: '/box5',
    templateUrl: 'sandbox/box5/box5.html',
    controller: 'Box5Ctrl'
  }).state('box5.sports', {
  abstract: true,
  url: '/sports/{sportId:int}'
})
  .state('box5.sports.home', {
    url: '/home'
  })
  .state('box5.sports.photo', {
    url: '/photo'
  })
  .state('box5.sports.video', {
    url: '/video'
  })
.state('box5.clubs', {
  abstract: true,
  url: '/clubs/{clubId:int}'
})
  .state('box5.clubs.home', {
    url: '/home'
  })
  .state('box5.clubs.photo', {
    url: '/photo'
  })
  .state('box5.clubs.video', {
    url: '/video'
  })
  .state('box5.clubs.contact', {
    url: '/contact'
  })
.state('box5.spots', {
  abstract: true,
  url: '/spots/{spotId:int}'
})
  .state('box5.spots.home', {
    url: '/home'
  })
  .state('box5.spots.photo', {
    url: '/photo'
  })
  .state('box5.spots.video', {
    url: '/video'
  })
.state('box5.prices', {
  url: '/prices'
});
}])

.controller('Box5Ctrl', function($scope, MuineDataSvc, $state) {

$scope.data = MuineDataSvc.getData();

$scope.dataKeysList = Object.keys($scope.data); //[0] is for testing

$scope.rootState = $state.current.name.split('.')[0];

$scope.stateList = $state.get();

})

.controller('mainMenuItemCtrl2', function ($scope, $timeout, $stateParams, $state) {
console.log($scope.dataPath + '> controller load');
//data collection for this menu item (dataPath)
$scope.col = $scope.data[$scope.dataPath];
//itemIdParam - to access this item's $stateParam id
$scope.itemIdParam = $scope.dataPath.slice(0, -1).concat('Id');
//current id is either allready specified or provided in url and accessed through $stateParams. Otherwise take first collection element
$scope.id = $scope.id || parseInt($stateParams[$scope.itemIdParam]) || $scope.col[0].id;
//collection length is frequently used in following functions
$scope.colLength = $scope.col.length;

//index of current item in collection is used to access its properties and find siblings
var indexById = function (id) {
  for (var i = 0; i < $scope.colLength; i++) {
    if ($scope.col[i].id === id) {
      return i;
    }
  }
};
$scope.index = indexById($scope.id);

$scope.$watch('index', function () {
  console.log('ctrl watch index > '+$scope.index);
});

//list of all child states
$scope.childStates = [];
$scope.stateList.forEach(function (state) {
  var nameArr = state.name.split('.');
  if (nameArr[0] === $scope.rootState && nameArr[1] === $scope.dataPath && nameArr[2]) {
    $scope.childStates.push(nameArr[2]);
  }
});

//light version of collection to use in menu and index - id match
$scope.lCol = [];
$scope.col.forEach(function (item) {
  $scope.lCol.push({
    name: item.name,
    id: item.id
  });
});

$scope.menuList = [$scope.lCol[$scope.index]];

$scope.menuExpanded = false;
$scope.toggleMenu = function () {
  if ($scope.menuExpanded === false) {
    $scope.menuExpanded = true;
    var addList = $scope.lCol.slice();
    addList.splice($scope.index, 1);
    $scope.menuList = $scope.menuList.concat(addList);
  } else {
    $scope.menuExpanded = false;
    $scope.menuList.splice(1);
  }
};

$scope.prevId = function () {
  if ($scope.index === 0) {return $scope.lCol[$scope.colLength - 1].id;}
  return $scope.lCol[$scope.index - 1].id;
};
$scope.nextId = function () {
  if ($scope.index === $scope.colLength - 1) {return $scope.lCol[0].id;}
  return $scope.lCol[$scope.index + 1].id;
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



$scope.$on('$stateChangeSuccess', function(){
  if ($state.includes($scope.rootState +'.'+ $scope.dataPath)) {
    $scope.id = parseInt($stateParams[$scope.itemIdParam]);
    $scope.index = indexById($scope.id);
    $scope.menuList = [$scope.lCol[$scope.index]];
    $scope.menuExpanded = false;
    console.log('stateChange > $scope.id > '+ $scope.id +', $scope.index > '+ $scope.index);
  }
});



});

})();
