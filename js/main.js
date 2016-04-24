(function ($, window, undefined) {
  'use strict';

  // Global vars in closure
  var desktopBreakpoint = 0;
  var mobileBreakpoint  = 0;
  var paddingTop        = 0;
  var elms              = {}; // Object that holds all of our jQuery elements.

  var cacheElms = function () {
    elms.$window            = $(window);
    elms.$body              = $('html, body');
    elms.$hamburgerButton   = $('.hamburger-button');
    elms.$mobileNav         = $('.wrapper.nav.mobile-only nav');
    elms.$mobileNavWrapper  = $('.nav.mobile-only');
    elms.$desktopNavWrapper = $('.nav.desktop-only');
    elms.$scrollToTop       = $('.scroll-to-top');
    elms.$scrollToSection   = $('.nav nav a[href^="#"]');
    elms.$what              = $('.what');
  };

  var setGlobalVars = function () {
    mobileBreakpoint  = elms.$what.offset().top;
    desktopBreakpoint = elms.$desktopNavWrapper.offset().top;
    paddingTop        = elms.$desktopNavWrapper.outerHeight(true);
  };

  var toggleActiveMobileNav = function () {
    elms.$hamburgerButton.toggleClass('active');
    elms.$mobileNav.toggleClass('active');

    if (elms.$mobileNav.hasClass('active')) {
      elms.$mobileNav.css({ height: $(window).outerHeight(true) - $('.nav-buttons-wrapper').outerHeight(true) + 'px' });
    } else {
      elms.$mobileNav.css({ height: 0 });
    }
  };

  var showHideNav = function () {
    elms.$hamburgerButton.on('click', function (event) {
      event.preventDefault();
      toggleActiveMobileNav();
    });
  };

  var scrollToSections = function () {
    elms.$scrollToTop.on('click', function (event) {
      event.preventDefault();
      elms.$body.animate({scrollTop: 0}, 300);
      toggleActiveMobileNav();
    });

    elms.$scrollToSection.on('click', function (event) {
      event.preventDefault();

      // Get section to scroll to
      var $target = $($(this).attr('href'));

      // If our target exists... Just a safety check.
      if ($target.length) {
        elms.$body.animate({
          scrollTop: $target.offset().top - 50
        }, 300);

        if (elms.$mobileNavWrapper.is(':visible')) {
          toggleActiveMobileNav();
        }
      }
    });
  };

  var transitionNavBarBackgroundOnMobile = function () {
    if (elms.$window.scrollTop() > mobileBreakpoint) {
      elms.$mobileNavWrapper.addClass('get-background-color');
    } else {
      elms.$mobileNavWrapper.removeClass('get-background-color');
    }
  };

  var desktopStickNav = function () {
    if (elms.$desktopNavWrapper.is(':visible') &&  (elms.$window.scrollTop() > desktopBreakpoint)) {
      elms.$what.css({
        paddingTop: paddingTop + 'px'
      });

      elms.$desktopNavWrapper.css({
        position: 'fixed',
        width: '100%'
      });
    } else {
      elms.$what.css({
        paddingTop: 0
      });

      elms.$desktopNavWrapper.css({
        position: 'relative',
        width: 'auto'
      });
    }
  };

  var callOnWindowScroll = function () {
    transitionNavBarBackgroundOnMobile();
    desktopStickNav();
  };

  var getMobleNavLiLineHeight = function () {
    $('.nav.mobile-only li').css({
      lineHeight: ($(window).outerHeight(true) - $('.nav-buttons-wrapper').outerHeight(true)) / $('.nav.mobile-only li').length  + 'px'
    });
  };

  $(document).on('ready', function () {
    cacheElms();
    setGlobalVars();
    showHideNav();
    scrollToSections();
    transitionNavBarBackgroundOnMobile();
    desktopStickNav();
    getMobleNavLiLineHeight();

    elms.$window.on('scroll', callOnWindowScroll);
  });
})(jQuery, this);
