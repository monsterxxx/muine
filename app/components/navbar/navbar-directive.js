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
  //for testing purposes
  $scope.log = function(message){
    console.log(message);
  };
  //get data
  $scope.data = MuineDataSvc.getData();
  $scope.clubId = 0;
  $scope.prevId = function(address, id){
    var arLength = $scope.data[address].length;
    if (id === 0) {return arLength-1};
    return id-1;
  };
  $scope.nextId = function(address, id){
    var arLength = $scope.data[address].length;
    if (id === arLength-1) {return 0};
    return id+1;
  };

  $scope.$on('$stateChangeSuccess', function(){
    if ($state.includes('muine.clubs')) {
      $scope.clubId = parseInt($stateParams.clubId);
    }
    console.log('clubId isInt? > '+ (typeof $scope.clubId === 'number') + ' and equals ' + $scope.clubId);
  });

}]);
