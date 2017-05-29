import {
	BODY,
	ACTIVE, 
	TOUCH, 
	NO_TOUCH, 
	isTouch,
	SIDEBAR,
	MENU
} from '../_global.js';

class Menu {
	constructor(elements) {
		elements = elements || {};
		this._menu = elements.menu;
		this._sidebar = elements.sidebar;
		this._init();
	}

	_showOnHoverSidebar() {
		this._menu.mouseenter( () => {
			this._sidebar.addClass(ACTIVE);
		});
	}

	_hideOnLeaveSidebar() {
		SIDEBAR.mouseleave( () => {
			this._sidebar.removeClass(ACTIVE);
		});
	}

	_toggleOnClickSidebar() {
		this._menu.click(() => {
			this._sidebar.toggleClass(ACTIVE);
		});
	}

	_init() {
		if(!isTouch()) {
			BODY.addClass(NO_TOUCH);
			this._showOnHoverSidebar();
			this._hideOnLeaveSidebar();
		} else {
			BODY.addClass(TOUCH);
			this._toggleOnClickSidebar();
		}
	}

}

var menu = new Menu({
	menu: MENU,
	sidebar: SIDEBAR
});
