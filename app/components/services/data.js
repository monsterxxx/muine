(function(){

'use strict';

angular.module('muineApp.services.data', [])
.factory('MuineDataSvc', function(){
  //In future, when data is pulled from server db, it should be cached
  //Data recieved in sorted order
  var sports = [{
    id: 3,
    name: 'Windsurfing',
    home: {
      img: '1.jpg'
    }
  },{
    id: 55,
    name: 'Kitesurfing',
    home: {
      img: '1.jpg'
    }
  },{
    id: 87,
    name: 'Surfing',
    home: {
      img: '1.jpg'
    }
  },{
    id: 49,
    name: 'SUP',
    home: {
      img: '1.jpg'
    }
  }];
  var clubs = [{
    id: 49,
    name: 'Kitesurf Vietnam',
    home: {
      img: '1.jpg'
    }
  },{
    id: 3,
    name: 'Rids',
    home: {
      img: '1.jpg'
    }
  },{
    id: 23,
    name: 'Surf4You',
    home: {
      img: '2.jpg'
    }
  },{
    id: 87,
    name: 'VKS',
    home: {
      img: '1.jpg'
    }
  },{
    id: 28,
    name: 'Leto',
    home: {
      img: '2.jpg'
    }
  },{
    id: 99,
    name: "Jibe's",
    home: {
      img: '1.jpg'
    }
  },{
    id: 115,
    name: 'Source Kiteboarding',
    home: {
      img: '2.jpg'
    }
  }];
  var spots = [{
    id: 3,
    name: 'Muine overview',
    home: {
      img: '1.jpg'
    }
  },{
    id: 55,
    name: 'Nga Tro',
    home: {
      img: '2.jpg'
    }
  },{
    id: 87,
    name: 'Tro Nka',
    home: {
      img: '1.jpg'
    }
  },{
    id: 49,
    name: 'Suoi Nuoc',
    home: {
      img: '2.jpg'
    }
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
    getDataKey: function (dataKey) {
      return data[dataKey];
    }
  };
});

})();
