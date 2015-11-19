(function(){

'use strict';

angular.module('myApp.muine', [
  'ps.scrolling',
  'ps.background-img',
  'ps.muine.navbar',
  'ps.muine.navbar.subcontrol',
  'ps.muine.sports',
  'ps.muine.clubs',
  'ps.muine.spots',
  'ps.muine.prices'
])

.config(function ($urlRouterProvider, $stickyStateProvider) {
  //$stickyStateProvider.enableDebug(true);
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
    }
  })
  .state('muine.home', {
    url: '',
    sticky: true
  })
  .state('muine.sports', {
    url: '/sports',
    abstract: true,
    sticky: true,
    deepStateRedirect: true,
    views: {
      'sports': {
        templateUrl: './muine/sports/sports.html',
        controller: 'MuineSportsCtrl'
      }
    }
  })
  .state('muine.sports.sport', {
    url: '/{sportId:int}',
    abstract: true
  })
    .state('muine.sports.sport.home', {
      url: '/home'
    })
    .state('muine.sports.sport.photo', {
      url: '/photo'
    })
    .state('muine.sports.sport.video', {
      url: '/video'
    })
  .state('muine.clubs', {
    url: '/clubs', //(?:[0-9])
    abstract: true,
    sticky: true,
    // deepStateRedirect: true,
    views: {
      'clubs': {
        templateUrl: './muine/clubs/clubs.html',
        controller: 'MuineClubsCtrl'
      }
    }
  })
  .state('muine.clubs.club', {
    url: '/{clubId:int}',
    abstract: true
  })
    .state('muine.clubs.club.home', {
      url: '/home'
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
    abstract: true,
    sticky: true,
    // deepStateRedirect: true,
    views: {
      'spots': {
        templateUrl: './muine/spots/spots.html',
        controller: 'MuineSpotsCtrl'
      }
    }
  })
  .state('muine.spots.spot', {
    url: '/{spotId:int}',
    abstract: true
  })
    .state('muine.spots.spot.home', {
      url: '/home'
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
.run(
  [          '$rootScope', '$state', '$stateParams', '$stickyState',
    function ($rootScope,   $state,   $stateParams ,  $stickyState ) {
      console.log('> run');
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$stickyState = $stickyState;
      $rootScope.$on("$stateChangeError", function () {
        console.log('> stateChangeError');
        console.log.bind(console);
      });

      $rootScope.firstInit = false;
      $rootScope.$on('$stateChangeSuccess', function(evt, toState, toParams, fromState){
        console.log('> stateChangeSuccess > '+ $rootScope.$state.current.name);
        //first initialization
        if (toState.name === 'muine.home' && fromState.name === ''){
          $rootScope.firstInit = true;
          $state.go("muine.sports.sport.home", {sportId: 3}, { location: false }).then(function () {
            $state.go("muine.clubs.club.home", {clubId: 49}, { location: false }).then(function () {
              $state.go("muine.spots.spot.home", {spotId: 3}, { location: false }).then(function () {
                $state.go("muine.prices", {}, { location: false }).then(function () {
                  $state.go("muine.home").then(function () {
                    $rootScope.firstInit = false;
                  });
                });
              });
            });
          });
        }
        //all states are loaded
        if ($rootScope.firstInit === true && toState.name === 'muine.prices') {
          //console.log('All states are loaded! Inittialization!');
        }
      });

      //TEST
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
