(function(){

'use strict';

angular.module('psApp.navbar', [])

.directive('psNavbar', function(){
  return {
    restrict: 'E',
    templateUrl: 'components/navbar/navbar-directive.html',
    link: function(scope,element,attrs){
      // element.text('futurePSNavbar!');
    },
    controller: 'NavbarCtrl'
  };
})
.controller('NavbarCtrl', ['$scope', '$state', '$stateParams', 'MuineDataSvc', function($scope, $state, $stateParams, MuineDataSvc){
  console.log('NavbarCtrl load');
  //get data
  $scope.data = MuineDataSvc.getData();
  //array for ng-repeated main menu items
  $scope.dataKeysList = Object.keys($scope.data);
  //for easy use in different ui state branches
  $scope.rootState = $state.current.name.split('.')[0];
  //state list to traverse by item's controller and find further item's child states
  $scope.stateList = $state.get();

  //UI
  $scope.brandBackgroundDimmed = false;
  $scope.dimBrandBackground = function () {
      $scope.brandBackgroundDimmed = true;
  };
  $scope.undimBrandBackground = function () {
      $scope.brandBackgroundDimmed = false;
  };

}])

.controller('mainMenuItemCtrl1', function ($scope, $timeout, $stateParams, $state) {
  console.log($scope.dataPath + '> navbar child controller load');
  //collection of data for this menu item (dataPath)
  $scope.col = $scope.data[$scope.dataPath];
  //itemIdParam - to access this item's $stateParam id
  $scope.itemIdParam = $scope.dataPath.slice(0, -1).concat('Id');
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
    if (nameArr[0] === $scope.rootState && nameArr[1] === $scope.dataPath && nameArr[2]) {
      $scope.childStates.push(nameArr[2]);
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
    return '#/'+ $scope.rootState +'/'+ $scope.dataPath +'/'+$scope.id+'/';
  };
  $scope.prevUiSref = function () {
    return '#/'+ $scope.rootState +'/'+ $scope.dataPath +'/'+$scope.prevId()+'/'+ $scope.childStates[0];
  };
  $scope.nextUiSref = function () {
    //console.log('#/'+ $scope.rootState +'/'+ $scope.dataPath +'/'+$scope.nextId()+'/'+ $scope.childStates[0]);
    return '#/'+ $scope.rootState +'/'+ $scope.dataPath +'/'+$scope.nextId()+'/'+ $scope.childStates[0];
  };

  //on each state change there's a need to reconfig ctrl's current variables
  $scope.$on('$stateChangeSuccess', function(){
    if ($state.includes($scope.rootState +'.'+ $scope.dataPath)) {
      $scope.id = parseInt($stateParams[$scope.itemIdParam]);
      $scope.index = indexById($scope.lCol, $scope.id);
      console.log('stateChange > $scope.id > '+ $scope.id +', $scope.index > '+ $scope.index);
    }
  });

});


})();
