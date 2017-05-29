var selectDefault = $('.select-default');

selectDefault.each(function() {
    var that = $(this),
        selectOption = that.find("option"),
        selectedOption = that.find("option[selected]"),
        selectLength = selectOption.length,
        selectPlaceholder = that.attr('data-placeholder');
    
    that.wrap('<div class="select js-select"></div>');
  
    var select = that.parents('.js-select');
  
    $('<ul class="select__list js-select-list"></ul>').appendTo(select);

    var selectList = select.find('.js-select-list');
  
    for(var i = 0; i < selectLength; i++) {
      var selectItem = $('<li>' + selectOption.eq(i).text() +'</li>');

      selectItem.appendTo(selectList);
    }
    
    $('<span class="select__text js-select-text"></span>').prependTo(select);
  
    var selectText = select.find('.js-select-text');
    
    if(selectPlaceholder) {
    	selectText.text(selectPlaceholder);
    }
    if(selectedOption) {
    	selectText.text(selectedOption.text());
    }
});

$(document).click(function(e) {
  var element = $('.js-select');

  if (!$(e.target).closest('.js-select').length) {
    element.removeClass('is-open');
  }
});

$('.js-select-text').click(function(){
  var that = $(this),
      select = that.parents('.js-select'),
      allSelects = $('.js-select');

  if(!select.hasClass('is-open')) {
    allSelects.removeClass('is-open');
    select.addClass('is-open'); 
  }
   else {
    select.removeClass('is-open');
  }
});

$('.js-select-list li').on('click', function(){
  var that = $(this),
      select = that.parents('.js-select'),
      selectText = select.find('.js-select-text'),
      itemIndex = that.index(),
      itemValue = that.text(),
      selectOption = select.find('option'),
      selectDefault = select.find('.select-default');

  selectText.text(itemValue);
  selectOption.prop('selected', false);
  selectOption.eq(itemIndex).prop('selected', true);
  selectDefault.trigger('change');
  select.removeClass('is-open');
});

selectDefault.on('change', function() {
  var that = $(this),
      select = that.parents('.js-select'),
      selectText = select.find('.js-select-text'),
      current = that.find('option:selected').text();
  
  selectText.text(current);
  select.removeClass('is-open');
  console.log(current);
});