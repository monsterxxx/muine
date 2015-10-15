'use strict';

angular.module('myApp.muine', [])

.config(function ($urlRouterProvider) {
  $urlRouterProvider
  //check that provided id is in the index range of real data array
  .when('/muine/clubs/:clubId', ['$match', '$stateParams', 'muineDataSvc', function($match, $stateParams, muineDataSvc){
    console.log('$urlRouterProvider');
    if ($match.clubId >= 0 && $match.clubId < muineDataSvc.getLength('clubs')) {
      return false;
    }
    return '/muine';
  }])
  .otherwise('/muine');
})
.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('muine', {
    url: '/muine',
    templateUrl: 'muine/muine.html',
    controller: 'MuineCtrl'
  })
  .state('muine.sports', {
    url: '/sports'
  })
  .state('muine.clubs', {
    url: '/clubs/{clubId:int}', //(?:[0-9])
    controller: ['$stateParams', function($stateParams) {
    }]
  })
  .state('muine.spots', {
    url: '/spots'
  })
  .state('muine.prices', {
    url: '/prices'
  });
}])
.controller('MuineCtrl', function() {
})
.run(
  [          '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$on('$stateChangeSuccess', function(){
        console.log('event > stateChangeSuccess');
        console.log($rootScope.$state.current.name);
      });
    }
  ]
);
