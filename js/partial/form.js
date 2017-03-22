// var buttons = $('.js-category');
// var inputUser = $('#form-user');
// var form = $('#main-form');

// $('.js-category').click(function() {
// 	var btn = $(this);
// 	var value = btn.attr('data-user-name');
	
// 	buttons.removeClass('is-active');
// 	btn.addClass('is-active');
// 	inputUser.attr('value', value);
// });

// $('.js-next-step').click(function(e) {
// 	e.preventDefault();

// 	var step = $(this).data('step');
// 	var link = $('.js-control-link').filter('[href="' + step + '"]');
// 	var contentItem = $('.js-content-item').filter('[data-content="' + link.attr('href') + '"]');

// 	$('.js-content-item').add('.js-control-link').removeClass('is-active');
// 	link.add(contentItem).addClass('is-active');
// });


function Tabs(elements) {
	this.tabsElement      = elements.tabsElement;
	this.links            = elements.links;
	this.items            = elements.items;
	this.btnSelectProfile = elements.btnSelectProfile;
	this.btnNextStep      = elements.btnNextStep;
	this.inputUser        = elements.inputUser;
	this.form             = elements.form;
	this.input            = elements.input;
	this.changeLink       = elements.change;
}

Tabs.prototype = {
	_selectProfile: function() {
		var buttons = this.btnSelectProfile;
		var input   = this.inputUser;
		var form    = this.form;
		
		buttons.click(function() {
			var btn   = $(this);
			var val   = btn.attr('data-user-name');

			buttons.removeClass('is-active');
			btn.addClass('is-active');
			form.addClass('step-1-ready');
			input.attr('value', val);
		});
	},
	_nextStep: function() {
		var btnNextStep = this.btnNextStep;
		var allLinks    = this.links;
		var allitems    = this.items;

		btnNextStep.click(function(e) {
			e.preventDefault();

			var btn  = $(this);
			var data = btn.data('step');
			var link = allLinks.filter('[data-tabs-link="'+ data +'"]');
			var item = allitems.filter('[data-tabs-content="'+ data +'"]');

			btn.removeAttr('disabled');
			allLinks.add(allitems).removeClass('is-active');
			link.add(item).addClass('is-active');
		});
	},
	_focusOnInput: function() {
		var allInputs = this.input;

		allInputs.focus(function() {
			allInputs.closest('.form__row').removeClass('is-focused');
			$(this).closest('.form__row').addClass('is-focused');
		});
	},
	_changeAccount: function() {
		
	},
	init: function() {
		this._selectProfile();
		this._nextStep();
		this._focusOnInput();
	}
};

var tabs = new Tabs({
	tabsElement       : $('.js-tabs'),
	links             : $('.js-control-link'),
	items             : $('.js-content-item'),
	btnSelectProfile  : $('.js-category'),
	btnNextStep       : $('.js-next-step'),
	inputUser         : $('#input-user'),
	form              : $('#main-form'),
	input             : $('.input'),
	changeLink        : $('.js-account-link')
});

tabs.init();

console.log(tabs);