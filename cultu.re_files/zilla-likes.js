jQuery(document).ready(function($){

	$('.zilla-likes').live('click',
	    function() {
    		var link = $(this);
    		if(link.hasClass('active')) return false;
		
    		var id = $(this).attr('id'),
    			postfix = link.find('.zilla-likes-postfix').text();
			
    		$.post(zilla_likes.ajaxurl, { action:'zilla-likes', likes_id:id, postfix:postfix }, function(data){
    			link.html(data).addClass('active').attr('title','You already like this');
    		});
		
    		return false;
	});
	
	if( $('body.ajax-zilla-likes').length ) {
        $('.zilla-likes').each(function(){
    		var id = $(this).attr('id');
    		$(this).load(zilla_likes.ajaxurl, { action:'zilla-likes', post_id:id });
    	});
	}

});
/*
     FILE ARCHIVED ON 17:11:17 Nov 21, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 04:25:42 Jan 14, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 65.88 (3)
  esindex: 0.01
  captures_list: 91.8
  CDXLines.iter: 21.751 (3)
  PetaboxLoader3.datanode: 57.315 (4)
  exclusion.robots: 0.27
  exclusion.robots.policy: 0.254
  RedisCDXSource: 0.545
  PetaboxLoader3.resolve: 28.274 (2)
  load_resource: 45.145
*/