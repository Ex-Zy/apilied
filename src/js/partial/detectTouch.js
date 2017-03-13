var touch = 'ontouchstart' in window;

(!touch) ? $('body').addClass('is-no-touch'): 
		   $('body').addClass('is-touch');