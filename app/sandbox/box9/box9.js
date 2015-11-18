(function(){

'use strict';

angular.module('myApp.box9', [])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('box9', {
    url: '/box9',
    templateUrl: 'sandbox/box9/box9.html',
    controller: 'Box9Ctrl'
  })
  .state('box9.sports', {
    url: '/sports/{sportId:int}',
    sticky: true,
    deepStateRedirect: { default: { state: "box9.sports.home", params: {sportId: 3} } },
    views: {
      'sportsview': {
        template: '<a style="margin: 0 4px" ng-repeat="i in [1,2,3,4]"'
                  + ' ui-sref="box9.sports.home({sportId: i})">{{i}}</a>',
        controller: function ($scope) {
          $scope.greeting = 'hello!';
        }
      }
    }
  })
    .state('box9.sports.home', {
      url: '/home'
    })
    .state('box9.sports.photo', {
      url: '/photo'
    })
    .state('box9.sports.video', {
      url: '/video'
    })
  .state('box9.clubs', {
    //abstract: true,
    url: '/clubs/{clubId:int}',
    deepStateRedirect: true,
    template: '<a style="margin: 0 4px" ng-repeat="i in [1,2,3,4]"'
              + ' ui-sref="box9.clubs.home({clubId: i})">{{i}}</a>'
  })
    .state('box9.clubs.home', {
      url: '/home'
    })
    .state('box9.clubs.photo', {
      url: '/photo'
    })
    .state('box9.clubs.video', {
      url: '/video'
    })
    .state('box9.clubs.contact', {
      url: '/contact'
    });
}])

.controller('Box9Ctrl', function($scope) {

});

})();
