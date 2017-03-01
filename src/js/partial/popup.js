//popup
$('.js-open-popup').click(function(e) {
	e.preventDefault();

	var link = $(this).data('link');
	var popup = $('.js-popup[data-popup="' + link + '"]');

	popup.add('.js-overlay').addClass('is-active');
	$("body").addClass("is-hidden");

	console.log(popup, link);	
});
$(".js-close-popup").click(function (){
	$(this).parents(".js-popup").add('.js-overlay').removeClass('is-active');
	$("body").removeClass("is-hidden");
	return false;
});
