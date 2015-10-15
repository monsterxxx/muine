(function(){
'use strict';

angular.module('muineApp.services.data', [])
.factory('MuineDataSvc', function(){
  var data = {
    clubs: [{
      name: 'Rids'
    },{
      name: 'Surf4You'
    },{
      name: 'VKS'
    },{
      name: 'Kitesurf Vietnam'
    }]
  };
  return {
    getData: function(){
      return data;
    },
    // function to get lengths of arrays of sports, clubs etc.
    getLength: function(dataAddress){
      return data[dataAddress].length;
    }
  };
});

})();
