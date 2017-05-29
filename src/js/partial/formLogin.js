import tooltip from '../modules/_tooltip.js';

function Form(elements) {
	this.form      = elements.form;
	this.email     = elements.form.find('#login-mail');
	this.password  = elements.form.find('#login-password');
	this.submit    = elements.form.find('.js-submit');
	this.input     = elements.form.find('.input');
	this.close     = elements.close;
	this._init();
}

Form.prototype = {
	_isValidate: function(email, password) {
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
					that._checkSuccess([email, password]);
				} else {
					//Если неправильный - выводим сообщение об ошибке
					formRow.removeClass('is-success');
					tooltip($(this), 'Адрес электронной почты должен быть в формате "name@domain.com"').add();
					that._checkSuccess([email, password]);
				}
			} else {
				// Поле пустое, выводим предупреждающее сообщение
				formRow.removeClass('is-success');
				tooltip($(this), 'Это поле обязательно').add();
				that._checkSuccess([email, password]);
			}
		});

		password.on('input blur', function() {
			var formRow = $(this).closest('.form__row');
			var field = formRow.find('.field');

			if($(this).val() != '') {
				// Поле не пустое
				if($(this).val().length >= 6) {
					// От 6-ти символов валидно
					formRow.addClass('is-success');
					tooltip($(this)).remove();
					that._checkSuccess([email, password]);
				} else {
					formRow.removeClass('is-success');
					tooltip($(this), 'Не менее 6 символов').add();
					that._checkSuccess([email, password]);
				}
			} else {
				// Поле пустое, выводим предупреждающее сообщение
				formRow.removeClass('is-success');
				tooltip($(this), 'Это поле обязательно').add();
				that._checkSuccess([email, password]);
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
						tooltip($('#login-mail'), data.error).add();
					} else {
						tooltip($('#login-mail'), textStatus).add();
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					tooltip($('#login-mail'), 'Page ' + errorThrown).add();
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
		this._isValidate(this.email, this.password);
		this._close();
	}
};

var formLogin = new Form({form: $('#js-form-login'), close: $('.js-reset-form')});