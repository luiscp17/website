(function ($) {

    function getScrollY(elem){
        return window.pageYOffset || document.documentElement.scrollTop;
    }

    function Sticky(el, options) {
        var self = this;
        this.el = el;
        this.$el = $(el);

        this.options = {
        };
        $.extend(this.options, options);

        self.init();
    }

    $.fn.scSticky = function(options) {
        $(this).each(function() {
            return new Sticky(this, options);
        });
    }

    Sticky.prototype = {
        init: function() {
            var self = this;

            this.$wrapper = false;

            this.$parent = this.getParent();

            $(window).scroll(function() {
                if (self.useSticky()) {
                    self.wrap();
                    self.scroll();
                } else {
                    self.unwrap();
                }
            });

            $(window).resize(function() {
                if (self.useSticky()) {
                    self.wrap();
                    self.scroll();
                } else {
                    self.unwrap();
                }
            });
        },

        wrap: function() {
            if (!this.$wrapper)
                this.$wrapper = this.$el.wrap('<div />').parent();

            this.$wrapper.attr('class', this.$el.attr('class')).addClass('gem-sticky-block').css({
                padding: 0,
                height: this.$el.outerHeight()
            });

            this.$el.css({
                width: this.$wrapper.outerWidth(),
                margin: 0
            });
        },

        getParent: function() {
            return this.$el.parent();
        },

        useSticky: function() {
            var is_sidebar = true;
            if (this.$el.hasClass('sidebar')) {
                if (this.$wrapper) {
                    if (this.$wrapper.outerHeight() > this.$wrapper.siblings('.panel-center:first').outerHeight())
                        is_sidebar = false;
                } else {
                    if (this.$el.outerHeight() > this.$el.siblings('.panel-center:first').outerHeight())
                        is_sidebar = false;
                }
            }

            return $(window).width() > 1000 && is_sidebar;
        },

        unwrap: function() {
            if (this.$el.parent().is('.gem-sticky-block')) {
                this.$el.unwrap();
                this.$wrapper = false;
            }
            this.$el.css({
                width: "",
                top: "",
                bottom: "",
                margin: ""
            });
        },

        scroll: function() {
            var top_offset = parseInt($('html').css('margin-top'));

            var $header = $('#site-header');
            if ($header.hasClass('fixed')) {
                top_offset += $header.outerHeight();
            }

            var scroll = getScrollY();
            var offset = this.$wrapper.offset();
            var parent_offset = this.$parent.offset();
            var parent_bottom = parent_offset.top + this.$parent.outerHeight() - scroll;
            var bottom = $(window).height() - parent_bottom;

            if ( (top_offset + this.$el.outerHeight() ) >= parent_bottom ) {
                this.$el.addClass('sticky-fixed').css({
                    top: "",
                    bottom: bottom,
                    left: offset.left
                });
                return;
            }

            if ( (scroll + top_offset) > offset.top ) {
                this.$el.addClass('sticky-fixed').css({
                    top: top_offset,
                    bottom: "",
                    left: offset.left
                });
            } else {
                this.$el.removeClass('sticky-fixed').css({
                    top: "",
                    bottom: "",
                    left: ""
                });
            }
        }
    };

}(jQuery));

/*
     FILE ARCHIVED ON 17:55:23 Nov 21, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 04:25:46 Jan 14, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 80.129 (3)
  esindex: 0.01
  captures_list: 100.752
  CDXLines.iter: 13.068 (3)
  PetaboxLoader3.datanode: 89.839 (4)
  exclusion.robots: 0.397
  exclusion.robots.policy: 0.372
  RedisCDXSource: 1.955
  PetaboxLoader3.resolve: 23.432
  load_resource: 62.092
*/