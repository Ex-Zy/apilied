'use strict';

var buttons = $('.js-category');
var inputUser = $('#form-user');
var form = $('#main-form');

$('.js-category').click(function () {
	var btn = $(this);
	var value = btn.attr('data-user-name');

	buttons.removeClass('is-active');
	btn.addClass('is-active');
	inputUser.attr('value', value);
});

$('.js-next-step').click(function (e) {
	e.preventDefault();

	var step = $(this).data('step');
	var link = $('.js-control-link').filter('[href="' + step + '"]');
	var contentItem = $('.js-content-item').filter('[data-content="' + link.attr('href') + '"]');

	$('.js-content-item').add('.js-control-link').removeClass('is-active');
	link.add(contentItem).addClass('is-active');
});