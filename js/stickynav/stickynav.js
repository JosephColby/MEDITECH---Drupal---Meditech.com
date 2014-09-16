$(document).ready(function () {

    // Sticky Navigation - (JC)
    $(window).scroll(function () {
        $navHeight = $('#stickyNav').height();
        $windowWidth = $(window).width();
        if ($(window).scrollTop() >= 100) {
            if ($('#stickyNav').hasClass('floating') == false) {
                $('#stickyNav').addClass('floating').css({
                    top: $navHeight * -1
                }).stop().animate({
                    top: 0
                }, 300);
            } // End of IF Statement
        } else {
            if ($('#stickyNav').hasClass('floating') == true) {
                $('#stickyNav').stop().removeClass('floating');
            } // End of IF statement
        }
    });

    /* This forces the scroll function to fire - (JC)
       - This is needed so that if the user is halfway down the
         page and then reloads the page that the sticky navigation
         appears and doesn't require the user to scroll for it to appear.
    */
    $(window).scroll();

});