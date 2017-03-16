var buttons = $('.js-category');
var inputUser = $('#form-user');
var form = $('#main-form');

$('.js-category').click(function() {
	var btn = $(this);
	var value = btn.attr('data-user-name');
	
	buttons.removeClass('is-active');
	btn.addClass('is-active');
	inputUser.attr('value', value);

	if(inputUser.val() != '') {
		form.addClass('step-1-ready')
		btn.parents('[data-content]')
			.find('.btn-main')
			.removeAttr('disabled');
	}
});

$('.js-next-step').click(function() {
	var step = $(this).data('step');
	if(!$(this).attr('disabled')) {
		$('.tabs__link').add('.tabs__content-item').removeClass('is-active');
		$('.tabs__link[data-link="' + step + '"]').addClass('is-active');
		$('.tabs__content-item[data-content="' + step + '"]').addClass('is-active');
	}
});
