(function ($, window, undefined) {
  'use strict';

  // Global vars in closure
  var desktopBreakpoint = 0;
  var mobileBreakpoint  = 0;
  var paddingTop        = 40;
  var elms              = {}; // Object that holds all of our jQuery elements.

  var cacheElms = function () {
    elms.$window                  = $(window);
    elms.$body                    = $('html, body');
    elms.$hamburgerButton         = $('.hamburger-button');
    elms.$mobileNav               = $('.wrapper.nav.mobile-only nav');
    elms.$mobileNavWrapper        = $('.nav.mobile-only');
    elms.$mobileNavButtonWrapper  = $('.nav-buttons-wrapper');
    elms.$mobileNavLis            = $('.nav.mobile-only li');
    elms.$desktopNavWrapper       = $('.nav.desktop-only');
    elms.$scrollToTop             = $('.scroll-to-top');
    elms.$scrollToSection         = $('.nav nav a[href^="#"]');
    elms.$what                    = $('.what');
    elms.$showCodeOfConduct       = $('#show-code-of-conduct');
    elms.$showPresentationDetails = $('#show-presentation-details');
    elms.$codeOfCoduct            = $('.code-of-conduct');
    elms.$presentationDetails     = $('.presentation-details');
    elms.$signMeUpLink            = $('.go-to-sign-up');
  };

  var getMobileNavHeight = function () {
    return elms.$window.outerHeight(true) - elms.$mobileNavButtonWrapper.outerHeight(true) + 'px';
  };

  var setGlobalVars = function () {
    mobileBreakpoint  = elms.$what.offset().top;
    desktopBreakpoint = elms.$desktopNavWrapper.offset().top;
    paddingTop        = elms.$desktopNavWrapper.outerHeight(true);
  };

  var setMobileNavHeight = function () {
    var heightToSet = elms.$mobileNav.hasClass('active') ? getMobileNavHeight() : '0';
    elms.$mobileNav.css('height', heightToSet);
  };

  var toggleActiveMobileNav = function () {
    elms.$hamburgerButton.toggleClass('active');
    elms.$mobileNav.toggleClass('active');
    elms.$mobileNavWrapper.toggleClass('active');
    setMobileNavHeight();
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

    var scrollTo = function (event) {
      event.preventDefault();

      // Get section to scroll to
      var $target = $($(this).attr('href'));

      // If our target exists... Just a safety check.
      if ($target.length) {
        elms.$body.animate({
          scrollTop: $target.offset().top - 50
        }, 300);

        var linkIsInMobileNav = $(event.target).closest('.mobile-only nav').length;

        if (linkIsInMobileNav && elms.$mobileNavWrapper.is(':visible')) {
          toggleActiveMobileNav();
        }
      }
    };

    elms.$scrollToSection.on('click', scrollTo);
    elms.$signMeUpLink.on('click', scrollTo);
  };

  var transitionNavBarBackgroundOnMobile = function () {
    elms.$mobileNavWrapper.toggleClass('get-background-color', elms.$window.scrollTop() > mobileBreakpoint);
  };

  var desktopStickNav = function () {
    if (elms.$desktopNavWrapper.is(':visible') &&  (elms.$window.scrollTop() > desktopBreakpoint)) {
      elms.$what.css('paddingTop', paddingTop + 'px');
      elms.$desktopNavWrapper.css({
        position: 'fixed',
        width: '100%'
      });
    } else {
      elms.$what.css('paddingTop', '0');
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

  $(function () {
    cacheElms();
    setGlobalVars();
    showHideNav();
    scrollToSections();
    transitionNavBarBackgroundOnMobile();
    desktopStickNav();

    // On resize re-calculate and set the height of the mobile nav item heights
    elms.$window.on('scroll', callOnWindowScroll);
    elms.$showCodeOfConduct.on('click', function (event) {
      event.preventDefault();
      elms.$codeOfCoduct.toggleClass('active');
    });

    elms.$showPresentationDetails.on('click', function (event) {
      event.preventDefault();
      elms.$presentationDetails.toggleClass('active');
    });
  });
})(jQuery, this);
