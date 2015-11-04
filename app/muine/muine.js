(function(){

'use strict';

angular.module('myApp.muine', [
  'ps.scrolling',
  'ps.background-img',
  'ps.muine.sports',
  'ps.muine.clubs',
  'ps.muine.spots',
  'ps.muine.prices'
])

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
    url: '/sports/{sportId:int}',
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
    .state('muine.sports.home', {
      url: '/home'
    })
    .state('muine.sports.photo', {
      url: '/photo'
    })
    .state('muine.sports.video', {
      url: '/video'
    })
  .state('muine.clubs', {
    url: '/clubs/{clubId:int}', //(?:[0-9])
    abstract: true,
    sticky: true,
    deepStateRedirect: true,
    views: {
      'clubs': {
        templateUrl: './muine/clubs/clubs.html',
        controller: 'MuineClubsCtrl'
      }
    }
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
    url: '/spots/{spotId:int}',
    abstract: true,
    sticky: true,
    deepStateRedirect: true,
    views: {
      'spots': {
        templateUrl: './muine/spots/spots.html',
        controller: 'MuineSpotsCtrl'
      }
    }
  })
    .state('muine.spots.home', {
      url: '/home'
    })
    .state('muine.spots.photo', {
      url: '/photo'
    })
    .state('muine.spots.video', {
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
  [          '$rootScope', '$state', '$stateParams', '$stickyState', 'PsScrollSpy',
    function ($rootScope,   $state,   $stateParams ,  $stickyState ,  PsScrollSpy) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$stickyState = $stickyState;
      $rootScope.$on("$stateChangeError", console.log.bind(console));

      var firstInit = false;
      $rootScope.$on('$stateChangeSuccess', function(evt, toState, toParams, fromState){
        console.log('> stateChangeSuccess > '+ $rootScope.$state.current.name);
        //first initialization
        if (toState.name === 'muine.home' && fromState.name === ''){
          firstInit = true;
          $state.go("muine.sports.home", {sportId: 3}, { location: false }).then(function () {
            $state.go("muine.clubs.home", {clubId: 49}, { location: false }).then(function () {
              $state.go("muine.spots.home", {spotId: 3}, { location: false }).then(function () {
                $state.go("muine.prices", {}, { location: false }).then(function () {
                  firstInit = false;
                  $state.go("muine.home");
                });
              });
            });
          });
        }
        //all states are loaded
        if (firstInit === true && toState.name === 'muine.prices') {
          //console.log('All states are loaded! Inittialization!');
          PsScrollSpy.initialize();
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
