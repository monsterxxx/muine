// http://stackoverflow.com/questions/13781685/angularjs-ng-src-equivalent-for-background-imageurl

angular.module('ps.background-img', [])

.directive('psBackImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
});
