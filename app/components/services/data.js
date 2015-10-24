(function(){

'use strict';

angular.module('muineApp.services.data', [])
.factory('MuineDataSvc', function(){
  //In future, when data is pulled from server db, it should be cached
  //Data recieved in sorted order
  var sports = [{
    id: 3,
    name: 'Windsurfing'
  },{
    id: 55,
    name: 'Kitesurfing'
  },{
    id: 87,
    name: 'Surfing'
  },{
    id: 49,
    name: 'SUP'
  }];
  var clubs = [{
    id: 49,
    name: 'Kitesurf Vietnam'
  },{
    id: 3,
    name: 'Rids'
  },{
    id: 23,
    name: 'Surf4You'
  },{
    id: 87,
    name: 'VKS'
  },{
    id: 28,
    name: 'Leto'
  },{
    id: 99,
    name: "Jibe's"
  },{
    id: 115,
    name: 'Source Kiteboarding'
  }];
  var spots = [{
    id: 3,
    name: 'Muine overview'
  },{
    id: 55,
    name: 'Nga Tro'
  },{
    id: 87,
    name: 'Tro Nka'
  },{
    id: 49,
    name: 'Suoi Nuoc'
  }];
  var data = {
    sports: sports,
    clubs: clubs,
    spots: spots
  };
  return {
    getData: function(){
      return data;
    },
    getDataPart: function (dataPath) {
      return data[dataPath];
    }
  };
});

})();
