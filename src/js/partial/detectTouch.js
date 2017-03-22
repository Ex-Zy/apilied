function Menu(elements){
	this._menu = elements.menu;
	this._sidebar = elements.sidebar;
}

Menu.prototype = {
	_showOnHoverSidebar: function(e) {
		this._menu.add(this._sidebar).on('mouseenter', function(){
			this._sidebar.addClass('is-active');
		}.bind(this));
	},
	_hideOnHoverSidebar: function() {
		this._menu.on('mouseleave', function() {
			this._sidebar.removeClass('is-active');
		}.bind(this));
	},
	_toggleOnClickSidebar: function() {
		this._menu.click(function() {
			this._sidebar.toggleClass('is-active');
		}.bind(this));
	},
	_isTouch: function() {
		var touch = 'ontouchstart' in window;
		return touch;
	},
	init: function() {
		var notTouch = !this._isTouch();

		if(notTouch) {
			$('body').addClass('is-no-touch');
			this._showOnHoverSidebar();
			this._hideOnHoverSidebar();
		} else {
			$('body').addClass('is-touch');
			this._toggleOnClickSidebar();
		}
	}
}

var menu = new Menu({
	menu: $('.js-menu'),
	sidebar: $('.js-sidebar')
});

menu.init();
