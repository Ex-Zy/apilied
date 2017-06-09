import tooltip from '../modules/_tooltip.js';

function FormRestore(elements) {
	this.form      = elements.form;
	this.email     = elements.form.find('#js-restore-mail');
	this.submit    = elements.form.find('.js-submit');
	this.input     = elements.form.find('.input');
	this.close     = elements.close;
	this._init();
}

FormRestore.prototype = {
	_isValidate: function(email) {
		var that                           = this;
		var patternMail                    = /.+@.+\..+/i;

		email.on('input blur', function() {
			var formRow = $(this).closest('.form__row');
			var field = formRow.find('.field');

			if($(this).val() != '') {
				//Если поле email заполнено
				if(patternMail.test($(this).val())){
					//Если соответствует строка формату email адреса - валидно, подчеркиваем белой рамкой
					formRow.addClass('is-success');
					tooltip($(this)).remove();
					that._checkSuccess([email]);
				} else {
					//Если неправильный - выводим сообщение об ошибке
					formRow.removeClass('is-success');
					tooltip($(this), 'Адрес электронной почты должен быть в формате "name@domain.com"').add();
					that._checkSuccess([email]);
				}
			} else {
				// Поле пустое, выводим предупреждающее сообщение
				formRow.removeClass('is-success');
				tooltip($(this), 'Это поле обязательно').add();
				that._checkSuccess([email]);
			}
		});
	},
	_checkSuccess: function(elements) {
		if(!elements) return;
		var ok = true;

		for(var i = 0; i < elements.length; i++) {
			var row  = elements[i].closest('.form__row');

			if(!row.hasClass('is-success')) {
				ok = false;
				break;
			}
		}

		if (ok == true) {
			this.submit.attr('disabled', false);
		} else {
			this.submit.attr('disabled', true);
		}

	},
	_submitForm: function(button) {
		var that = this;

		button.click(function(e) {
			e.preventDefault();

			var btn = $(this);
			var message = that.form.serialize();

			if(btn.attr('disabled') == 'disabled') return;

			$.ajax({
				url: '/acp/start/login',
				type: 'POST',
				data: message,
				success: function(data, textStatus, jqXHR) {
					var data = $.parseJSON(JSON.stringify(data));

					if(data.status === 'ok') {
						$(location).attr('href', data.data.redirectUrl);
					} else if(data.status === 'error') {
						tooltip($('#restore-mail'), data.error).add();
					} else {
						tooltip($('#restore-mail'), textStatus).add();
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					tooltip($('#restore-mail'), 'Page ' + errorThrown).add();
				}
			});
		});
	},
	_resetAll: function() {
		this.submit.attr('disabled', true);
		this.input.val('').closest('.form__row')
						  .removeClass('is-focused is-success');
		$('.warning-msg').remove();
	},
	_close: function() {
		var that = this;
		this.close.click(function() {
			that._resetAll();
		});
	},
	_init: function() {
		this.submit.attr('disabled', true);
		this._submitForm(this.submit);
		this._isValidate(this.email);
		this._close();
	}
};

var formRestore = new FormRestore({form: $('#js-form-restore'), close: $('.js-reset-form')});
console.log(formRestore);