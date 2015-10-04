'use strivt';

angular.module('psApp.navbar', [])

.directive('psNavbar', function(){
  return {
    restrict: 'E',
    templateUrl: 'components/navbar/navbar-directive.html',
    link: function(scope,element,attrs){
      // element.text('futurePSNavbar!');
    }
  };
});
