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
    elms.$speakerCards            = $('.speaker-card');
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

  var showHideBios = function () {
    elms.$speakerCards.on('click touch', function (event) {
      event.preventDefault();

      var $currentTarget = $(event.currentTarget);

      if ($currentTarget.hasClass('no-click')) {
        return;
      }

      var clickedOnBioIsNotAlreadyActive = !$currentTarget.hasClass('active');

      $('.speaker-card.active').removeClass('active');

      if (clickedOnBioIsNotAlreadyActive) {
        $currentTarget.addClass('active');
      }
    });
  };

  var callOnWindowScroll = function () {
    transitionNavBarBackgroundOnMobile();
    desktopStickNav();
  };

  var initMap = function () {
    // When the window has finished loading create our google map below
    google.maps.event.addDomListener(window, 'load', init);

    function init() {
      // Basic options for a simple Google Map
      // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
      var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 15,

        disableDefaultUI: true,
        draggable: false,
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(37.311662, -121.825956), // Montgomery Theater

        // How you would like to style the map.
        // This is where you would paste any style found on Snazzy Maps.
        styles: [
          {
            "featureType": "all",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#cbd6d8"
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#2c5a71"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#dce4e7"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#cbd6d8"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f6faf9"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f4f8fb"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#cbd6d8"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#cbd6d8"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#cbd6d8"
              }
            ]
          }
        ]
      };

      // Get the HTML DOM element that will contain your map
      // We are using a div with id="map" seen below in the <body>
      var mapElement = document.getElementById('map');

      // Create the Google Map using our element and options defined above
      var map = new google.maps.Map(mapElement, mapOptions);

      // Let's also add a marker while we're at it
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(37.3308, -121.889),
        map: map,
        title: 'Layers 2017'
      });
    }
  };

  $(function () {
    cacheElms();
    setGlobalVars();
    showHideNav();
    scrollToSections();
    transitionNavBarBackgroundOnMobile();
    showHideBios();
    initMap();

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

  // We have to wait for the entire page to load to set this as Safari is a
  // unique snowflake with this one.
  $(window).on('load', function () {
    desktopStickNav();
  });
})(jQuery, this);
