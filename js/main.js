(function ($, window, undefined) {
  'use strict';

  var showHideNav = function () {
    $('.hamburger-button').on('click', function (event) {
      event.preventDefault();
      // TODO: Merge this into one command
      $(this).toggleClass('active');
      $('.wrapper.nav nav').toggleClass('active');
    });
  };

  var scrollToSections = function () {
    $('.scroll-to-top').on('click', function (event) {
      event.preventDefault();
      $('html, body').animate({scrollTop: 0}, 300);
    });

    $('.nav nav a[href^="#"]').on('click', function (event) {
      event.preventDefault();
      var $target = $($(this).attr('href'));

      if ($target.length) {
        $('html, body').animate({
          scrollTop: $target.offset().top - 50
        }, 300);

        $('.hamburger-button, .wrapper.nav nav').toggleClass('active');
      }
    });
  };

  var transitionNavBarBackgroundOnMobile = function () {
    var breakpoint = $('.links').offset().top;

    $(window).on('scroll', function () {
      if ($(window).scrollTop() > breakpoint) {
        $('.mobile-only.nav').addClass('get-background-color');
      } else {
        $('.mobile-only.nav').removeClass('get-background-color');
      }
    });
  };

  $(document).on('ready', function () {
    showHideNav();
    scrollToSections();
    transitionNavBarBackgroundOnMobile();
  });
})(jQuery, this);
