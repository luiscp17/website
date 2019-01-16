(function() {
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
            (navigator.MaxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }

    window.gemSettings.isTouch = isTouchDevice();

    function userAgentDetection() {
        var ua = navigator.userAgent.toLowerCase(),
        platform = navigator.platform.toLowerCase(),
        UA = ua.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || [null, 'unknown', 0],
        mode = UA[1] == 'ie' && document.documentMode;

        window.gemBrowser = {
            name: (UA[1] == 'version') ? UA[3] : UA[1],
            version: UA[2],
            platform: {
                name: ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ['other'])[0]
                }
        };
            }

    window.updateGemClientSize = function() {
        if (window.gemOptions == null || window.gemOptions == undefined) {
            window.gemOptions = {
                first: false,
                clientWidth: 0,
                clientHeight: 0,
                innerWidth: -1
            };
        }

        window.gemOptions.clientWidth = window.innerWidth || document.documentElement.clientWidth;
        if (document.body != null && !window.gemOptions.clientWidth) {
            window.gemOptions.clientWidth = document.body.clientWidth;
        }

        window.gemOptions.clientHeight = window.innerHeight || document.documentElement.clientHeight;
        if (document.body != null && !window.gemOptions.clientHeight) {
            window.gemOptions.clientHeight = document.body.clientHeight;
        }
    };

    window.updateGemInnerSize = function(width) {
        window.gemOptions.innerWidth = width != undefined ? width : (document.body != null ? document.body.clientWidth : 0);
    };

    userAgentDetection();
    window.updateGemClientSize(true);

    window.gemSettings.lasyDisabled = window.gemSettings.forcedLasyDisabled || (!window.gemSettings.mobileEffectsEnabled && (window.gemSettings.isTouch || window.gemOptions.clientWidth <= 800));
})();

/*
     FILE ARCHIVED ON 16:35:17 Nov 21, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 04:25:43 Jan 14, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 60.093 (3)
  esindex: 0.015
  captures_list: 76.318
  CDXLines.iter: 11.645 (3)
  PetaboxLoader3.datanode: 72.793 (4)
  exclusion.robots: 0.169
  exclusion.robots.policy: 0.159
  RedisCDXSource: 1.914
  PetaboxLoader3.resolve: 167.737 (2)
  load_resource: 360.135
*/