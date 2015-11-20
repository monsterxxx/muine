// http://stackoverflow.com/questions/13781685/angularjs-ng-src-equivalent-for-background-imageurl

angular.module('ps.background', [])

.directive('psBgImg', function() {
  return {

    scope: {
      psBgImg: '@'
    },
    link: function(scope, element, attrs) {
      // var url = attrs.psBgImg;
      console.log('> psBgImg');
      console.log(scope.psBgImg);
      element.css({
        'background-image': 'url(' + scope.psBgImg + ')',
        'background-size': 'cover',
        'background-position': 'center center'
      });
    }

  };
});
