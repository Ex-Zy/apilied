'use strict';

$(document).click(function (e) {
	var notSidebarAndNotMenu = !$(e.target).closest('.js-sidebar').length && !$(e.target).closest('.js-menu').length;

	if (notSidebarAndNotMenu) {
		$('.js-sidebar').removeClass('is-active');
	}
});