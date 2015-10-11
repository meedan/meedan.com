(function ($) {
  $(document).ready(function () {

    $(".navbar").hide();

    var scroll_position = $(this).scrollTop();

    // fade in .navbar
    $(function () {
      $(window).scroll(function () {
        if (scroll_position > 300) {
          $(".navbar").fadeIn();
        }
      });
    });
  });
}(jQuery));