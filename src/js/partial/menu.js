function showSidebar() {
	var menu = $('.js-menu');
	var sidebar = $('.js-sidebar');

	menu.add(sidebar).on('mouseenter', function() {
		sidebar.addClass('is-active');
	});

	menu.add(sidebar).on('mouseleave', function() {
		sidebar.removeClass('is-active');
	});


}

showSidebar();