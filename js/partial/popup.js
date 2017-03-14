'use strict';

//popup
$('.js-open-popup').click(function (e) {
	e.preventDefault();

	var link = $(this).data('link');
	var popup = $('.js-popup[data-popup="' + link + '"]');

	popup.addClass('is-active');
	$("body").addClass("is-hidden");
});
$(".js-close-popup").click(function () {
	$(this).parents(".js-popup").removeClass('is-active');
	$("body").removeClass("is-hidden");
	return false;
});