(function(){

'use strict';

angular.module('ps.muine.navbar', [])

.factory('NavbarSize', function() {
  return {
    height: 61
  };
})

.directive('psMuineNavbar', function(){
  return {
    restrict: 'E',
    templateUrl: 'components/navbar/navbar.html',
    link: function(scope,element,attrs){
      // element.text('futurePSNavbar!');
    },
    controller: 'NavbarCtrl'
  };
})
.controller('NavbarCtrl', ['$scope', '$state', '$stateParams', 'MuineDataSvc', 'NavbarSize',
                   function($scope,   $state,   $stateParams,   MuineDataSvc ,  NavbarSize ){
  console.log('> NavbarCtrl load');
  //navbar dimensions
  $scope.navbarHeight = NavbarSize.height;

  //get data
  $scope.data = MuineDataSvc.getData();
  //array for ng-repeated main menu items
  $scope.dataKeysList = Object.keys($scope.data);
  //for easy use in different ui state branches
  $scope.rootState = $state.current.name.split('.')[0];
  //state list to traverse by item's controller and find further item's child states
  $scope.stateList = $state.get();

}])

.controller('mainMenuItemCtrl1', function ($scope, $timeout, $stateParams, $state) {
  console.log('>> NavbarCtrl > mainMenuItemCtrl1( '+ $scope.dataKey +') load');
  //collection of data for this menu item (dataKey)
  $scope.col = $scope.data[$scope.dataKey];
  //itemIdParam - to access this item's $stateParam id. Remove pluralise 's' from the end and add 'Id' so that 'sports' become 'sportId'
  $scope.itemIdParam = $scope.dataKey.slice(0, -1).concat('Id');
  //current id is either allready specified or provided in url and accessed through $stateParams. Otherwise take first collection element
  $scope.id = $scope.id || parseInt($stateParams[$scope.itemIdParam]) || $scope.col[0].id;
  //collection length is frequently used in following functions
  $scope.colLength = $scope.col.length;
  //light version of collection to use in menu and index - id match
  $scope.lCol = [];
  $scope.col.forEach(function (item) {
    $scope.lCol.push({
      name: item.name,
      id: item.id
    });
  });

  //index of current item in collection is used to access its properties and find siblings
  var indexById = function (col, id) {
    for (var i = 0; i < col.length; i++) {
      if (col[i].id === id) {
        return i;
      }
    }
  };
  $scope.index = indexById($scope.lCol, $scope.id);

  //list of all child states
  $scope.childStates = [];
  $scope.stateList.forEach(function (state) {
    var nameArr = state.name.split('.');
    if (nameArr[0] === $scope.rootState && nameArr[1] === $scope.dataKey
        && nameArr[2] === $scope.dataKey.slice(0, -1) && nameArr[3]) {
      $scope.childStates.push(nameArr[3]);
    }
  });

  $scope.prevId = function () {
    if ($scope.index === 0) {return $scope.col[$scope.colLength - 1].id;}
    return $scope.col[$scope.index - 1].id;
  };
  $scope.nextId = function () {
    //console.log($scope.index, $scope.colLength, $scope.col[0].id, $scope.col[$scope.index + 1].id);
    if ($scope.index === $scope.colLength - 1) {return $scope.col[0].id;}
    return $scope.col[$scope.index + 1].id;
  };

  //functions to populate ng-href links
  //TODO check situation with to many requests per stateChange to the following functions
  $scope.uiSref = function () {
    return '#/'+ $scope.rootState +'/'+ $scope.dataKey +'/'+$scope.id+'/';
  };
  $scope.prevUiSref = function () {
    return '#/'+ $scope.rootState +'/'+ $scope.dataKey +'/'+$scope.prevId()+'/'+ $scope.childStates[0];
  };
  $scope.nextUiSref = function () {
    //console.log('#/'+ $scope.rootState +'/'+ $scope.dataKey +'/'+$scope.nextId()+'/'+ $scope.childStates[0]);
    return '#/'+ $scope.rootState +'/'+ $scope.dataKey +'/'+$scope.nextId()+'/'+ $scope.childStates[0];
  };

  //on each state change there's a need to reconfig ctrl's current variables
  $scope.$on('$stateChangeSuccess', function(){
    if ($state.includes($scope.rootState +'.'+ $scope.dataKey)) {
      $scope.id = parseInt($stateParams[$scope.itemIdParam]);
      $scope.index = indexById($scope.lCol, $scope.id);
      console.log('>> NavbarCtrl > mainMenuItemCtrl1( '+ $scope.dataKey +') > on(stateChangeSuccess) > finish > $scope.id: '+ $scope.id +', $scope.index: '+ $scope.index);
    }
  });

});


})();
