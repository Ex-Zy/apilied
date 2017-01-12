'use strict';

$('.js-menu').click(function () {
	var hasActive = $(this).hasClass('is-active');

	if (!hasActive) {
		$(this).addClass('is-active');
	} else {
		$(this).removeClass('is-active');
	}
});