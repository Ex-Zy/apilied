import {ACTIVE, DOC, SIDEBAR, MENU} from '../_global.js'

DOC.click((e) => {
	// Если кликаем не на сайдбаре и меню
	if(
		!$(e.target).closest(SIDEBAR).length && 
		!$(e.target).closest(MENU).length
	) {
		SIDEBAR.removeClass(`${ACTIVE}`);
	}

});