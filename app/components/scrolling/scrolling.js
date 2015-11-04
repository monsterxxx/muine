angular.module('ps.scrolling', [])

.directive('psSmoothScroll', function() {
  return function($scope, element, attrs) {
    element.on('click', function (e) {

      id = attrs.psSmoothScroll;

      var target = $('#'+ id);

      var offset = parseInt(attrs.offset, 10) || 0;

      var duration = parseInt(attrs.duration, 10) || 1000;

      var $body = $('body');

      target.velocity('scroll', {
        duration: duration,
        offset: offset,
        begin: function () {
          $body.addClass('ps-velocity-scrolling');
        },
        complete: function () {
          $body.removeClass('ps-velocity-scrolling');
        }
      });

    });
  };
})

.factory('PsScrollSpy', ['NavbarSize', function(NavbarSize) {
  return {
    initialize: function () {
      console.log('> PsScrollSpy');

      //page sections
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
      var scrollDir = '';

      var i = 0;
      var length = breakPoints.length;
      console.log(length);
      var $window = $(window);
      var $body = $('body');
      var offset = 0;
      // var animationInProcess = false;

      function scrollHandler() {

        currScroll = $(this).scrollTop();
        for (i = 0; i < length; i++) {
          console.log(i, currScroll, breakPoints[i], currScroll < breakPoints[i]);
          if (currScroll < breakPoints[i]) {
            currSection = i - 1;
            break;
          }
        }
        scrollDir = (currScroll > prevScroll) ? 'down' : 'up';
        console.log(currScroll, $body.hasClass('ps-velocity-scrolling'), currSection, prevSection);


        if ( !$body.hasClass('ps-velocity-scrolling')
            //  && !animationInProcess
             && currSection !== length - 2) {
               console.log('velocity');
          // animationInProcess = true;

          if (scrollDir === 'down' ) {
            offset = breakPoints[prevSection + 1];
          }
            $body.velocity("scroll", {
              offset: offset,
              duration: 1000,
              begin: function () {
                $body.addClass('ps-velocity-scrolling');
                $window.off('scroll');
              },
              complete: function () {
                $window.on('scroll', scrollHandler);
                window.setTimeout(function () {
                  console.log('class Remove!');
                  $body.removeClass('ps-velocity-scrolling');

                }, 100);
              }
            });
          // animationInProcess = false;
        }

        prevScroll = currScroll;
        prevSection = currSection;

      }


      $window.on('scroll', scrollHandler);



    }
  };
  // $('[data-ps-scrollspy]').each(function () {
  //
  //   console.log($(this));
  // });
}]);
