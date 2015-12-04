(function(){

'use strict';

angular.module('muineApp.services.data', [])
.factory('MuineDataSvc', function(){
  //In future, when data is pulled from server db, it should be cached
  //Data recieved in sorted order
  var sports = [{
    id: 3,
    name: 'Windsurfing',
    description: 'The Free-Sail System potented by Jim Drake and Hoyle Schweitzer in 1970 has underwent an agile path of evolution.\
      The sport itself has greatly evolved and offers you everything from crazy wave riding and freestyle to astonishing\
      flatwater tricks! Windsurfing is widly presented in Muine.',
    home: {
      bgImg: '1.jpg',
      cardImg: '4w.jpg'
    }
  },{
    id: 55,
    name: 'Kitesurfing',
    description: 'The Free-Sail System potented by Jim Drake and Hoyle Schweitzer in 1970 has underwent an agile path of evolution.\
      The sport itself has greatly evolved and offers you everything from crazy wave riding and freestyle to astonishing\
      flatwater tricks! Windsurfing is widly presented in Muine.',
    home: {
      bgImg: '1w.jpg',
      cardImg: '1w.jpg'
    }
  },{
    id: 87,
    name: 'Surfing',
    description: 'The Free-Sail System potented by Jim Drake and Hoyle Schweitzer in 1970 has underwent an agile path of evolution.\
      The sport itself has greatly evolved and offers you everything from crazy wave riding and freestyle to astonishing\
      flatwater tricks! Windsurfing is widly presented in Muine.',
    home: {
      bgImg: '1.jpg',
      cardImg: '1.jpg'
    }
  },{
    id: 49,
    name: 'SUP',
    description: 'The Free-Sail System potented by Jim Drake and Hoyle Schweitzer in 1970 has underwent an agile path of evolution.\
      The sport itself has greatly evolved and offers you everything from crazy wave riding and freestyle to astonishing\
      flatwater tricks! Windsurfing is widly presented in Muine.',
    home: {
      bgImg: '1.jpg',
      cardImg: '1.jpg'
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
