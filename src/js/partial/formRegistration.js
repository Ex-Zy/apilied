import tooltip from '../modules/_tooltip.js';

var capchaIsError = function(capcha) {
	var capcha = $('.recaptcha-error').eq(0).length;
	if(capcha) return true;
};

function FormRegistration(elements) {
	this.tabsElement          = elements.tabsElement;
	this.links                = elements.tabsElement.find('.js-control-link');
	this.items                = elements.tabsElement.find('.js-content-item');
	this.btnSelectProfile     = elements.tabsElement.find('.js-category');
	this.btnNextStep          = elements.tabsElement.find('.js-next-step');
	this.submit               = elements.tabsElement.find('.js-submit');
	this.inputUser            = elements.tabsElement.find('#input-user');
	this.form                 = elements.tabsElement.find('#main-form');
	this.input                = elements.input;
	this.change               = elements.change;
	this.changeLink           = elements.changeLink;
	this.changeBtn            = elements.changeBtn;
	this.info                 = elements.info;
	this.fieldWebMoney        = elements.tabsElement.find('.js-toggle-visibility');
	this.resetFields          = elements.resetFields;
	this.mailCheckIn          = elements.tabsElement.find('#mail-check-in');
	this.passwordCheckIn      = elements.tabsElement.find('#password-check-in');
	this.confirmCheckIn       = elements.tabsElement.find('#confirm-check-in');
	this.contact              = elements.tabsElement.find('#contact-check-in');
	this._init();
}

FormRegistration.prototype = {
	_setFirstTab: function() {
		this._switchClass([this.links.eq(0), this.items.eq(0)], 'is-active', 'add');
		this._switchClass([this.info], 'is-visible', 'add');
		this.btnNextStep.attr('disabled', true);
		this.submit.attr('disabled', true);
	},
	_selectProfile: function() {
		var that    = this;

		this.btnSelectProfile.click(function() {
			var btn        = $(this);
			var txt        = btn.text().trim();
			var val        = btn.attr('data-user-name');
			var parentEl   = btn.closest(that.items);
			var advertiser = btn.attr('data-user-name') === 'advertiser';
			var webmaster  = btn.attr('data-user-name') === 'webmaster';

			if(btn.hasClass('is-active')) return;
			if(advertiser) {
				that.fieldWebMoney.addClass('is-hidden');
			}
			if(webmaster) { 
				that.fieldWebMoney.removeClass('is-hidden');
			}
			that.btnSelectProfile.removeClass('is-active');
			btn.addClass('is-active');
			parentEl.addClass('is-done');
			that.inputUser.attr('value', val);
			that.changeBtn.html(txt);
			that._checkDone();
		});
	},
	_nextStep: function() {
		var that        = this;

		this.btnNextStep.click(function(e) {
			e.preventDefault();

			var btn  = $(this);
			var data = btn.data('step');
			var link = that.links.filter('[data-tabs-link="'+ data +'"]');
			var item = that.items.filter('[data-tabs-content="'+ data +'"]');

			that._switchClass([that.links, that.items], 'is-active', 'remove');
			that._switchClass([link, item], 'is-active', 'add');
			that._switchClass([that.change, that.info], 'is-visible', 'remove');
			that._switchClass([that.change], 'is-visible', 'add');
		});
	},
	_isValidate: function() {
		var that             = this;
		var patternMail      = /.+@.+\..+/i;
		var patternWebmoney  = /^[Rr]\d{12}$/;
		var email            = this.mailCheckIn;
		var password         = this.passwordCheckIn;
		var confirm          = this.confirmCheckIn;
		var webmoney         = this.fieldWebMoney.find('input');

		email.on('input blur', function() {
			var formRow = $(this).closest('.form__row');
			var field = formRow.find('.field');

			if($(this).val() != '') {
				//Если поле email заполнено
				if(patternMail.test($(this).val())){
					//Если соответствует строка формату email адреса - валидно, подчеркиваем белой рамкой
					formRow.addClass('is-success');
					tooltip($(this)).remove();
					that._checkSuccess([email, password, confirm]);
				} else {
					//Если неправильный - выводим сообщение об ошибке
					formRow.removeClass('is-success');
					tooltip($(this), 'Адрес электронной почты должен быть в формате "name@domain.com"').add();
					that._checkSuccess([email, password, confirm]);
				}
			} else {
				// Поле пустое, выводим предупреждающее сообщение
				formRow.removeClass('is-success');
				tooltip($(this), 'Это поле обязательно').add();
				that._checkSuccess([email, password, confirm]);
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
					that._checkSuccess([email, password, confirm]);
					that._checkDone();
				} else {
					formRow.removeClass('is-success');
					tooltip($(this), 'Не менее 6 символов').add();
					that._checkSuccess([email, password, confirm]);
				}
			} else {
				// Поле пустое, выводим предупреждающее сообщение
				formRow.removeClass('is-success');
				tooltip($(this), 'Это поле обязательно').add();
				that._checkSuccess([email, password, confirm]);
			}
		});

		confirm.on('input blur', function() {
			var formRow = $(this).closest('.form__row');
			var field = formRow.find('.field');

			if($(this).val() != '') {
				//Если не пустое
				if($(this).val() !== password.val())  {
					//Если не ровно полю password
					formRow.removeClass('is-success');
					tooltip($(this), 'Пароли не совпадают').add();
					that._checkSuccess([email, password, confirm]);
				} else {
				// валидно, подчеркиваем белой рамкой
					formRow.addClass('is-success');
					tooltip($(this)).remove();
					that._checkSuccess([email, password, confirm]);
				}
			} else {
				// Поле пустое, выводим предупреждающее сообщение
				formRow.removeClass('is-success');
				tooltip($(this), 'Это поле обязательно').add();
				that._checkSuccess([email, password, confirm]);
			}
		});

		webmoney.on('input blur', function() {
			var formRow = $(this).closest('.form__row');
			var field = formRow.find('.field');
			var step = $(this).closest('.js-content-item');

			// console.log(formRow.hasClass('is-success') && !capchaIsError());

			if($(this).val() != '') {
				//Если не пустое
				if(patternWebmoney.test($(this).val()) && !capchaIsError()){
					//Ввод верный
					formRow.addClass('is-success');
					tooltip($(this)).remove();
					that._checkSuccess([webmoney]);
					console.log("Капча и паттерн верны");
				} else if(patternWebmoney.test($(this).val())) {
					formRow.addClass('is-success');
					tooltip($(this)).remove();
					console.log("Патерн верен");
				} else {
					//Если неправильный - выводим сообщение об ошибке
					formRow.removeClass('is-success');
					tooltip($(this), 'Кошелек должен иметь символ "R" + 12 цифр').add();
					that._checkSuccess([webmoney]);
				}
			} else {
				// Поле пустое, выводим предупреждающее сообщение
				formRow.removeClass('is-success');
				tooltip($(this), 'Это поле обязательно').add();
				that._checkSuccess([webmoney]);
			}
		});

	},
	_checkSuccess: function(elements) {
		if(!elements) return;
		var len = elements.length;
		var ok = true;

		for(var i = 0; i < len; i++) {
			var row = elements[i].closest('.form__row');
			var step = elements[i].closest('.js-content-item');

			if(!row.hasClass('is-success')) {
				ok = false;
				break;
			}
		}

		if (ok == true) {
			step.addClass('is-done');
			this._checkDone();
		} else {
			step.removeClass('is-done');
			step.find(this.btnNextStep).attr('disabled', true);
			step.find(this.submit).attr('disabled', true);
		}
	},
	_checkDone: function() {
		var that = this;

		this.items.each(function(index) {
			var step = $(this);
			if(step.hasClass('is-done')) {
				step.find(that.btnNextStep).attr('disabled', false);
				step.find(that.submit).attr('disabled', false);
				that._nextStep();
				return;
			}
		});
	},
	_focusOnInput: function() {
		var that   = this;
		var rows   = that.input.closest('.form__row');

		that.input.focus(function() {
			var itemRow = $(this).closest('.form__row');

			rows.removeClass('is-focused');
			itemRow.addClass('is-focused');
		});
	},
	_changeAccount: function() {
		var that = this;
		var webmoney = this.fieldWebMoney;

		this.changeLink.click(function(e) {
			var item = that.btnSelectProfile.not('.is-active') || that.btnSelectProfile[0];
			var advertiser = item.attr('data-user-name') === 'advertiser';
			var webmaster  = item.attr('data-user-name') === 'webmaster';
			var successCapcha = $('.recaptcha-error').length === 0;

			if(advertiser && successCapcha) {
				that.submit.attr('disabled', false);
				if(!that.submit.closest('.js-content-item').hasClass('is-done')) {
					that.submit.closest('.js-content-item').addClass('is-done');
				}
			} 
			if(webmaster) {
				that.submit.attr('disabled', true);
				if(that.submit.closest('.js-content-item').hasClass('is-done')) {
					that.submit.closest('.js-content-item').removeClass('is-done');
				}
			}
			webmoney.removeClass('is-focused is-success')
					.find('input').val('');
			tooltip(webmoney.find('.input')).remove();
			item.trigger('click');
			e.preventDefault();
		});
	},
	_switchClass: function (option, cl, action) {
		if (option && cl && action) {
			var len = option.length;
			if ( len === 0 ) return;
			else {
				for (var i = 0; i < len; i++) {
					var el = option[i];
					if( action === 'toggle' ) {
						if( el.hasClass(cl) ) el.removeClass(cl);
						else el.addClass(cl);
					}
					if(action === 'add' && !el.hasClass(cl)) el.addClass(cl);
					if( action === 'remove' && el.hasClass(cl) ) el.removeClass(cl);
				}
			}
		}
		else {
			console.log('Массив или класс в аргументах метода отстутствуют!!!');
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
				url: '/acp/start/register',
				type: 'POST',
				data: message,
				success: function(data, textStatus, jqXHR) {
					var data = $.parseJSON(JSON.stringify(data));
					var response = data.data.errors;

					function printTextToTooltip(msg, callback) {
						if(Object.prototype.toString.call(msg) == '[object Array]') {
							var msgCollection = [];
							for(var i = 0; i < msg.length; i++) {
								if(i != msg.length - 1) {
									msgCollection.push(callback(msg[i]) + "<br>");
								} else {
									msgCollection.push(callback(msg[i]));
								}
							}
							return msgCollection;
						} else {
							return msg;
						}
					}
					
					if(data.status === 'ok') {
						$(location).attr('href', data.data.redirectUrl);
					} else if(data.status === 'error') {
						grecaptcha.reset();

						if(response.user_type) {
							tooltip(that.form.find('.form__action .input'), printTextToTooltip(response.user_type, decodeURI)).add();
							that._switchClass([that.links, that.items], 'is-active', 'remove');
							that._switchClass([that.links.eq(0), that.items.eq(0)], 'is-active', 'add');
						}
						else if(response.email || response.password || response.password_confirm) {
							if(response.email) tooltip(that.mailCheckIn, printTextToTooltip(response.email, decodeURI)).add();
							if(response.password) tooltip(that.passwordCheckIn, printTextToTooltip(response.password, decodeURI)).add();
							if(response.password_confirm) tooltip(that.confirmCheckIn, printTextToTooltip(response.password_confirm, decodeURI)).add();
							that._switchClass([that.links, that.items], 'is-active', 'remove');
							that._switchClass([that.links.eq(1), that.items.eq(1)], 'is-active', 'add');
						}
						else if(response.contacts || response.wallet || response.captcha) {
							if(response.contacts) tooltip(that.contact, printTextToTooltip(response.contact, decodeURI)).add();
							if(response.captcha) tooltip(that.contact, printTextToTooltip(response.captcha, decodeURI)).add();
							if(response.wallet) tooltip(that.fieldWebMoney.find('.input'), printTextToTooltip(response.wallet, decodeURI)).add();
							that._switchClass([that.links, that.items], 'is-active', 'remove');
							that._switchClass([that.links.eq(2), that.items.eq(2)], 'is-active', 'add');
						}
					} else {
						tooltip(that.contact, textStatus).add();
						that._switchClass([that.links, that.items], 'is-active', 'remove');
						that._switchClass([that.links.eq(2), that.items.eq(2)], 'is-active', 'add');
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					tooltip(that.contact, textStatus + ' ' + errorThrown).add();
				}
			});

		});
	},
	_resetAll: function() {
		this._switchClass([this.btnSelectProfile, this.links, this.items], 'is-active', 'remove');
		this._switchClass([this.change, this.info], 'is-visible', 'remove');
		this.inputUser.removeAttr('value');
		this.input.val('').closest('.form__row').removeClass('is-focused is-success');
		this.items.removeClass('is-done');
		$('.warning-msg').remove();
		grecaptcha.reset();
		this._setFirstTab();
	},
	_close: function() {
		var that = this;
		this.resetFields.click(function() {
			that._resetAll();
		});
	},
	_init: function() {
		this._selectProfile();
		this._setFirstTab();
		this._isValidate();
		this._focusOnInput();
		this._changeAccount();
		this._submitForm(this.submit);
		this._close();
	}
};

var formRegister = new FormRegistration({
	tabsElement              : $('.js-tabs'),
	input                    : $('.input'),
	change                   : $('.change'),
	changeLink               : $('.js-account-link'),
	changeBtn                : $('.js-account-btn'),
	info                     : $('.info'),
	resetFields              : $('.js-reset-fields'),
});