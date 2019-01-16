(function($) {
	$(function() {

		$('body').updateAccordions();

	});

	$.fn.updateAccordions = function() {

		$('.gem_accordion', this).each(function (index) {

			var $accordion = $(this);

			$accordion.thegemPreloader(function() {

				var $tabs,
					interval = $accordion.attr("data-interval"),
					active_tab = !isNaN($accordion.data('active-tab')) && parseInt($accordion.data('active-tab')) > 0 ? parseInt($accordion.data('active-tab')) - 1 : false,
					collapsible = $accordion.data('collapsible') === 'yes';
				$tabs = $accordion.find('.gem_accordion_wrapper').accordion({
					header:"> div > .gem_accordion_header",
					autoHeight:false,
					heightStyle:"content",
					active:active_tab,
					collapsible: collapsible,
					navigation:true,
					activate: function(event, ui) {
						if (ui.newPanel.size() > 0) {
							ui.newPanel.trigger('accordion-update');
						}
					},
					beforeActivate: function(event, ui) {
						if (ui.newPanel.size() > 0) {
							$("html, body").animate({ scrollTop: ui.newPanel.closest('.gem_accordion').offset().top - 200 }, 300);
						}
					}
				});
			});

		});

	}

})(jQuery);
/*
     FILE ARCHIVED ON 19:17:08 Nov 21, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 04:25:46 Jan 14, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 141.943 (3)
  esindex: 0.008
  captures_list: 157.888
  CDXLines.iter: 10.518 (3)
  PetaboxLoader3.datanode: 165.275 (4)
  exclusion.robots: 0.259
  exclusion.robots.policy: 0.241
  RedisCDXSource: 1.832
  PetaboxLoader3.resolve: 149.433
  load_resource: 211.622
*/