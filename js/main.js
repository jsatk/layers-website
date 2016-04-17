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
    $('.wrapper.nav nav a[href^="#"]').on('click', function (event) {
      event.preventDefault();
      var $target = $($(this).attr('href'));

      if ($target.length) {
        $('html, body').animate({
          scrollTop: $target.offset().top
        }, 300);

        $('.hamburger-button, .wrapper.nav nav').toggleClass('active');
      }
    });
  };

  $(document).on('ready', function () {
    showHideNav();
    scrollToSections();
  });
})(jQuery, this);
