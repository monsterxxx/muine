(function(){

'use strict';

angular.module('myApp.box7', [])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('box7', {
    url: '/box7',
    templateUrl: 'sandbox/box7/box7.html',
    controller: 'Box7Ctrl'
  });
}])

.controller('Box7Ctrl', function($scope) {

})

.directive('box7Dir', function (MuineDataSvc, $timeout) {
  var data = MuineDataSvc.getData();
  //console.log(angular.toJson());
  return {
    restrict: 'E',
    templateUrl: 'sandbox/box7/box7Dir.html',
    link: function (scope, element, attrs) {

    var rootState = scope.$state.current.name.split('.')[0];
    scope.rootState = rootState;

    var col = scope.lCol || data[attrs.path];

    var index = 0;

    //scope.index = index;

    scope.$watch('index', function () {
      console.log('dir watch index  > '+scope.index);

    });

    scope.$watch('id', function () {
      console.log('dir watch id     > '+scope.id);

    });

    element.find('.menu').html('<li class="selected" data-index="'+index+'"><a href="#/'+ rootState +'">'+ col[index].name +'</a></li>');

    element.find('a.icon').click(function(){
      if (!$(this).hasClass('active')) {
        for (var i = 0; i < col.length; i++){
          if (i !== index){
            element.find('.menu').append('<li class="subselect" data-index="'+i+'"><a href="#/'+ rootState +'">'+ col[i].name +'</a></li>');
            //element.find('ul.menu').append($compile('<li class="subselect" data-index="'+i+'" ng-click="select()" ><a href="#/'+ rootState +'">'+ col[i].name +'</a></li>')(scope));
          }
        }
        //scope.$apply();
        $(this).addClass('active');
      } else {
        element.find('menu').html('<li class="selected"><a href="#/'+ rootState +'">'+ col[index].name +'</a></li>');
        $(this).removeClass('active');
      }
    });

    scope.select = function () {
      console.log('select!');
    };

    element.find('.menu').on('click', '.subselect', function(){
      index = parseInt($(this).attr('data-index'), 10);
      element.find('.menu').html('<li class="selected" data-index="'+index+'"><a href="#/'+ rootState +'">'+ col[index].name +'</a></li>');
      element.find('.icon').removeClass('active');
    });

    element.find('.caret-left').click(function(){
      if (index === 0) {
        index = col.length - 1;
      } else {
        index = index - 1;
      }
      element.find('.selected').velocity('transition.slideRightBigOut', function () {
        element.find('.menu').html('<li class="selected" data-index="'+index+'"><a href="#/'+ rootState +'">'+ col[index].name +'</a></li>');
        element.find('.selected').velocity('transition.slideLeftBigIn');
      });
      element.find('.icon').removeClass('active');
    });

    element.find('.caret-right').click(function(){
      if (index === col.length - 1) {
        index = 0;
        scope.index = index;
      } else {
        index = index + 1;
        console.log(index);
        scope.index = index;
        console.log(scope.index);
        scope.select();
      }
      element.find('.selected').velocity('transition.slideLeftBigOut', function () {
        element.find('.menu').html('<li class="selected" data-index="'+index+'"><a href="#/'+ rootState +'">'+ col[index].name +'</a></li>');
        element.find('.selected').velocity('transition.slideRightBigIn');
      });
      element.find('.icon').removeClass('active');
    });

    }
  };
});

})();
