(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 57)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 57
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 50) { // the number at the end is where the change triggers
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Scroll reveal calls
  window.sr = ScrollReveal();
  sr.reveal('.sr-icons', {
    duration: 600,
    scale: 0.3,
    distance: '0px'
  }, 200);
  sr.reveal('.sr-button', {
    duration: 1000,
    delay: 200
  });
  sr.reveal('.sr-contact', {
    duration: 600,
    scale: 0.3,
    distance: '0px'
  }, 300);

  // Magnific popup calls
  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });

})(jQuery); // End of use strict

window.onload = function() {

  // Alternate Background Page with scrolling content (Bg Pages are odd#s)
  var $bgImg = $('.bg-image');
  var winh = window.innerHeight;
  var scrollPos = 0;
  var page = 1;
  var page1Bottom = winh;
  var page3Top = winh;
  var page3Bottom = winh * 3;
  var page5Top = winh * 3;
  var page5Bottom = winh * 5;

  $(window).on('scroll', function() {

    scrollPos = Number($(window).scrollTop().toFixed(2));
    page = Math.floor(Number(scrollPos / winh) +1);
    if (scrollPos >= 0 && scrollPos < page1Bottom ) {    
      if (! $bgImg.hasClass('bg-img1')) {

        removeBg( $bgImg, 2, 3, 1 ); // element, low, high, current
        $bgImg.addClass('bg-img1');
      }
    } else if (scrollPos >= page3Top && scrollPos <= page3Bottom) {
      if (! $bgImg.hasClass('bg-img2')) {

        removeBg( $bgImg, 1, 3, 2 ); // element, low, high, current
        $bgImg.addClass('bg-img2');
      }
    } else if (scrollPos >= page5Top && scrollPos <= page5Bottom) {
      if (! $bgImg.hasClass('bg-img3')) {

        removeBg( $bgImg, 1, 2, 3 ); // element, low, high, current
        $bgImg.addClass('bg-img3');
      }
    }
    $nav.html("Page# " + page + " window position: " + scrollPos);

  });
}

// This function was created to fix a problem where the mouse moves off the
// screen, this results in improper removal of background image class. Fix
// by removing any background class not applicable to current page.
function removeBg( el, low, high, current ) {
  if (low > high || low <= 0 || high <= 0) {
    console.log ("bad low/high parameters in removeBg");
  }
  for (var i=low; i<=high; i++) {
    if ( i != current ) { // avoid removing class we are trying to add
      if (el.hasClass('bg-img' +i )) {
        el.removeClass('bg-img' +i );
      }
    }
  } 
} // removeBg()
