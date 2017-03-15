'use strict';

var touch = 'ontouchstart' in window;

if (!touch) {
	$('body').addClass('is-no-touch');
} else {
	$('body').addClass('is-touch');
}