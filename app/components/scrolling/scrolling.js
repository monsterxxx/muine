angular.module('ps.scrolling', [])

.directive('psSmoothScroll', ['$rootScope', function($rootScope) {
  return function($scope, element, attrs) {
    element.on('click', function (event) {
      var doLog = false;
      if (doLog) {console.log('> psSmoothScroll click event');}

      //prevent click event on menu item, if another transition is running
      if (doLog) {console.log('$rootScope.psMuineScrolling: '+ $rootScope.psMuineScrolling);}
      if ($rootScope.psMuineScrolling) {
        event.preventDefault();
      }
    });
  };
}])

.factory('PsMuineScroll', ['$rootScope', '$state', 'PsMuineStatesSvc',
function(                   $rootScope,   $state,   PsMuineStatesSvc ) {

  var defaultStates = PsMuineStatesSvc.getDefaultStates();

  var PsMuineScroll = {

    initialize: function initialize() {
      var doLog = false;
      if (doLog) {console.log('> PsMuineScroll.initialize()');}

      //PAGE SECTIONS AND THEIR BREAKPOINTS
      //in html markup page sections are defined as id="section.name"
      //  whereas links leading to these sections defined as ps-smooth-scroll="section.name"
      //breakPoints is an array of navbar scroll positions between sections
      //offsets defined by attributes on the links
      //TODO defining offset on links is actualy extraneous, because it's allways
      //     equals -navbarHeight except for the first section, because of video bg
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

      //VARS DECLARATION
      var prevSection = 0;
      var currSection = 0;
      var prevScroll = 0;
      var currScroll = 0;
      var scrollDown;

      var i = 0;
      var length = $rootScope.breakPoints.length;
      var $window = $(window);
      var $body = $('body');

      //SCROLL HANDLER
      //serves to keep scroll position under control and run corresponding logic
      function scrollHandler() {
        var doLog = false;

        //DETERMINE SCROLL PARAMETERS
        //current scroll position
        currScroll = $window.scrollTop();
        //determine current section based on scroll position within break points
        for (i = 0; i < length; i++) {
          if (doLog) {console.log(i, currScroll, $rootScope.breakPoints[i], currScroll < $rootScope.breakPoints[i]);}
          if (currScroll < $rootScope.breakPoints[i]) {
            currSection = i - 1;
            break;
          }
        }
        //determine scroll direction
        scrollDown = (currScroll > prevScroll) ? true : false;

        //STATE TRANSITION TRIGGER
        //  implementation of a full section scroll design:
        //  vertical scroll will tansite user to the next or prev section
        //do nothing if scrolling in last section or if another transition is running
        //also do nothing if scrolling horizontally
        if (doLog) {console.log(currScroll, $rootScope.psMuineScrolling, currSection, prevSection);}
        if (currSection !== length - 2 && !$rootScope.psMuineScrolling
          && prevScroll !== currScroll
        ) {
          if (doLog) {console.log('currSection: '+ currSection);}
          //do state.go transition to prev or next sections depending on scroll direction
          var stateToGo = {};
          if ( scrollDown ) {
            if (doLog) {console.log('scrollin down');}
            stateToGo = defaultStates[$rootScope.pageSections[prevSection + 1].name];
          } else {
            if (doLog) {console.log('scrollin up');}
            if (doLog) {console.log('check'+prevScroll, currScroll);}
            if (doLog) {console.log(JSON.stringify($rootScope.pageSections , null, 2), prevSection - 1);}
            stateToGo = defaultStates[$rootScope.pageSections[prevSection - 1].name];
          }
          $state.go(stateToGo.name, stateToGo.params);
        }

        //NAVBAR TOP STYLE
        //this is a fix for strange navcontrol > selected items behavior
        //could not get it done with css transition
        if (prevScroll === 0) {
          var $selected = $('li.selected');
          $selected.velocity({
            backgroundColorAlpha: 0
          },{
            duration: 0,
            delay: 0
          }).velocity({
            backgroundColorAlpha: 1
          },{
            duration: 0,
            delay: 1000
          });
        }

        //prepare to the next scroll event
        prevScroll = currScroll;
        prevSection = currSection;
      }


      //MOUSEWHEEL HANDLER
      //prevent wheel event if another transition is running
      //otherwise, scroll only 1 px to make transition start smooth
      function handleWheel(event) {
        doLog = true;
        if ($rootScope.psMuineScrolling) {
          event.preventDefault();
        } else if (event.wheelDelta < 0) { //moving down
            //act as normal mousewheel if it's the last section
            if (currSection !== length - 2) {
              event.preventDefault();
              window.scrollBy(0,1);
            }
          } else { //moving up
            //act as normal mousewheel if it's the last section and current scroll is in it
            if (currScroll <= $rootScope.breakPoints[length - 2]
            ) {
              event.preventDefault();
              window.scrollBy(0,-1);
            }
          }
      }

      // detect available wheel event
      support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
                document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
                "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

      console.log(support);


      //ACTIVATE LISTNERS
      $window.on('scroll', scrollHandler);
      window.onwheel = handleWheel;

      //ON STATECHANGE SCROLL
      $rootScope.$on('$stateChangeSuccess', function (evt, toState, toParams, fromState) {
        if (doLog) {console.log('> PsMuineScroll > on.stateChangeSuccess > '
                                + fromState.name +' --> '+ toState.name);}
        var fromStateNameArr = fromState.name.split('.');
        var toStateNameArr = toState.name.split('.');
        //no scroll while preloading app states
        //scroll only if another muine router branch is activated
        if (doLog) {console.log('  $rootScope.firstInit: '+ $rootScope.firstInit);}
        if ($rootScope.firstInit === false
            && fromStateNameArr[0] === 'muine' && toStateNameArr[0] === 'muine'
            && fromStateNameArr[1] !== toStateNameArr[1]
        ) {
          if (doLog) {console.log('  stateChange triggered scroll passed');}
          PsMuineScroll.scroll(toStateNameArr[1]);
        }
      });

    },
    scroll: function (sectionName) {
      var doLog = false;
      if (doLog) {console.log('> PsMuineScroll.scroll('+ sectionName +')');}

      //find section element to smoothscroll to
      var $target = $('#'+ sectionName);
      if (doLog) {console.log('  $target.length: '+ JSON.stringify($target.length , null, 2));}

      //find this section offset in pageSections array
      var sectionOffset = 0;
      if (doLog) {console.log('  pageSections: '+ angular.toJson($rootScope.pageSections));}
      for (var i = 0; i < $rootScope.pageSections.length; i++) {
        if ($rootScope.pageSections[i].name === sectionName) {
          sectionOffset = $rootScope.pageSections[i].offset;
          break;
        }
      }
      if (doLog) {console.log('  offset: '+ sectionOffset);}

      //velocity smoothscroll
      $target.velocity('scroll', {
        duration: 1000,
        offset: sectionOffset,
        begin: function () {
          if (doLog) {console.log('> PsMuineScroll.scroll('+ sectionName +') > velocity begin');}
          $rootScope.psMuineScrolling = true;
        },
        complete: function () {
          if (doLog) {console.log('> PsMuineScroll.scroll('+ sectionName +') > velocity complete');}
          window.setTimeout(function () {
            $rootScope.psMuineScrolling = false;
          }, 35);
        }
      });
    }
  };

  return PsMuineScroll;
}]);
