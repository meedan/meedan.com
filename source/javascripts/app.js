// 1. include all js dependencies
//
//= require "jquery"
//= require "bootstrap-sass/assets/javascripts/bootstrap"
//= require "pace"

// 2. Navbar js customizations
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