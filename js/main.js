// Load Foundation
$(document).foundation();

// Other Scripts and INITS
$(document).ready(function () {

  // Sticky Navigation
  $(window).scroll(function () {
    console.log('scroll position: ' +$(window).scrollTop());
    console.log('header container height: ' + $('#header-container').height());
    if ($(window).scrollTop() >= $('#stickyheader').height())
      $('#stickyheader').addClass('floating');
    else
      $('#stickyheader').removeClass('floating');
  });

  // Load Sidebars 
  $.slidebars();

  // Closes Accordion
  $('.closeAccordion').click(function () {
    $('.accordion .content').removeClass('active');
  });

});