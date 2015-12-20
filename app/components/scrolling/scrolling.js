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

.factory('PsMuineScroll', ['$rootScope', '$state', 'MuineLayoutSvc', '$q', '$compile',
function(                   $rootScope,   $state ,  MuineLayoutSvc ,  $q ,  $compile) {

  //common jquery objects
  var $window = $(window),
      $html = $('html');

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
      var doLog = false;
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
      var doLog = false;
      if (doLog) {console.log('> PsMuineScroll.initialize()');}


      //INITIALIZE
      PsMuineScroll.findSections();

      //discard scroll position, as some browsers will refresh saving old value
      $window.scrollTop(0);


      //RESIZE HANDLER
      //resize breaks things a little:
      //  1. browser (chrome and moz for sure) change sections' offset().top
      //     so breakPoints should be redetermined
      //  2. browser (chrome, moz. ie) scrolls window upon resize resulting
      //     in offset between window.scrollTop() and current breakPoint
      function handleResize(event) {
        var doLog = false;
        if (doLog) {console.log('resize event!');}

        //in ie destructing resizing scroll accures after resize event
        //  set timeout in order to catch and correct scroll position
        window.setTimeout(function () {
          if (doLog) console.log('$window.scrollTop(): '+ $window.scrollTop());
          $window.off('scroll', PsMuineScroll.scrollHandler);
          if (doLog) console.log('currSection: '+ currSection + ' prevSection: '+ prevSection);
          //redetermine breakPoints
          PsMuineScroll.findSections();

          //find this sectionOffset in breakPoints array
          var sectionOffset = breakPoints[currSection];
          if (doLog) console.log('sectionOffset: '+ sectionOffset);
          $window.scrollTop(sectionOffset);
          if (doLog) console.log('$window.scrollTop(): '+ $window.scrollTop());
          //correct breakpoint to browser's window scroll position
          breakPoints[currSection] = $window.scrollTop();
          //reassign prevScroll to get it right in the next scrollHandler call
          prevScroll = $window.scrollTop();

          window.setTimeout(function () {
            $window.on('scroll', PsMuineScroll.scrollHandler);
          }, 20);
        }, 5);
      }


      //MOUSEWHEEL HANDLER
      //prevent wheel event if another transition is running
      //otherwise, scroll only 1 px to make transition start smooth
      var delta = 0;
      function handleWheel(event) {
        var doLog = false;
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



      //ACTIVATE LISTNERS
      // detect available wheel event
      support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
                document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
                "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

      // window.onresize = handleResize;
      $window.on('resize', handleResize);
      $window.on('scroll', PsMuineScroll.scrollHandler);
      if (support === 'wheel') {
        window.addEventListener('wheel', handleWheel);
        // $window.on('wheel', handleWheel);
      } else if (support === 'mousewheel'){
        window.addEventListener('mousewheel', handleWheel);
        // $window.on('mousewheel', handleWheel);
      }


      var firstHomeLeave = true;
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
          if (doLog) {console.log('  stateChange triggered scrolling');}
          //before scroll
          if (toStateNameArr[1] === 'home') {
            //insert video background if it's not there yet
            $rootScope.videoEnabled = true;
          }
          // if (firstHomeLeave && fromStateNameArr[1] === 'home') {
          //   //fix selected subcontrol item style
          //   console.log('first transition > fix');
          //   PsMuineScroll.fixSelectedItemStyle();
          //   firstHomeLeave = false;
          // }
          PsMuineScroll.scroll(toStateNameArr[1]).then(function () {
            //after scroll
            if (fromStateNameArr[1] === 'home') {
              $rootScope.videoEnabled = false;
            }
          });
        }
      });

    },



    //SCROLL HANDLER
    //serves to keep scroll position under control and run corresponding logic
    scrollHandler: function () {
      var doLog = false;
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
          var stateToGo = '';
          if ( scrollDown ) {
            stateToGo = 'muine.'+ pageSections[prevSection + 1].name;
            if (doLog) {console.log('transition down to '+ stateToGo);}
          } else {
            stateToGo = 'muine.'+ pageSections[prevSection - 1].name;
            if (doLog) {console.log('transition up to '+ stateToGo);}
          }
          $state.go(stateToGo);

        }


        //prepare to the next scroll event
        prevScroll = currScroll;
        prevSection = currSection;

      }, 10); //end of timeout
    },







    //Smooth scroll to specified section. Returns promise.
    scroll: function (sectionName) {
      var doLog = false;
      if (doLog) {console.log('> PsMuineScroll.scroll('+ sectionName +')');}

      var deferred = $q.defer();

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
          //sometimes, when browser window was zoomed it is scrolled not precisely to breakPoints
          //in this case ajust this breakpoint accordingly
          breakPoints[i] = $window.scrollTop();
          //as scrollHandler was deactivated for the time of this animation,
          //  define internal scroll state to get it right in scroll and zoom handlers
          prevScroll = $window.scrollTop();
          currSection = prevSection = i;
          $rootScope.psMuineScrolling = false;
          $window.on('scroll', PsMuineScroll.scrollHandler);
          deferred.resolve();
        }
      });
      return deferred.promise;
    }



  };

  return PsMuineScroll;
}]);
