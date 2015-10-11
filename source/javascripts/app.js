//= require bootstrap
//= require jquery
//= require pace
//
(function ($) {
  $(document).ready(function () {

    // Hide the navbar on the homepage
    $(".home .navbar").hide();

    // fade in .navbar
    $(function () {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
          $(".home .navbar").fadeIn();
        }
      });
    });
  });
}(jQuery));