(function(){

'use strict';

angular.module('ps.muine.navbar.subcontrol', [])

.directive('psMuineSubcontrol', ['MuineDataSvc', '$timeout', '$state', '$stateParams', '$q', '$rootScope',
function (                        MuineDataSvc ,  $timeout ,  $state ,  $stateParams ,  $q ,  $rootScope) {
  var doLog = false;
  //console.log('>> psMuineSubcontrol');

  var data = MuineDataSvc.getData();

  return {
    restrict: 'E',
    templateUrl: 'components/navbar/subcontrol/subcontrol.html',
    link: function ($scope, element, attrs) {
      if (doLog) {console.log('>>> NavbarCtrl > mainMenuItemCtrl1( '+ $scope.dataKey +' ) > subcontrolDir load');}

      //EXTERNAL DATA
        //FROM PARENT SCOPES:
        //root router state                          $scope.rootState
        //dataKey defining app menu item            $scope.dataKey
        //first element of the childStates list      $scope.childStates[0]
        //collection of menu elements
        var col = $scope.col;

      //index of current item in collection is used to access its properties and find siblings
      $scope.indexById = function (id) {
        for (var i = 0; i < $scope.colLength; i++) {
          if ($scope.col[i].id === id) {
            return i;
          }
        }
      };
      $scope.index = $scope.indexById($scope.id);


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



      //FUNCTIONS
      //generating html of a menu item
      var genSelected = function (index) {
        return '<li class="selected" data-index="'+ $scope.index + '">' +
                  '<span>'+ col[$scope.index].name + '</span>' +
                '</li>';
      };
      var genSubselect = function (index) {
        var href = '#/'+ $scope.rootState +'/'+ $scope.dataKey +'/' +
                    col[index].id +'/'+ $scope.childStates[0];
        return '<li class="subselect" data-index="'+index+'">' +
                 '<a href="'+ href +'">'+ col[index].name +'</a>' +
               '</li>';
      };



      //UI
      $scope.prevItem = function () {
        $rootScope.slideRight = true;
        $scope.leftClicked = true;
        if ($scope.menuOpened) {
          closeMenu();
        }
      };

      $scope.nextItem = function () {
        $scope.rightClicked = true;
        if ($scope.menuOpened) {
          closeMenu();
        }
      };

      $scope.toggleMenu = function () {
        if ($scope.menuOpened) {
          closeMenu();
        } else {
          console.log('open from toggleMenu');
          openMenu();
        }
      };

      $menu.on('click', '.subselect', function () {
        $scope.subselectClicked = true;
      });

      $(document).mouseup(function (e) {
        e.stopPropagation();
        //close menu if there was a click outside of an opened menu
        if  ( $scope.menuOpened
              // && !$menu.is(e.target)
              // && $menu.has(e.target).length === 0
              // && !element.find('.icon').is(e.target)
              && !element.is(e.target)
              && element.has(e.target).length === 0
            ) {
          console.log('close from mouseup');
          closeMenu();
        }
      });

      //ANIMATIONS
      //submenu speed item/ms
      var speed = 150;
      var speedEnter = 150;

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

        var $span = selected.find('span').first();
        $span.text(col[$scope.index].name);

        if (!$span.hasClass('velocity-animating')) {
          $span.velocity('transition.slide'+ direction +'BigIn');
        }
        element.find('.icon').removeClass('active');
      };

      var openMenu = function () {
        console.log('> openMenu()');

        var speed = speedEnter;

        $scope.menuOpened = true;

        var $selected = element.find('.selected');
        var menuOffset = $selected.outerHeight() * (col.length - 1);
        for (var i = 0; i < col.length; i++){
          if (i !== $scope.index){
            var $subselect = angular.element(genSubselect(i));
            $subselect.css({ 'top' : '-' + menuOffset + 'px' });
            //TODO check why following variant is not working:
            //$subselect.css({ 'transform' : 'translateY(-' + menuOffset + 'px)' });

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
        //take all subselect elements, translate them up and remove
        element.find('.subselect').velocity({
          'translateY': 0
        },{
          duration: speed * (col.length - 1),
          easing: 'linear',
          complete: function (elements) {
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
        // index position of selected element in current DOM list
        var selectedIndex = selected.index();
        var height = old.outerHeight();

        //underlay to properly hide borders of selected item under the old
        var underlay = $('<li class="underlay">Olala</li>')
          .width(old.innerWidth() - 2)
          .insertBefore(selected);

        selected
          .removeClass('subselect')
          .addClass('selected')
          .html('<span style="position: absolute;">'+ col[$scope.index].name + '</span>');

        var subselect = $menu.find('.subselect');

        old.find('span').velocity({
          'translateY': '-' + height
        },{
          easing: 'linear',
          duration: speed,
          delay: speed * (selectedIndex - 1),
        });

        selected
          .velocity({
            'translateY': height * (col.length - selectedIndex - 1)
          },{
            easing: 'linear',
            duration: speed * selectedIndex
          });

        underlay
          .velocity({
            //'top': '-' + height * (selectedIndex + 1)
            'translateY': '-' + height * selectedIndex
          },{
            easing: 'linear',
            duration: speed * selectedIndex
            // before: function () {
            //   console.log('el'+$(this));
            // }
          });

        subselect
          .velocity({
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
        var doLog = false;
        if (doLog) {console.log('>>> NavbarCtrl > mainMenuItemCtrl1( '+ $scope.dataKey +' ) > subcontrolDir > stateChangeSuccess > start');}

        if ($state.includes($scope.rootState +'.'+ $scope.dataKey)) {
          $scope.id = parseInt($stateParams[$scope.itemIdParam]);
          $scope.index = $scope.indexById($scope.id);
          //if left/right carets or subselect were clicked, perform animation
          if ($scope.leftClicked) {
            $scope.leftClicked = false;
            $timeout(function () {
              $rootScope.slideRight = false;
            }, 300);
            slide('Left');
          } else
          if ($scope.rightClicked) {
            $scope.rightClicked = false;
            slide('Right');
          } else
          if ($scope.subselectClicked) {
            select();
            $scope.subselectClicked = false;
          }
          //if state change was triggered from other place, change name
          else {
            element.find('.selected').find('span').text(col[$scope.index].name);
          }

          if (doLog) {console.log('stateChange > $scope.id > '+ $scope.id +', $scope.index > '+ $scope.index);}
        }
      });

    }
  };
}]);

})();
