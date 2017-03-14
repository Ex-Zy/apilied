var touch = 'ontouchstart' in window;

if(!touch) {
	$('body').addClass('is-no-touch');
} else {
	$('body').addClass('is-touch');
	$('.js-menu').click(function() {
		$('.js-sidebar').toggleClass('is-active');
	});
}