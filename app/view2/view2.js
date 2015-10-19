(function(){

'use strict';

angular.module('myApp.view2', [])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('view2', {
    url: '/view2',
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])
.controller('View2Ctrl', function() {})
.controller('View2Ctrl1', function($scope) {
  //init vars
  $scope.clubmenu = {
    limit: 1
  };
  $scope.nameVar = 'name';
  //get data
  $scope.data = {
    clubs:
      [{
        name: 'Rids',
        id: 12
      },{
        name: 'Surf4You',
        id: 87
      },{
        name: 'VKS',
        id: 35
      },{
        name: 'Kitesurf Vietnam',
        id: 44
      },{
        name: 'Source Kiteboarding',
        id: 87
      },{
        name: "Jibe's",
        id: 94
      }]
  };
  //populating array items with 'active' property
  $scope.data.clubs.forEach(function(club){
    club.active = false;
  });
  //assigning active club
  $scope.data.clubs[_.findIndex($scope.data.clubs, {name: 'VKS'})].active = true;

  //assigning functions

  $scope.setActive = function(name){
    //deactivate all clubs
    $scope.data.clubs.forEach(function(club){
      club.active = false;
    });
    //activate provided club
    $scope.data.clubs[_.findIndex($scope.data.clubs, {name: name})].active = true;
  };

  $scope.swapClubs = function () {
    var tempClub = $scope.data.clubs[2];
    $scope.data.clubs[2] = $scope.data.clubs[3];
    $scope.data.clubs[3] = tempClub;
  };

})
.controller('View2Ctrl2', function($scope, $timeout){
  //init vars
  $scope.clubmenu = {
    limit: 1
  };
  $scope.nameVar = 'name';
  $scope.oldActiveClubId = 0;
  //get data
  $scope.data = {
    clubs:
      [{
        name: 'Rids',
        id: 12
      },{
        name: 'Surf4You',
        id: 87
      },{
        name: 'VKS',
        id: 35
      },{
        name: 'Kitesurf Vietnam',
        id: 44
      },{
        name: 'Source Kiteboarding',
        id: 55
      },{
        name: "Jibe's",
        id: 94
      }]
  };
  //second array just for title
  $scope.data2 = {
    clubs:
      [{
        name: 'VKS',
        id: 35
    }]
  };
  //populating array items with 'active' property
  $scope.data.clubs.forEach(function(club){
    club.active = false;
  });
  //assigning active club
  $scope.newActiveClubIndex = _.findIndex($scope.data.clubs, {name: 'VKS'});
  $scope.newActiveClubId = $scope.data.clubs[$scope.newActiveClubIndex].id;
  $scope.data.clubs[$scope.newActiveClubIndex].active = true;

  //assigning functions
  $scope.setActive = function(id){
    //write new active clubs values
    $scope.oldActiveClubId = $scope.newActiveClubId;
    $scope.oldActiveClubName = $scope.data.clubs[$scope.newActiveClubIndex].name;
    $scope.newActiveClubId = id;
    $scope.data.clubs[$scope.newActiveClubIndex].active = false;
    $scope.newActiveClubIndex = _.findIndex($scope.data.clubs, {id: id});
    $scope.data.clubs[$scope.newActiveClubIndex].active = true;
    //addAnimation adds animation class to element through ng-class attr
    $scope.addAnimation = true;
    $timeout(function () {
      $scope.addAnimation = false;
      $scope.oldActiveClubId = 0;
    }, 5000);
    $scope.clubmenu.limit = 1;
  };
  $scope.setActive2 = function(id){
    //write new active clubs values
    $scope.oldActiveClubId = $scope.newActiveClubId;
    $scope.oldActiveClubName = $scope.data.clubs[$scope.newActiveClubIndex].name;
    $scope.newActiveClubId = id;
    $scope.data.clubs[$scope.newActiveClubIndex].active = false;
    $scope.newActiveClubIndex = _.findIndex($scope.data.clubs, {id: id});
    $scope.data.clubs[$scope.newActiveClubIndex].active = true;
    $scope.data2 = {
      clubs:
        [$scope.data.clubs[$scope.newActiveClubIndex]]
    };
    $scope.clubmenu.limit = 1;
  };
  $scope.clubs1 = [$scope.data.clubs[3]];
  $scope.clubs2 = [$scope.data.clubs[1]];
  $scope.transClubs = function () {
    $scope.clubs2.splice(0,1);
    $scope.clubs1.push($scope.data.clubs[1]);
  };
});

})();
