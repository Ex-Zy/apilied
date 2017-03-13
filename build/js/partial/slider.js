'use strict';

//sliders
var slider1 = $('.js-slider-1');
var slider2 = $('.js-slider-2');
var scrollWidth = getScrollWidth();

function initSlider(slider, options) {
	slider.not('.slick-initialized').slick(options);
}

function destroySlider(slider) {
	if (slider.hasClass('slick-initialized')) {
		slider.slick('unslick');
	}
}

function showSlider() {
	var smallScreen = $(window).width() + scrollWidth <= 901;

	if (smallScreen) {
		initSlider(slider1, {
			infinite: false,
			slidesToShow: 2,
			slidesToScroll: 1,
			centerMode: true,
			speed: 1000,
			prevArrow: '.js-prev-1',
			nextArrow: '.js-next-1'
		});
		initSlider(slider2, {
			infinite: false,
			speed: 1000,
			prevArrow: '.js-prev-2',
			nextArrow: '.js-next-2'
		});
	} else {
		destroySlider(slider1);
		destroySlider(slider2);
	}
}

function getScrollWidth() {
	var block = $('<div>').css({ 'height': '50px', 'width': '50px' }),
	    indicator = $('<div>').css({ 'height': '200px' });

	$('body').append(block.append(indicator));
	var w1 = $('div', block).innerWidth();
	block.css('overflow-y', 'scroll');
	var w2 = $('div', block).innerWidth();
	$(block).remove();
	return w1 - w2;
}

showSlider();
$(window).on('resize', showSlider);