angular.module('ps.scrolling', [])

.directive('psSmoothScroll', ['$rootScope', function($rootScope) {
  return function($scope, element, attrs) {
    element.on('click', function (event) {
      var doLog = true;
      if (doLog) {console.log('> psSmoothScroll click event');}

      //prevent click event on menu item, if another transition is running
      if (doLog) {console.log('$rootScope.psMuineScrolling: '+ $rootScope.psMuineScrolling);}
      if ($rootScope.psMuineScrolling) {
        event.preventDefault();
      }
    });
  };
}])



.directive('psMuineScrollSpy', ['$rootScope', '$state', 'PsMuineStatesSvc', function($rootScope, $state, PsMuineStatesSvc) {
  var doLog = true;

  var defaultStates = PsMuineStatesSvc.getDefaultStates();

  function initialize() {
    var doLog = false;
    if (doLog) {console.log('> psMuineScrollSpy > initialize function');}

    //page sections based on ps-smooth-scroll attributes and their scroll positions
    $rootScope.pageSections = [];
    $rootScope.breakPoints = [];
    $('[ps-smooth-scroll]').each(function () {
      var pageSection = {};
      pageSection.name = $(this).attr('ps-smooth-scroll');
      pageSection.offset = parseInt($(this).attr('offset')) || 0;

      $rootScope.pageSections.push(pageSection);
      $rootScope.breakPoints.push($('#'+ pageSection.name).offset().top + pageSection.offset);
    });
    $rootScope.breakPoints.push($(document).height());
    if (doLog) {console.log('pageSections: '+ angular.toJson($rootScope.pageSections));}
    if (doLog) {console.log('breakPoints: '+ $rootScope.breakPoints);}

    //scrollspy
    var prevSection = 0;
    var currSection = 0;
    var prevScroll = 0;
    var currScroll = 0;
    var scrollDown;

    var i = 0;
    var length = $rootScope.breakPoints.length;
    var $window = $(window);
    var $body = $('body');
    var stateToGo = {};

    function scrollHandler() {
      //current scroll position
      currScroll = $window.scrollTop();

      //current section based on scroll position and break points
      for (i = 0; i < length; i++) {
        if (doLog) {console.log(i, currScroll, $rootScope.breakPoints[i], currScroll < $rootScope.breakPoints[i]);}
        if (currScroll < $rootScope.breakPoints[i]) {
          currSection = i - 1;
          break;
        }
      }

      //scroll direction
      scrollDown = (currScroll > prevScroll) ? true : false;

      if (doLog) {console.log(currScroll, $rootScope.psMuineScrolling, currSection, prevSection);}

      //do nothing if scrolling in last (prices) section or another transition is running
      if (currSection !== length - 2 && !$rootScope.psMuineScrolling) {
        if (doLog) {console.log('currSection: '+ currSection);}
        //do state.go transition to prev or next sections depending on scroll direction
        if ( scrollDown ) {
          if (doLog) {console.log('scrollin down');}
          stateToGo = defaultStates[$rootScope.pageSections[prevSection + 1].name];
        } else {
          if (doLog) {console.log('scrollin up');}
          stateToGo = defaultStates[$rootScope.pageSections[prevSection - 1].name];
        }
        $state.go(stateToGo.name, stateToGo.params);
      }

      //prepare to next scroll event
      prevScroll = currScroll;
      prevSection = currSection;

    }

    //prevent wheel if another transition is running
    //otherwise, scroll only 1 px to make transition start smooth
    function handleWheel(e) {
      // var currSection = $state.current.name.split('.')[1];
      // var currScroll = $window.scrollTop();
      if ($rootScope.psMuineScrolling) {
        e.preventDefault();
      } else if (e.wheelDelta < 0) { //moving down
          //act as normal mousewheel if it's the last section
          if (currSection !== length - 2) {
            e.preventDefault();
            window.scrollBy(0,1);
          }
        } else { //moving up
          //act as normal mousewheel if it's the last section and current scroll is in it
          if (currScroll <= $rootScope.breakPoints[length - 2]
          ) {
            e.preventDefault();
            window.scrollBy(0,-1);
          }
        }
    }

    //define listners
    $window.on('scroll', scrollHandler);
    window.onwheel = handleWheel;

  }

  return function($scope, element, attrs) {
    if (doLog) {console.log('> psMuineScrollSpy');}
    $rootScope.$on('$stateChangeSuccess', function (evt, toState, toParams, fromState) {
      if (doLog) {console.log('> psMuineScrollSpy > on.stateChangeSuccess');}
      if (doLog) {console.log('  fromState: '+ fromState.name +', toState: '+ toState.name);}

      //when all states are loaded, record sections' names and offsets
      if ($rootScope.firstInit === true
          && fromState.name === 'muine.prices'
          && toState.name === 'muine.home'
      ) {
        initialize();
      }

      if ($rootScope.firstInit === false) {

        //animation starts if another muine router branch is activated
        var fromStateNameArr = fromState.name.split('.');
        var toStateNameArr = toState.name.split('.');
        if ( fromStateNameArr[0] === 'muine' && toStateNameArr[0] === 'muine'
             && fromStateNameArr[1] !== toStateNameArr[1]) {
          console.log('  external transition');
          //define section to smoothscroll to
          var sectionName = toStateNameArr[1];
          var sectionOffset = 0;

          var target = $('#'+ sectionName);

          if (doLog) {console.log('  pageSections: '+ angular.toJson($rootScope.pageSections));}

          var $body = $('body');

          //find this section offset in pageSections array
          for (var i = 0; i < $rootScope.pageSections.length; i++) {
            if ($rootScope.pageSections[i].name === sectionName) {
              sectionOffset = $rootScope.pageSections[i].offset;
              break;
            }
          }
          console.log('offset: '+ sectionOffset);

          target.velocity('scroll', {
            duration: 1000,
            offset: sectionOffset,
            begin: function () {
              if (doLog) {console.log('> psMuineScrollSpy > velocity begin');}
              $rootScope.psMuineScrolling = true;
            },
            complete: function () {
              if (doLog) {console.log('> psMuineScrollSpy > velocity complete');}
              window.setTimeout(function () {
                $rootScope.psMuineScrolling = false;
              }, 35);
            }
          });

        }
      }


    });
  };
}]);
