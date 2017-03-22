$(window).scroll(function() {
	var top = $(window).scrollTop();
	var isFixed =  $('.js-scroll').hasClass('is-fixed');

	if(top > 10 && !isFixed) {
		$('.js-scroll').addClass('is-fixed');
	} 

	if(top < 10 && isFixed) {
		$('.js-scroll').removeClass('is-fixed');
	}
});