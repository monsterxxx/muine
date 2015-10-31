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

.controller('box7DirCtrl', function () {
  console.log('> dirCtrl load');
})

.directive('box7Dir', function (MuineDataSvc, $timeout, $state, $stateParams, $q) {
  var data = MuineDataSvc.getData();
  //console.log(angular.toJson());
  return {
    restrict: 'E',
    templateUrl: 'sandbox/box7/box7Dir.html',
    controller: 'box7DirCtrl',
    link: function ($scope, element, attrs) {
      console.log('> dir load');


      //EXTERNAL DATA
        //FROM PARENT SCOPES:
        //root router state                          $scope.rootState
        //dataPath defining app menu item            $scope.dataPath
        //first element of the childStates list      $scope.childStates[0]

      //collection of menu elements
      var col = $scope.col;

      //VARIABlES
      var $menu = element.find('.menu');

      //FUNCTIONS FOR TESTING PURPOSES
      $scope.$watch('index', function () {
        //console.log('dir watch index  > '+ $scope.index);
      });

      $scope.$watch('id', function () {
        //console.log('dir watch id     > '+ $scope.id);
      });

      $scope.test = function () {
        console.log('test!');
      };

      function sleep(miliseconds) {
         var currentTime = new Date().getTime();
         while (currentTime + miliseconds >= new Date().getTime()) {
         }
       }



      //FUNCTIONS
      //generating html of a menu item
      var genSelected = function (index) {
        return '<li class="selected" data-index="'+ $scope.index + '">' +
                  '<span>'+ col[$scope.index].name + '</span>' +
                '</li>';
      };
      var genSubselect = function (index) {
        var href = '#/'+ $scope.rootState +'/'+ $scope.dataPath +'/' +
                    col[index].id +'/'+ $scope.childStates[0];
        return '<li class="subselect" data-index="'+index+'">' +
                 '<a href="'+ href +'">'+ col[index].name +'</a>' +
               '</li>';
      };

      //ui
      $scope.prevItem = function () {
        $scope.leftClicked = true;
      };

      $scope.nextItem = function () {
        $scope.rightClicked = true;
      };

      $scope.toggleMenu = function () {
        if ($scope.menuOpened) {
          closeMenu();
        } else {
          openMenu();
        }
      };

      $menu.on('click', '.subselect', function () {
        $scope.subselectClicked = true;
        console.log('clicked');
      });

      //animations
      //submenu speed item/ms
      var speed = 150;

      var slide = function (direction) {
        if (direction !== 'Left' && direction !== 'Right') {
          console.log('direction for slide() should be either Left or Right');
        }
        //console.log('slide'+direction >);
        var reverse = (direction === 'Left') ? 'Right': 'Left';

        var selected = element.find('.selected')
          .first();

        var temp = selected.find('span')
          .clone()
          .addClass('temp');
        selected.append(temp);
          //.insertAfter(selected);

        setTimeout(function() {
            temp.velocity('transition.slide'+ reverse +'BigOut', function () {
              temp.remove();
            });
        }, 10);

        selected.attr('data-index', $scope.index);

        var span = selected.find('span').first();
        span.text(col[$scope.index].name);

        if (!span.hasClass('velocity-animating')) {
          span.velocity('transition.slide'+ direction +'BigIn');
        }
        element.find('.icon').removeClass('active');
      };

      var openMenu = function () {
        console.log('> openMenu()');

        $scope.menuOpened = true;

        var $selected = element.find('.selected');
        var menuOffset = $selected.outerHeight() * (col.length - 1);
        for (var i = 0; i < col.length; i++){
          if (i !== $scope.index){
            var $subselect = angular.element(genSubselect(i));
            $subselect.css({ 'top' : '-' + menuOffset + 'px' });
            //TODO check why following variant is not working:
            //$subselect.css({ 'transform' : 'translateY(-' + menuOffset + 'px)' });
            console.log(i,$subselect);

            $menu.append($subselect);

            $subselect.velocity({
              'translateY':  menuOffset + 'px',
              //'translateY':  0
            },{
              duration: speed * (col.length - 1),
              easing: 'linear'
            });
          }
        }
      };

      var closeMenu = function () {
        console.log('> closeMenu()');

        var $selected = element.find('.selected');
        var menuOffset = $selected.outerHeight() * (col.length - 1);
        console.log(menuOffset);
        //take all subselect elements, translate them up and remove
        element.find('.subselect').velocity({
          'translateY': 0
        },{
          duration: speed * (col.length - 1),
          easing: 'linear',
          complete: function (elements) {
            console.log(elements);
            elements.forEach(function (el) {
              angular.element(el).remove();
            });
          }
        });

        $scope.menuOpened = false;
      };

      var select = function () {
        console.log('> select()');
        var old = $menu.find('.selected');
        var selected = $menu.find('.subselect[data-index="'+ $scope.index +'"]');
        selected
          .removeClass('subselect')
          .addClass('selected')
          .html('<span>'+ col[$scope.index].name + '</span>');
        var subselect = $menu.find('.subselect');

        var height = old.outerHeight();
        // index position of selected element in current DOM list
        var selectedIndex = selected.index();
        old.velocity({
          'translateY': '-' + height
        },{
          easing: 'linear',
          duration: speed,
          delay: speed * (selectedIndex - 1),
        });
        selected.velocity({
          'translateY': height * (col.length - selectedIndex - 1)
        },{
          easing: 'linear',
          duration: speed * selectedIndex
        });
        subselect.velocity({
          'translateY': 0
        },{
          duration: speed * (col.length - 1),
          easing: 'linear',
          complete: function (elements) {
            $menu.html(genSelected($scope.index));
          }
        });
        $scope.menuOpened = false;
      };



      //BOOTSTRAP
      element.find('.menu').html(genSelected($scope.index));
      //reaction on a state change
      $scope.$on('$stateChangeSuccess', function(){
        console.log('dir > stateChange processing');

        if ($state.includes($scope.rootState +'.'+ $scope.dataPath)) {
          $scope.id = parseInt($stateParams[$scope.itemIdParam]);
          $scope.index = $scope.indexById($scope.id);
          //if left/right carets or subselect were clicked, perform animation
          if ($scope.leftClicked) {
            $scope.leftClicked = false;
            slide('Left');
          }
          if ($scope.rightClicked) {
            $scope.rightClicked = false;
            slide('Right');
          }
          if ($scope.subselectClicked) {
            select();
            $scope.subselectClicked = false;
          }

          $scope.menuList = [$scope.col[$scope.index]];
          $scope.menuExpanded = false;
          console.log('stateChange > $scope.id > '+ $scope.id +', $scope.index > '+ $scope.index);
        }
      });

    }
  };
});

})();
