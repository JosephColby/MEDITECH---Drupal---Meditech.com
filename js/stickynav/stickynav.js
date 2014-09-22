$(document).ready(function () {
   
  // Sticky Navigation
  $(window).scroll(function () {
    var navclass = '#nav';
    // var navheight = $('#nav').outerHeight();
    // console.log(navheight);
    if ($(window).scrollTop() >= 100) {
      console.log($(window).scrollTop());
      $(navclass).addClass('js-sticky');
    } else {
      $(navclass).removeClass('js-sticky');
    }
  });
	
  $(window).scroll();
  
    // Search Bar Functionality
    var searchvisible = 0;

    // Check and see if the Search Box is open
    function closeSearch(obj) {
        if (searchvisible !== 0) {
            $(obj).slideUp(200);
            searchvisible = 0;
        }
    }

    $("a.search-menu").click(function (e) {
        // This stops the page scrolling to the top on a .search-menu link.
        e.preventDefault();
        if (searchvisible === 0) {
            //Search is currently hidden. Slide down and show it.
            $("#js-searchbox").slideDown(200);
            $("#s").focus(); //Set focus on the search input field.
            searchvisible = 1; //Set search visible flag to visible.
        } else {
            //Search is currently showing. Slide it back up and hide it.
            closeSearch("#js-searchbox");
        }
    });

    // Close Search box if other menus are opened.
    $("a.main-menu, a.login-menu").click(function () {
        closeSearch("#js-searchbox");
    });
  
});