(function(){

'use strict';

angular.module('myApp.muine', [
  'ps.scrolling',
  'ps.background',
  'ps.muine.navbar',
  'ps.muine.navbar.subcontrol',
  'ps.muine.sports',
  'ps.muine.sports.home',
  'ps.muine.clubs',
  'ps.muine.clubs.home',
  'ps.muine.spots',
  'ps.muine.spots.home',
  'ps.muine.prices',
  'ps.muine.layout',
  'angular-velocity'
])

.config(function ($urlRouterProvider, $stickyStateProvider) {
  //$stickyStateProvider.enableDebug(true);
  // Don't sync the url till all sticky states are preloaded
  $urlRouterProvider.deferIntercept();
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
    abstract: true,
    views: {
      'muine': {
        templateUrl: './muine/muine.html',
        controller: 'MuineCtrl'
      }
    },
    resolve: {
      muineData: ['MuineDataSvc', function (MuineDataSvc) {
        return MuineDataSvc.getData();
      }]
    }
  })
  .state('muine.home', {
    url: '',
    sticky: true,
    preload: true,
    views: {
      'home': {}
    }
  })
  .state('muine.sports', {
    url: '/sports',
    sticky: true,
    dsr: true,
    views: {
      'sports': {
        templateUrl: './muine/sports/sportsSticky.html'
      }
    }
  })
  .state('muine.sports.sport', {
    url: '/{sportId:int}',
    abstract: true,
    templateUrl: './muine/sports/sports.html',
    controller: 'MuineSportsCtrl'
  })
    .state('muine.sports.sport.home', {
      url: '/home',
      preload: true,
      preloadParams: {sportId: 3},
      templateUrl: './muine/sports/home/home.html',
      controller: 'MuineSportsHomeCtrl'
    })
    .state('muine.sports.sport.photo', {
      url: '/photo'
    })
    .state('muine.sports.sport.video', {
      url: '/video'
    })
  .state('muine.clubs', {
    url: '/clubs',
    sticky: true,
    dsr: true,
    views: {
      'clubs': {
        templateUrl: './muine/clubs/clubsSticky.html',
      }
    }
  })
  .state('muine.clubs.club', {
    url: '/{clubId:int}',
    abstract: true,
    templateUrl: './muine/clubs/clubs.html',
    controller: 'MuineClubsCtrl'
  })
    .state('muine.clubs.club.home', {
      url: '/home',
      preload: true,
      preloadParams: {clubId: 49},
      templateUrl: './muine/clubs/home/home.html',
      controller: 'MuineClubsHomeCtrl'
    })
    .state('muine.clubs.club.photo', {
      url: '/photo'
    })
    .state('muine.clubs.club.video', {
      url: '/video'
    })
    .state('muine.clubs.club.contact', {
      url: '/contact'
    })
  .state('muine.spots', {
    url: '/spots',
    sticky: true,
    dsr: true,
    views: {
      'spots': {
        templateUrl: './muine/spots/spotsSticky.html'
      }
    }
  })
  .state('muine.spots.spot', {
    url: '/{spotId:int}',
    abstract: true,
    templateUrl: './muine/spots/spots.html',
    controller: 'MuineSpotsCtrl'
  })
    .state('muine.spots.spot.home', {
      url: '/home',
      preload: true,
      preloadParams: {spotId: 3},
      templateUrl: './muine/spots/home/home.html',
      controller: 'MuineSpotsHomeCtrl'
    })
    .state('muine.spots.spot.photo', {
      url: '/photo'
    })
    .state('muine.spots.spot.video', {
      url: '/video'
    })
  .state('muine.prices', {
    url: '/prices',
    sticky: true,
    preload: true,
    views: {
      'prices': {
        templateUrl: './muine/prices/prices.html',
        controller: 'MuinePricesCtrl'
      }
    }
  });
}])

.controller('MuineCtrl', ['$scope', '$stickyState', function($scope, $stickyState) {
  console.log('> MuineCtrl load');
  $scope.navbarTransparent = true;

  //scrollspy
  $(window).scroll(function() {
   if ($(this).scrollTop() === 0) {
     $scope.$apply(function () {
       $scope.navbarTransparent = true;
     });
   } else {
     $scope.$apply(function () {
       $scope.navbarTransparent = false;
     });
   }
  });

  //DEBUG //TEST //EXPERIMENT
  $scope.refreshDebugInfo = function () {
    console.log(angular.toJson($stickyState.getInactiveStates()));
  };

}])

.run(     ['$state', '$q', '$urlRouter', '$rootScope', 'PsMuineScroll', '$location', '$timeout',
function  ( $state,   $q,   $urlRouter,   $rootScope,   PsMuineScroll,   $location ,  $timeout ) {
  var doLog = true;

  //firstInit var prevents scrolling on stateChangeSuccess while preloading states
  $rootScope.firstInit = false;

  // get list of all registered states
  $state.get()
     // limit to those with 'state.preload'
    .filter(function(state) { return state.preload; })
    // create a promise chain that goes to the state, then goes to the next one
    .reduce(function (memo, state) {
      // dont update the location (location: false)
      return memo.then(function() {
        return $state.go(state, state.preloadParams || {}, { location: false }); });
    }, $q.when())
    .then(function() {
      //Now, when all sections are rendered, run essential scrolling functions
      PsMuineScroll.initialize();
      $rootScope.firstInit = false;
      if (doLog) {console.log('> RUN > before url sync');}

      // ok, now sync the url
      $urlRouter.listen();
      // $urlRouter.sync(); //sync() is used to sync just once

      //if the last preloaded state is the state required by user,
      //force scroll to it, as there will be no state transition and consequent scrolling
      if (doLog) {console.log('$location.url(): '+ $location.url());}
      if ($state.href($state.current.name) === '#' + $location.url()) {
        PsMuineScroll.scroll($state.current.name.split('.')[1]);
      }
    });
}])

.run(
  [          '$rootScope', '$state', '$stateParams', '$stickyState', 'PsMuineScroll',
    function ($rootScope,   $state,   $stateParams ,  $stickyState ,  PsMuineScroll) {
      var doLog = false;

      if (doLog) {console.log('> run');}
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$stickyState = $stickyState;
      $rootScope.$on("$stateChangeError", function () {
        console.log('> stateChangeError');
        console.log.bind(console);
      });

      //$rootScope.firstInit = false;
      var toPara = {};
      var toStat = '';
      $rootScope.$on('$stateChangeSuccess', function(evt, toState, toParams, fromState){
        console.log('> stateChangeSuccess > '+ fromState.name +' --> '+ toState.name, toParams);
      });

      //DEBUG UTIL
      $rootScope.log = function(message){
        console.log(message);
      };

      //DOM TEST
      // window.onload = function () {
      //   window.alert(document.documentURI);
      // };
    }
  ]
);

})();
