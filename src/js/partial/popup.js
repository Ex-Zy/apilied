import {BODY, ACTIVE, HIDDEN, POPUP, POPUP_OPEN, POPUP_CLOSE} from '../_global.js'

//popup
POPUP_OPEN.click(function(e) {
	e.preventDefault();

	let link = $(this).data('link');
	let popupElement = POPUP.filter('[data-popup="' + link + '"]');

    popupElement.addClass(ACTIVE);
	BODY.addClass(HIDDEN);
});
POPUP_CLOSE.click(function (){
	$(this).parents(POPUP).removeClass(ACTIVE);
	BODY.removeClass(HIDDEN);
	return false;
});
