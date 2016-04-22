(function ($, window, undefined) {
  'use strict';

  var breakpoint = $('.nav.desktop-only').offset().top;
  var paddingTop = $('.nav.desktop-only').outerHeight(true);

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

        if ($('.nav.mobile-only').is(':visible')) {
          $('.hamburger-button, .wrapper.nav nav').toggleClass('active');
        }
      }
    });
  };

  var transitionNavBarBackgroundOnMobile = function () {
    if ($(window).scrollTop() > breakpoint) {
      $('.mobile-only.nav').addClass('get-background-color');
    } else {
      $('.mobile-only.nav').removeClass('get-background-color');
    }
  };

  var nameMeDamnIt = function () {
    if ($('.nav.desktop-only').is(':visible') &&  ($(window).scrollTop() > breakpoint)) {
      $('.what').css({
        paddingTop: paddingTop + 'px'
      });

      $('.nav.desktop-only').css({
        position: 'fixed',
        width: '100%'
      });
    } else {
      $('.what').css({
        paddingTop: 0
      });

      $('.nav.desktop-only').css({
        position: 'static',
        width: 'auto'
      });
    }
  };

  $(document).on('ready', function () {
    showHideNav();
    scrollToSections();
    transitionNavBarBackgroundOnMobile();

    $(window).on('scroll', function () {
      transitionNavBarBackgroundOnMobile();
      nameMeDamnIt();
    });
  });
})(jQuery, this);
