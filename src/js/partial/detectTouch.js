var touch = 'ontouchstart' in window;

if(!touch) {
	$('body').addClass('is-no-touch');

	showSidebar();
} else {
	$('body').addClass('is-touch');

	$('.js-menu').click(function() {
		$('.js-sidebar').toggleClass('is-active');
	});
}

function showSidebar() {
	$('.js-menu').add('.js-sidebar').on('mouseenter', function() {
		$('.js-sidebar').addClass('is-active');
	});

	$('.js-menu').add('.js-sidebar').on('mouseleave', function() {
		$('.js-sidebar').removeClass('is-active');
	});
}
