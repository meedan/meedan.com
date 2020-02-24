$(function () {
	'use strict';

	var $tabsContainer = $('.tabs'),
		$tabs = $('.tab'),
		$tabsContentContainer = $('.tabs-container'),
		currentIndex = 0,
		activeTabClassName = 'active-tab';

	$tabsContainer.on('init', function(event, slick) {
		$tabsContentContainer.removeClass('invisible');
		$tabsContainer.removeClass('invisible');

		currentIndex = slick.getCurrent();
		$tabs.removeClass(activeTabClassName);
       	$('.tab[data-slick-index=' + currentIndex + ']').addClass(activeTabClassName);
	});

	$tabsContainer.slick({
		//slidesToShow: 3.25,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: false,
		infinite: false,
		swipeToSlide: true,
		touchThreshold: 10
	});

	$tabsContentContainer.slick({
		asNavFor: $tabsContainer,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		infinite: false,
		swipeToSlide: true,
    draggable: false,
		touchThreshold: 10
	});


	$tabs.on('click', function(event) {
        // gets index of clicked tab
        currentIndex = $(this).data('slick-index');
        $tabs.removeClass(activeTabClassName);
        $('.tab[data-slick-index=' + currentIndex +']').addClass(activeTabClassName);
        $tabsContainer.slick('slickGoTo', currentIndex);
        $tabsContentContainer.slick('slickGoTo', currentIndex);
    });

    //initializes slick navigation tabs swipe handler
    $tabsContentContainer.on('swipe', function(event, slick, direction) {
    	currentIndex = $(this).slick('slickCurrentSlide');
		$tabs.removeClass(activeTabClassName);
		$('.tab[data-slick-index=' + currentIndex + ']').addClass(activeTabClassName);
	});
});