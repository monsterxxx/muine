(function(){

'use strict';

angular.module('ps.muine.services.states', [])
.factory('PsMuineStatesSvc', function(){
  var defaultStates = {
    home: {
      name: 'muine.home',
      params: {}
    },
    sports: {
      name: 'muine.sports.sport.home',
      params: {sportId: 3}
    },
    clubs: {
      name: 'muine.clubs.club.home',
      params: {clubId: 49}
    },
    spots: {
      name: 'muine.spots.spot.home',
      params: {spotId: 3}
    },
    prices: {
      name: 'muine.prices',
      params: {}
    }
  };
  return {
    getDefaultStates: function(){
      return defaultStates;
    }
  };
});

})();
