(function(){

'use strict';

angular.module('myApp.box3', [])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('box3', {
    url: '/box3',
    templateUrl: 'sandbox/box3/box3.html',
    controller: 'box3Ctrl'
  });
}])

.controller('box3Ctrl', [function() {

}]);

})();
