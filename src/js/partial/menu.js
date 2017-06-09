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
		let that = this;
		this._menu.on('touchend click', function(event) {
			that._eventHandler(event, $(this));
			that._sidebar.toggleClass(ACTIVE);
		});
	}

	_eventHandler(event, selector) {
		event.stopPropagation(); // Stop event bubbling.
		event.preventDefault(); // Prevent default behaviour
		if (event.type === 'touchend') selector.off('click'); // If event type was touch turn off clicks to prevent phantom clicks.
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

let menu = new Menu({
	menu: MENU,
	sidebar: SIDEBAR
});
