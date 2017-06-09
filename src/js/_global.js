export const {
	DOC,
	WIN,
	WIN_WIDTH,
	WIN_HEIGHT,
	HTMLBODY,
	HTML,
	BODY,

	OUT,
	OVERLAY,

	ACTIVE,
	VISIBLE,
	HIDDEN,
	SUCCESS,
	DONE,
	FOCUSED,

	TOUCH,
	NO_TOUCH,

	isTouch,

	SIDEBAR,
	MENU,
	POPUP,
	POPUP_OPEN,
	POPUP_CLOSE,
	PRELOADER

} = {
	DOC: $(document),
	WIN: $(window),
	WIN_WIDTH: $(window).width(),
	WIN_HEIGHT: $(window).height(),
	HTMLBODY: $('html, body'),
	HTML: $('html'),
	BODY: $('body'),

	OUT: $('.out'),
	OVERLAY: $('.js-overlay'),

	ACTIVE: 'is-active',
	VISIBLE: 'is-visible',
	HIDDEN: 'is-hidden',
	SUCCESS: 'is-success',
	DONE: 'is-done',
	FOCUSED: 'is-focused',

	TOUCH: 'touch',
	NO_TOUCH: 'no-touch',

	isTouch() {
		return 'ontouchstart' in window;
	},

	SIDEBAR: $('.js-sidebar'),
	MENU: $('.js-menu'),
	POPUP: $('.js-popup'),
	POPUP_OPEN: $('.js-open-popup'),
	POPUP_CLOSE: $('.js-close-popup'),
	PRELOADER: $('.js-preloader')
};