(function(){

'use strict';

angular.module('ps.utils', [])

.directive('includeReplace', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.replaceWith(element.children());
    }
  };
})

.factory('PsUtils', function(){
  return {
    getById: function (col, id) { //collection and id
      for (var i = 0; i < col.length; i++) {
        if (col[i].id === id) {
          return col[i];
        }
      }
    }
  };
});

})();
