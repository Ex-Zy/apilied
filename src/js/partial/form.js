// $("#main-form").validate({

//     rules: {
//         form_name: {
//             required: true
//         },
//         form_email: {
//             required: true,
//             email: true
//         },
//         form_tel: {
//             required: true,
//             digits: true
//         },
//         form_pswd1: {
//             required: true,
//             minlength: 6
//         },
//         form_pswd2: {
//             required: true,
//             minlength: 6,
//             equalTo: "#form_pswd1"
//         }
//     },
//     messages: {
//         form_name: {
//             required: "Поле Имя обязательное для заполнения"
//         },
//         form_email: {
//             required: "Поле E-mail обязательное для заполнения",
//             email: "Введите пожалуйста корректный e-mail"
//         }
//     },
//     focusCleanup: true,
//     focusInvalid: false,
//     invalidHandler: function(event, validator) {
//         $(".js-form-message").text("Исправьте пожалуйста все ошибки.");
//     },
//     onkeyup: function(element) {
//         $(".js-form-message").text("");
//     },
//     errorPlacement: function(error, element) {
//         return true;
//     },
//     errorClass: "form-input_error",
//     validClass: "form-input_success"
// });




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
