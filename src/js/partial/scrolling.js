import {HTMLBODY, OUT, SIDEBAR, ACTIVE,} from '../_global.js'

// scroll navigation
$('.navigation a').on('click', function(e) {

	$('.navigation a').add(SIDEBAR).removeClass(ACTIVE);
	$(this).addClass(ACTIVE);

	let section = $(this).attr('href');
	let top = OUT.scrollTop();

	OUT.animate({
		scrollTop: top + ($(section).offset().top - $('.js-scroll').height())
	}, 500);
	return false;
});