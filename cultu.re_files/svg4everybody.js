(function (document, navigator, CACHE, IE9TO11) {
  if (IE9TO11) document.addEventListener('DOMContentLoaded', function () {
    [].forEach.call(document.querySelectorAll('use'), function (use) {
      var
      svg = use.parentNode,
      url = use.getAttribute('xlink:href').split('#'),
      url_root = url[0],
      url_hash = url[1],
      xhr = CACHE[url_root] = CACHE[url_root] || new XMLHttpRequest();

      if (!xhr.s) {
        xhr.s = [];

        xhr.open('GET', url_root);

        xhr.onload = function () {
          var x = document.createElement('x'), s = xhr.s;

          x.innerHTML = xhr.responseText;

          xhr.onload = function () {
            s.splice(0).map(function (array) {
              var g = x.querySelector('#' + array[2]);

              if (g) array[0].replaceChild(g.cloneNode(true), array[1]);
            });
          };

          xhr.onload();
        };

        xhr.send();
      }

      xhr.s.push([svg, use, url_hash]);

      if (xhr.responseText) xhr.onload();
    });
  });
})(
  document,
  navigator,
  {},
  /Trident\/[567]\b/.test(navigator.userAgent)
);

/*
     FILE ARCHIVED ON 18:14:01 Nov 21, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 04:25:44 Jan 14, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 107.277 (3)
  esindex: 0.008
  captures_list: 127.316
  CDXLines.iter: 11.96 (3)
  PetaboxLoader3.datanode: 111.354 (4)
  exclusion.robots: 0.164
  exclusion.robots.policy: 0.153
  RedisCDXSource: 5.15
  PetaboxLoader3.resolve: 31.073
  load_resource: 57.685
*/