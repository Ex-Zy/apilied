// scroll navigation
$('.navigation a').on('click', function(e) {
	e.preventDefault();

	$('.navigation a').add('.js-sidebar').removeClass('is-active');
	$(this).addClass('is-active');

	var section = $(this).attr('href');
	$('html, body').animate({
		scrollTop: $(section).offset().top
	}, 500);
	return false;
});