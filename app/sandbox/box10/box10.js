(function(){

'use strict';

angular.module('myApp.box10', [])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('box10', {
    url: '/box10',
    templateUrl: 'sandbox/box10/box10.html',
    controller: 'Box10Ctrl'
  })
  .state('box10.sports', {
    url: '/sports',
    sticky: true,
    deepStateRedirect: { default: { state: "box10.sports.sport.home", params: {sportId: 3} } },
    views: {
      'sportsview': {
        template: '<a style="margin: 0 4px" ng-repeat="i in [1,2,3,4]"'
                  + ' ui-sref="box10.sports.sport.home({sportId: i})">{{i}}</a>',
        controller: function ($scope) {
          $scope.greeting = 'hello!';
        }
      }
    }
  })
  .state('box10.sports.sport', {
    url: '/{sportId:int}'

  })
    .state('box10.sports.sport.home', {
      url: '/home'
    })
    .state('box10.sports.sport.photo', {
      url: '/photo'
    })
    .state('box10.sports.sport.video', {
      url: '/video'
    })
  .state('box10.clubs', {
    //abstract: true,
    url: '/clubs/{clubId:int}',
    // sticky: true,
    deepStateRedirect: true,
    template: '<a style="margin: 0 4px" ng-repeat="i in [1,2,3,4]"'
              + ' ui-sref="box10.clubs.home({clubId: i})">{{i}}</a>'
  })
    .state('box10.clubs.home', {
      url: '/home'
    })
    .state('box10.clubs.photo', {
      url: '/photo'
    })
    .state('box10.clubs.video', {
      url: '/video'
    })
    .state('box10.clubs.contact', {
      url: '/contact'
    });
}])

.controller('Box10Ctrl', function($scope) {

});

})();
