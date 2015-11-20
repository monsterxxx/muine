(function(){

'use strict';

angular.module('ps.utils', [])
.factory('PsUtils', function(){
  return {
    getById: function (col, id) { //colliction and id
      for (var i = 0; i < col.length; i++) {
        if (col[i].id === id) {
          return col[i];
        }
      }
    }
  };
});

})();
