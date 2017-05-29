import {BODY, ACTIVE, HIDDEN, POPUP_OPEN, POPUP_CLOSE} from '../_global.js'

//popup
POPUP_OPEN.click(function(e) {
	e.preventDefault();

	var link = $(this).data('link');
	var popup = $('.js-popup[data-popup="' + link + '"]');

	popup.addClass(ACTIVE);
	BODY.addClass(HIDDEN);
});
POPUP_CLOSE.click(function (){
	$(this).parents(".js-popup").removeClass(ACTIVE);
	BODY.removeClass(HIDDEN);
	return false;
});