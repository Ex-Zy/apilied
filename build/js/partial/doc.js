'use strict';

$(document).click(function (e) {
	var notSidebarAndNotMenu = !$(e.target).closest('.js-sidebar').length && !$(e.target).closest('.js-menu').length;

	if (notSidebarAndNotMenu) {
		$('.js-sidebar').removeClass('is-active');
	}
	// var allDocExeptSelect 		= !$(e.target).closest('.js-sidebar').length,
	// 	allDocExeptPopupAndCart = !$(e.target).closest('.js-popup').length && 
	// 							  !$(e.target).closest('.js-cart').length;

	// if(allDocExeptSelect) {
	// 	$('.js-select').removeClass('is-active');
	// 	$('.js-select').find('.js-select-content')
	// 				   .slideUp(200);
	// }

	// if (allDocExeptPopupAndCart) {
	// 	$('.js-popup').add('.js-overlay')
	// 				  .removeClass('is-active');
	// 	$('body').removeClass('is-hidden');
	// }
});