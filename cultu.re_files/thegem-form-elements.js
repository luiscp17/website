(function($) {
	$.fn.checkbox = function() {
		$(this).each(function() {
			var $el = $(this);
			var typeClass = $el.attr('type');
			$el.hide();
			$el.next('.'+typeClass+'-sign').remove();
			var $checkbox = $('<span class="'+typeClass+'-sign" />').insertAfter($el);
			$checkbox.click(function() {
				if($el.attr('type') == 'radio') {
					$el.prop('checked', true).trigger('change').trigger('click');
				} else {
					$el.prop('checked', !($el.is(':checked'))).trigger('change');
				}
			});
			$el.change(function() {
				$('input[name="'+$el.attr('name')+'"]').each(function() {
					if($(this).is(':checked')) {
						$(this).next('.'+$(this).attr('type')+'-sign').addClass('checked');
					} else {
						$(this).next('.'+$(this).attr('type')+'-sign').removeClass('checked');
					}
				});
			});
			if($el.is(':checked')) {
				$checkbox.addClass('checked');
			} else {
				$checkbox.removeClass('checked');
			}
		});
	}
	$.fn.combobox = function() {
		$(this).each(function() {
			var $el = $(this);
			$el.insertBefore($el.parent('.combobox-wrapper'));
			$el.next('.combobox-wrapper').remove();
			$el.css({
				'opacity': 0,
				'position': 'absolute',
				'left': 0,
				'right': 0,
				'top': 0,
				'bottom': 0
			});
			var $comboWrap = $('<span class="combobox-wrapper" />').insertAfter($el);
			var $text = $('<span class="combobox-text" />').appendTo($comboWrap);
			var $button = $('<span class="combobox-button" />').appendTo($comboWrap);
			$el.appendTo($comboWrap);
			$el.change(function() {
				$text.text($('option:selected', $el).text());
			});
			$text.text($('option:selected', $el).text());
			$el.comboWrap = $comboWrap;
		});
	}
})(jQuery);

/*
     FILE ARCHIVED ON 22:00:02 Nov 21, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 04:25:45 Jan 14, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 52.95 (3)
  esindex: 0.008
  captures_list: 71.233
  CDXLines.iter: 13.401 (3)
  PetaboxLoader3.datanode: 55.086 (4)
  exclusion.robots: 0.171
  exclusion.robots.policy: 0.158
  RedisCDXSource: 1.601
  PetaboxLoader3.resolve: 38.307
  load_resource: 75.0
*/