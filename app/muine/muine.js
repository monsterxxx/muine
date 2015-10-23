(function(){

'use strict';

angular.module('myApp.muine', [])

.config(function ($urlRouterProvider) {
  $urlRouterProvider
  .when('/muine/clubs/:clubId', ['$match', '$stateParams', 'MuineDataSvc', function($match, $stateParams, MuineDataSvc){
    console.log('$urlRouterProvider');
    //check that provided id exists in real data array
    var exists = MuineDataSvc.getDataPart('clubs').some(function (club, index, array) {
      return club.id === id;
    });
    //return false if exists. It will continue to corresponding state
    if (exists === true) {
      return false;
    }
    //otherwise redirect
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
    abstract: true,
    url: '/clubs/{clubId:int}' //(?:[0-9])
  })
  .state('muine.clubs.home', {
    url: '/home'
  })
  .state('muine.clubs.photo', {
    url: '/photo'
  })
  .state('muine.clubs.video', {
    url: '/video'
  })
  .state('muine.clubs.contact', {
    url: '/contact'
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
      //for testing purposes
      $rootScope.log = function(message){
        console.log(message);
      };
    }
  ]
);

})();
