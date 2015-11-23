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

.factory('PsMuineScroll', ['$rootScope', '$state', 'PsMuineStatesSvc', 'MuineLayoutSvc',
function(                   $rootScope,   $state,   PsMuineStatesSvc ,  MuineLayoutSvc) {

  var defaultStates = PsMuineStatesSvc.getDefaultStates();

  //common jquery objects
  var $window = $(window);
  var $html = $('html');

  //PAGE SECTIONS AND THEIR BREAKPOINTS
  //in html markup page sections are defined as id="pageSection.name"
  //  whereas links leading to these sections defined as ps-smooth-scroll="pageSection.name"
  //breakPoints is an array of window scroll positions between sections
  //  breakPoints take fixed header height into account
  var pageSections = [];
  var breakPoints = [];

  var currScroll = 0;
  var prevScroll = 0;
  var currSection = 0;
  var prevSection = 0;
  //just for scroll handler:
  var scrollDown;

  var PsMuineScroll = {

    findSections: function () {
      var doLog = true;
      if (doLog) {console.log('> PsMuineScroll.findSections()');}

      pageSections = [];
      breakPoints = [];
      var i = 0;
      $('[ps-smooth-scroll]').each(function () {
        var pageSection = {};
        pageSection.name = $(this).attr('ps-smooth-scroll');
        // pageSection.offset = parseInt($(this).attr('offset')) || 0;
        // if (i === 0) {
        //   pageSection.offset = 0;
        // } else {
        //   pageSection.offset = -MuineLayoutSvc.navbarHeight;
        // }
        pageSections.push(pageSection);

        var breakPoint = (i === 0) ? 0 : $('#'+ pageSection.name).offset().top - MuineLayoutSvc.navbarHeight;
        breakPoints.push(breakPoint);
        //breakPoints.push(i * MuineLayoutSvc.sectionHeight + pageSection.offset);
        i++;
      });
      //add the last breakpoint which is the total page height
      breakPoints.push($(document).height());
      if (doLog) {console.log('pageSections: '+ angular.toJson(pageSections));}
      if (doLog) {console.log('breakPoints: '+ breakPoints);}
    },

    //to determine section based on scroll position within break points
    getSection: function (scroll) {
      for (var i = 0; i < breakPoints.length; i++) {
        if (scroll < breakPoints[i]) {
          return i - 1;
        }
      }
    },

    initialize: function () {
      var doLog = true;
      if (doLog) {console.log('> PsMuineScroll.initialize()');}

      //INITIALIZE
      PsMuineScroll.findSections();

      //discard scroll position, as some browsers will refresh saving old value
      $window.scrollTop(0);

      //RESIZE HANDLER
      function handleResize(event) {
        var doLog = true;
        if (doLog) {console.log('resize event!');}
        console.log('$window.scrollTop(): '+ $window.scrollTop());
        $window.off('scroll', PsMuineScroll.scrollHandler);
        console.log('currSection: '+ currSection + ' prevSection: '+ prevSection);
        //redetermine breakPoints
        PsMuineScroll.findSections();

        //find this sectionOffset in breakPoints array
        var sectionOffset = breakPoints[currSection];
        console.log('sectionOffset: '+ sectionOffset);
        $window.scrollTop(sectionOffset);
        console.log('$window.scrollTop(): '+ $window.scrollTop());
        if (breakPoints[currSection] !== $window.scrollTop()) {
          breakPoints[currSection] = $window.scrollTop();
        }
        prevScroll = $window.scrollTop();
        $window.on('scroll', PsMuineScroll.scrollRemover);
        window.setTimeout(function () {
          $window.off('scroll', PsMuineScroll.scrollRemover);
          $window.on('scroll', PsMuineScroll.scrollHandler);
        }, 20);
        // var stateNameArr = $state.current.name.split('.');
        // var sectionOffset = 0;
        // for (var i = 0; i < pageSections.length; i++) {
        //   if (pageSections[i].name === sectionName) {
        //     sectionOffset = breakPoints[i];
        //     break;
        //   }
        // }
        // console.log('sectionOffset: '+sectionOffset);


        //redefine page sections
        // PsMuineScroll.findSections();
      }


      //MOUSEWHEEL HANDLER
      //prevent wheel event if another transition is running
      //otherwise, scroll only 1 px to make transition start smooth
      var delta = 0;
      function handleWheel(event) {
        var doLog = true;
        if (doLog) {console.log('wheel event');}
        if (doLog) {console.log('event.deltaY: '+ event.deltaY);}
        if (doLog) {console.log('event.wheelDelta: '+ event.wheelDelta);}
        if (doLog) {console.log('event.ctrlKey '+ event.ctrlKey);}

        //do nothing if ctrl pressed (user should be able to zoom)
        if (event.ctrlKey) {
          return;
        //prevent wheel event if another transition is running
        } else if ($rootScope.psMuineScrolling) {
          event.preventDefault();
          if (doLog) {console.log('wheel event prevent: $rootScope.psMuineScrolling = true');}
        } else {
          //normalize wheel delta for different browsers
          delta = event.deltaY || -event.wheelDelta;
          if (doLog) {console.log('delta: '+ delta);}
          //use delta value to determine scroll direction
          if (delta > 0) { //moving down
            //act as normal mousewheel if scrolling in the last section
            if (currSection !== breakPoints.length - 2) {
              event.preventDefault();
              window.scrollBy(0,4);
            }
          } else { //moving up
            //act as normal mousewheel if it's the last section and current scroll is in it
            if (currScroll <= breakPoints[breakPoints.length - 2]
            ) {
              event.preventDefault();
              window.scrollBy(0,-2);
            }
          }
        }
      }

      // detect available wheel event
      support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
                document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
                "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

      //ACTIVATE LISTNERS
      // window.onresize = handleResize;
      $window.on('resize', handleResize);
      $window.on('scroll', PsMuineScroll.scrollHandler);
      if (support === 'wheel') {
        window.onwheel = handleWheel;
        // $window.on('wheel', handleWheel);
      } else if (support === 'mousewheel'){
        window.onmousewheel = handleWheel;
        // $window.on('mousewheel', handleWheel);
      }

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

    scrollRemover: function () {
      var doLog = true;
      if (doLog) {console.log('scrollRemover!');}
      //find this sectionOffset in breakPoints array
      var sectionOffset = breakPoints[currSection];
      console.log('sectionOffset: '+ sectionOffset);
      $window.scrollTop(sectionOffset);
      console.log('$window.scrollTop(): '+ $window.scrollTop());
      if (breakPoints[currSection] !== $window.scrollTop()) {
        breakPoints[currSection] = $window.scrollTop();
      }
      prevScroll = $window.scrollTop();
    },

    //SCROLL HANDLER
    //serves to keep scroll position under control and run corresponding logic
    scrollHandler: function () {
      var doLog = true;
      if (doLog) {console.log('scroll event');}

      //set timeout to make resize event handled before scroll event
      window.setTimeout(function () {

        //DETERMINE SCROLL PARAMETERS
        //current scroll position
        currScroll = $window.scrollTop();
        if (doLog) {console.log('currScroll: '+ currScroll + ' prevScroll: '+ prevScroll);}
        //current section
        currSection = PsMuineScroll.getSection(currScroll);
        if (doLog) {console.log('currSection: '+ currSection + ' prevSection: '+ prevSection);}
        //determine scroll direction
        scrollDown = (currScroll > prevScroll) ? true : false;

        //STATE TRANSITION TRIGGER
        //  implementation of a full section scroll design:
        //  vertical scroll will tansite user to the next or prev section
        //do nothing if scrolling in last section or if another transition is running
        //also do nothing if scrolling horizontally
        if (doLog) {console.log($rootScope.psMuineScrolling);}
        if (currSection !== breakPoints.length - 2 && !$rootScope.psMuineScrolling
          && prevScroll !== currScroll
        ) {
          //do state.go transition to prev or next sections depending on scroll direction
          var stateToGo = {};
          if ( scrollDown ) {
            if (doLog) {console.log('transition down to '+ pageSections[prevSection + 1].name);}
            stateToGo = defaultStates[pageSections[prevSection + 1].name];
          } else {
            if (doLog) {console.log('transition up to '+ pageSections[prevSection - 1].name);}
            stateToGo = defaultStates[pageSections[prevSection - 1].name];
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

      }, 10); //end of timeout

    },

    scroll: function (sectionName) {
      var doLog = true;
      if (doLog) {console.log('> PsMuineScroll.scroll('+ sectionName +')');}

      //find this sectionOffset in breakPoints array
      var sectionOffset = 0;
      for (var i = 0; i < pageSections.length; i++) {
        if (pageSections[i].name === sectionName) {
          sectionOffset = breakPoints[i];
          break;
        }
      }
      if (doLog) {console.log('  sectionOffset: '+ sectionOffset);}

      //velocity smoothscroll
      $html.velocity('scroll', {
        duration: 1000,
        offset: sectionOffset,
        begin: function () {
          if (doLog) {console.log('> PsMuineScroll.scroll('+ sectionName +') > velocity begin');}
          $rootScope.psMuineScrolling = true;
          $window.off('scroll', PsMuineScroll.scrollHandler);
        },
        complete: function () {
          if (doLog) {console.log('> PsMuineScroll.scroll('+ sectionName +') > velocity complete');}
          //sometimes, when browser window is zoomed it is scrolled not precisely to breakPoints
          //in this case ajust this breakpoint accordingly
          if (sectionOffset !== $window.scrollTop()) {
            breakPoints[i] = $window.scrollTop();
          }
          prevScroll = $window.scrollTop();
          currSection = prevSection = i;
          $rootScope.psMuineScrolling = false;
          $window.on('scroll', PsMuineScroll.scrollHandler);
          // window.setTimeout(function () {
          //   $rootScope.psMuineScrolling = false;
          // }, 35);
        }
      });
    }
  };

  return PsMuineScroll;
}]);
