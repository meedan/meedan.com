$(document).ready(function() {


	// Slick Slider for press
	// $('.cards').slick({
	// 	dots: true,
	// });

	// Slick Slider for press
	$('.slideshow').slick({
		infinite: true,
		slidesToShow: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		variableWidth: true,
		dots: false,
		prevArrow: false,
		nextArrow: false,
		draggable: true,
	});

	// User quotes for check page
	// $('.user-quotes-wrapper').slick({
		// infinite: true,
	// 	slidesToShow: 1,
	// 	dots: true,
	// 	prevArrow: false,
	// 	nextArrow: false,
	// 	draggable: true,
	// 	variableWidth: true,
	// });

	// Go to homepage if people click the meedan logo in the header
	// $('.meedan svg').click(function() {
	// 	window.location.href = '/';
	// });

	// Add class landscape or portrait to journal lead images
	$('.grid-template-columns--2 .image-container img').each(function() {
		var height = $(this).height();
		var width = $(this).width();
		if (height > width) {
			$(this).parent().addClass('portrait');
		} else {
			$(this).parent().addClass('landscape');
		}
	});
	
	// Image
	$('a.media-link').magnificPopup({
		type:'image',
		closeOnContentClick: true,
		image: {

	  markup: '<div class="mfp-figure">'+
	            '<div class="mfp-close"></div>'+
	            '<div class="mfp-img"></div>'+
	            '<div class="mfp-bottom-bar">'+
	              '<div class="mfp-title"></div>'+
	              '<div class="mfp-counter"></div>'+
	            '</div>'+
	          '</div>', // Popup HTML markup. `.mfp-img` div will be replaced with img tag, `.mfp-close` by close button

	  cursor: 'mfp-zoom-out-cur', // Class that adds zoom cursor, will be added to body. Set to null to disable zoom out cursor.

	  titleSrc: 'alt', // Attribute of the target element that contains caption for the slide.
	  // Or the function that should return the title. For example:
	  // titleSrc: function(item) {
	  //   return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
	  // }

	  verticalFit: true, // Fits image in area vertically

	  tError: '<a href="%url%">The image</a> could not be loaded.' // Error message
	}

	});

});