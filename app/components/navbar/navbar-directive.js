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
  $scope.clubs = MuineDataSvc.getData('clubs');
  //initialize variables
  $scope.clubId = $scope.clubId || parseInt($stateParams.clubId) || 3;

  //assign controller functions
  $scope.prevId = function(collection, id){
    if (id === 0) {return collection.length - 1;}
    return id - 1;
  };
  $scope.nextId = function(collection, id){
    if (id === collection.length - 1) {return 0;}
    return id + 1;
  };

  $scope.$on('$stateChangeSuccess', function(){
    if ($state.includes('muine.clubs')) {
      $scope.clubId = parseInt($stateParams.clubId);
    }
  });

}]);


})();
