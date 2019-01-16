(function($) {
	$(function() {

		$('.quickfinder-item').each(function() {
			var $item = $(this);
			var $quickfinder = $item.closest('.quickfinder');
			var initHover = {
				icon_color1: $('.gem-icon-half-1', $item).css('color'),
				icon_color2: $('.gem-icon-half-2', $item).css('color'),
				icon_background: $('.gem-icon-inner', $item).css('background-color'),
				icon_border: $('.gem-icon', $item).css('border-left-color'),
				box_color: $('.quickfinder-item-box', $item).css('background-color'),
				border_color: $('.quickfinder-item-box', $item).css('border-left-color'),
				title_color: $('.quickfinder-item-title', $item).css('color'),
				description_color: $('.quickfinder-item-text', $item).css('color'),
				button_text_color: $('.quickfinder-button .gem-button', $item).css('color'),
				button_background_color: $('.quickfinder-button .gem-button', $item).css('background-color'),
				button_border_color: $('.quickfinder-button .gem-button', $item).css('border-left-color')
			};
			if($('.gem-icon', $item).hasClass('gem-icon-shape-hexagon')) {
				initHover.icon_background = $('.gem-icon .gem-icon-shape-hexagon-top-inner-before', $item).css('background-color');
				initHover.icon_border = $('.gem-icon .gem-icon-shape-hexagon-back-inner-before', $item).css('background-color');
			}
			$item.data('initHover', initHover);
			if($('a', $item).length) {
				if($item.hasClass('quickfinder-item-effect-background-reverse') || $item.hasClass('quickfinder-item-effect-border-reverse') && !$item.hasClass('border-reverse-with-background')) {
					$('.gem-icon-inner', $item).prepend('<div class="quickfinder-animation"/>');
				}
			}
		});

		$('body').on('mouseenter', '.quickfinder-item a', function() {
			var $item = $(this).closest('.quickfinder-item');
			var $quickfinder = $item.closest('.quickfinder');
			var initHover = $item.data('initHover');
			$item.addClass('hover');
			if($quickfinder.data('hover-icon-color')) {
				if($item.hasClass('quickfinder-item-effect-background-reverse')) {
					if($('.gem-icon', $item).hasClass('gem-icon-shape-hexagon')) {
						$('.gem-icon .gem-icon-shape-hexagon-back-inner-before', $item).css('background-color', $quickfinder.data('hover-icon-color'));
						$('.gem-icon .gem-icon-shape-hexagon-top-inner-before', $item).css('background-color', '#ffffff');
					} else {
						$('.gem-icon', $item).css('border-color', $quickfinder.data('hover-icon-color'));
						$('.gem-icon-inner', $item).css('background-color', $quickfinder.data('hover-icon-color'));
					}
					$('.gem-icon-half-1', $item).css('color', $quickfinder.data('hover-icon-color'));
					$('.gem-icon-half-2', $item).css('color', $quickfinder.data('hover-icon-color'));
				}
				if($item.hasClass('quickfinder-item-effect-border-reverse')) {
					if($('.gem-icon', $item).hasClass('gem-icon-shape-hexagon')) {
						$('.gem-icon .gem-icon-shape-hexagon-back-inner-before', $item).css('background-color', $quickfinder.data('hover-icon-color'));
						$('.gem-icon .gem-icon-shape-hexagon-top-inner-before', $item).css('background-color', $quickfinder.data('hover-icon-color'));
					} else {
						$('.gem-icon', $item).css('border-color', $quickfinder.data('hover-icon-color'));
						$('.gem-icon-inner', $item).css('background-color', $quickfinder.data('hover-icon-color'));
					}
					$('.gem-icon-half-1', $item).css('color', '#ffffff');
					$('.gem-icon-half-2', $item).css('color', '#ffffff');
				}
				if($item.hasClass('quickfinder-item-effect-simple')) {
					$('.gem-icon-half-1', $item).css('color', $quickfinder.data('hover-icon-color'));
					$('.gem-icon-half-2', $item).css('color', $quickfinder.data('hover-icon-color'));
				}
			} else {
				if($item.hasClass('quickfinder-item-effect-background-reverse')) {
					if($('.gem-icon', $item).hasClass('gem-icon-shape-hexagon')) {
						$('.gem-icon .gem-icon-shape-hexagon-top-inner-before', $item).css('background-color', '#ffffff');
					} else {
						$('.gem-icon', $item).css('border-color', $quickfinder.data('hover-icon-color'));
					}
					if(initHover.icon_color1 == '#ffffff' || initHover.icon_color1 == 'rgb(255, 255, 255)') {
						$('.gem-icon-half-1', $item).css('color', initHover.icon_border);
					}
					if(initHover.icon_color2 == '#ffffff' || initHover.icon_color2 == 'rgb(255, 255, 255)') {
						$('.gem-icon-half-2', $item).css('color', initHover.icon_border);
					}
				}
				if($item.hasClass('quickfinder-item-effect-border-reverse')) {
					if($('.gem-icon', $item).hasClass('gem-icon-shape-hexagon')) {
						$('.gem-icon .gem-icon-shape-hexagon-top-inner-before', $item).css('background-color', initHover.icon_border);
					} else {
						$('.gem-icon-inner', $item).css('background-color', initHover.icon_border);
					}
					$('.gem-icon-half-1', $item).css('color', '#ffffff');
					$('.gem-icon-half-2', $item).css('color', '#ffffff');
				}
			}
			if($quickfinder.data('hover-box-color') && !$quickfinder.hasClass('quickfinder-style-default') && !$quickfinder.hasClass('quickfinder-style-vertical')) {
				$('.quickfinder-item-box', $item).css('background-color', $quickfinder.data('hover-box-color'));
			
			}
			if($quickfinder.data('hover-border-color') && !$quickfinder.hasClass('quickfinder-style-default') && !$quickfinder.hasClass('quickfinder-style-vertical')) {
				$('.quickfinder-item-box', $item).css('border-color', $quickfinder.data('hover-border-color'));
			}
			if($quickfinder.data('hover-title-color')) {
				$('.quickfinder-item-title', $item).css('color', $quickfinder.data('hover-title-color'));
			}
			if($quickfinder.data('hover-description-color')) {
				$('.quickfinder-item-text', $item).css('color', $quickfinder.data('hover-description-color'));
			}
			if($quickfinder.data('hover-button-text-color')) {
				$('.quickfinder-button .gem-button', $item).css('color', $quickfinder.data('hover-button-text-color'));
			}
			if($quickfinder.data('hover-button-background-color')) {
				$('.quickfinder-button .gem-button', $item).css('background-color', $quickfinder.data('hover-button-background-color'));
			}
			if($quickfinder.data('hover-button-border-color')) {
				$('.quickfinder-button .gem-button', $item).css('border-color', $quickfinder.data('hover-button-border-color'));
			}
		});

		$('body').on('mouseleave', '.quickfinder-item a', function() {
			var $item = $(this).closest('.quickfinder-item');
			var $quickfinder = $item.closest('.quickfinder');
			var initHover = $item.data('initHover');
			$item.removeClass('hover');
			$('.gem-icon', $item).css('border-color', initHover.icon_border);
			$('.gem-icon-inner', $item).css('background-color', initHover.icon_background);
			$('.gem-icon-half-1', $item).css('color', initHover.icon_color1);
			$('.gem-icon-half-2', $item).css('color', initHover.icon_color2);
			$('.quickfinder-item-box', $item).css('background-color', initHover.box_color);
			$('.quickfinder-item-box', $item).css('border-color', initHover.border_color);
			$('.quickfinder-item-title', $item).css('color', initHover.title_color);
			$('.quickfinder-item-text', $item).css('color', initHover.description_color);
			$('.quickfinder-button .gem-button', $item).css('color', initHover.button_text_color);
			$('.quickfinder-button .gem-button', $item).css('background-color', initHover.button_background_color);
			$('.quickfinder-button .gem-button', $item).css('border-color', initHover.button_border_color);
			if($('.gem-icon', $item).hasClass('gem-icon-shape-hexagon')) {
				$('.gem-icon .gem-icon-shape-hexagon-top-inner-before', $item).css('background-color', initHover.icon_background);
				$('.gem-icon .gem-icon-shape-hexagon-back-inner-before', $item).css('background-color', initHover.icon_border);
			}
		});
	});
})(jQuery);
/*
     FILE ARCHIVED ON 20:14:18 Nov 21, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 04:25:47 Jan 14, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 260.959 (3)
  esindex: 0.013
  captures_list: 277.476
  CDXLines.iter: 11.851 (3)
  PetaboxLoader3.datanode: 280.932 (4)
  exclusion.robots: 0.272
  exclusion.robots.policy: 0.253
  RedisCDXSource: 0.782
  PetaboxLoader3.resolve: 22.989
  load_resource: 80.271
*/