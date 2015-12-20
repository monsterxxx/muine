(function(){
'use strict';

angular.module('ps.muine.prices', [])

.controller('MuinePricesCtrl', ['$scope', function ($scope) {
  console.log('> PricesCtrl load');
  $scope.price = 'very Expensive!';
}]);

})();
