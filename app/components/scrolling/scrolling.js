angular.module('ps.scrolling', [])

.directive('psSmoothScroll', function() {
  return function($scope, element, attrs) {
    element.on('click', function (e) {

      var $body = $('body');

      if (!$body.hasClass('ps-velocity-scrolling')) {

        id = attrs.psSmoothScroll;

        var target = $('#'+ id);

        var offset = parseInt(attrs.offset, 10) || 0;

        var duration = parseInt(attrs.duration, 10) || 1000;

        target.velocity('scroll', {
          duration: duration,
          offset: offset,
          begin: function () {
            $body.addClass('ps-velocity-scrolling');
          },
          complete: function () {
            window.setTimeout(function () {
              $body.removeClass('ps-velocity-scrolling');
            }, 35);
          }
        });

      }
    });
  };
})

.factory('PsScrollSpy', ['NavbarSize', function(NavbarSize) {
  return {
    initialize: function () {
      console.log('> PsScrollSpy > initialize');

      //page sections based on data-ps-scrollspy attributes
      var pageSections = [];
      var breakPoints = [];
      $('[data-ps-scrollspy]').each(function () {
        var pageSection = {};
        pageSection.name = $(this).attr('data-ps-scrollspy');
        pageSection.offset = parseInt($(this).attr('offset')) || 0;

        pageSections.push(pageSection);
        breakPoints.push($('#'+ pageSection.name).offset().top + pageSection.offset);
      });
      breakPoints.push($(document).height());
      console.log(angular.toJson(pageSections));
      console.log(breakPoints);

      //scrollspy
      var prevSection = 0;
      var currSection = 0;
      var prevScroll = 0;
      var currScroll = 0;
      var scrollDown;

      var i = 0;
      var length = breakPoints.length;
      console.log(length);
      var $window = $(window);
      var $body = $('body');
      var offset = 0;

      function scrollHandler() {

        currScroll = $window.scrollTop();
        for (i = 0; i < length; i++) {
          console.log(i, currScroll, breakPoints[i], currScroll < breakPoints[i]);
          if (currScroll < breakPoints[i]) {
            currSection = i - 1;
            break;
          }
        }
        scrollDown = (currScroll > prevScroll) ? true : false;

        console.log(currScroll, $body.hasClass('ps-velocity-scrolling'), currSection, prevSection);
        if (currSection !== length - 2 && !$body.hasClass('ps-velocity-scrolling')) {
          console.log('velocity');

          if (scrollDown ) {
            offset = breakPoints[prevSection + 1];
          } else {
            offset = breakPoints[prevSection - 1];
          }
          $body.velocity("scroll", {
            offset: offset,
            duration: 1000,
            begin: function () {
              $body.addClass('ps-velocity-scrolling');
            },
            complete: function () {
              window.setTimeout(function () {
                console.log('class Remove!');
                $body.removeClass('ps-velocity-scrolling');
              }, 35);
            }
          });
        }

        prevScroll = currScroll;
        prevSection = currSection;

      }

      function innerScrollHandler() {

      }

      function preventWheel(e) {
        if ($body.hasClass('ps-velocity-scrolling')) {
          e.preventDefault();
        } else if (currScroll === breakPoints[length - 2] || currSection !== length - 2) {
          if (e.wheelDelta < 0) {
            e.preventDefault();
            window.scrollBy(0,1);
          } else {
            e.preventDefault();
            window.scrollBy(0,-1);
          }
        }
      }


      $window.on('scroll', scrollHandler);
      window.onwheel = preventWheel;


    }
  };
  // $('[data-ps-scrollspy]').each(function () {
  //
  //   console.log($(this));
  // });
}]);
