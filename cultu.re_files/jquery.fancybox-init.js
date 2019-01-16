(function($) {

	$('a.fancy, .fancy-link-inner a').fancybox();
	$('a.fancy-gallery').fancybox({
		helpers : {
			title: {
				type: 'over'
			}
		},
		wrapCSS: 'slideinfo',
		beforeLoad: function() {
			var clone = $(this.element).children('.slide-info').clone();

			if (clone.length) {
				this.title = clone.html();
			}
		}
	});

	$('.portfolio-item a.vimeo, .portfolio-item a.youtube, .blog article a.youtube, .blog article a.vimeo').fancybox({
		type: 'iframe'
	});
	$('.portfolio-item a.self_video').fancybox({
		width: '80%',
		height: '80%',
		autoSize: false,
		content: '<div id="fancybox-video"></div>',
		afterShow: function() {
			var $video = $('<video width="100%" height="100%" autoplay="autoplay" controls="controls" src="'+this.element.attr('href')+'" preload="none"></video>');
			$video.appendTo($('#fancybox-video'));
			$video.mediaelementplayer();
		}
	});
})(jQuery);

/*
     FILE ARCHIVED ON 18:01:04 Nov 21, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 04:25:46 Jan 14, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 95.181 (3)
  esindex: 0.012
  captures_list: 114.03
  CDXLines.iter: 13.56 (3)
  PetaboxLoader3.datanode: 62.873 (4)
  exclusion.robots: 0.231
  exclusion.robots.policy: 0.218
  RedisCDXSource: 1.636
  PetaboxLoader3.resolve: 69.694 (3)
  load_resource: 61.567
*/