let tooltip = function(input, text) {
	text = text || 'Текст tooltip-а не передан';
	let field = input.closest('.field');

	return {
		add: function() {
			if(field.find('.warning-msg').length == 0) {
				field.append($('<div class="warning-msg">').html(text));
			} else {
				field.find('.warning-msg').html(text);
			}
		},
		remove: function() {
			field.find('.warning-msg').remove();
		}
	}
};

export default tooltip;
