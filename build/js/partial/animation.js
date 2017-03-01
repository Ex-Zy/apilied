'use strict';

function showAnimation() {
	var scroll = $(window).scrollTop();
	var section = $('.js-animate');
	var win = $(window).scrollTop() + $(window).outerHeight() / 2;

	section.each(function () {
		var top = $(this).offset().top;
		if (win >= top) {
			$(this).addClass('is-animate');
		}
	});
}

showAnimation();

$(window).scroll(function () {
	showAnimation();
});