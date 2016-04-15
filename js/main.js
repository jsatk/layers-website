(function ($, window, undefined) {
  'use strict';

  var showHideNav = function () {
    $('.hamburger-button').on('click', function (event) {
      event.preventDefault();
      $(this).toggleClass('active');
      $('nav').toggle();
    });
  };

  $(document).on('ready', function () {
    showHideNav();
  });
})(jQuery, this);
