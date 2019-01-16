(function($) {

	function HeaderAnimation(el, options) {
		this.el = el;
		this.$el = $(el);
		this.options = {
			startTop: 1
		};
		$.extend(this.options, options);
		this.initialize();
	}

	HeaderAnimation.prototype = {
		initialize: function() {
			var self = this;
			this.$wrapper = $('#site-header-wrapper');
			this.$topArea = $('#top-area');
			this.topAreaInSiteHeader = $('#site-header #top-area').length > 0;
			this.$headerMain = $('.header-main', this.$el);
			this.hasAdminBar = document.body.className.indexOf('admin-bar') != -1;
			this.htmlOffset = this.hasAdminBar ? parseInt($('html').css('margin-top')) : 0;
			this.scrollTop = 0;
			this.topOffset = 0;
			this.settedWrapperHeight = false;
			this.initedForDesktop = false;
			this.initedForMobile = false;

			this.hideWrapper = this.$wrapper.hasClass('site-header-wrapper-transparent');
			this.videoBackground = $('.page-title-block .gem-video-background').length && $('.page-title-block .gem-video-background').data('headerup');

			if(this.$el.hasClass('header-on-slideshow') && $('#main-content > *').first().is('.gem-slideshow, .block-slideshow')) {
				this.$wrapper.css({position: 'absolute'});
			}

			if(this.$el.hasClass('header-on-slideshow') && $('#main-content > *').first().is('.gem-slideshow, .block-slideshow')) {
				this.$wrapper.addClass('header-on-slideshow');
			} else {
				this.$el.removeClass('header-on-slideshow');
			}

			if(this.videoBackground) {
				this.$el.addClass('header-on-slideshow');
				this.$wrapper.addClass('header-on-slideshow');
			}

			this.initForDesktop();
			this.initForMobile();

			$(window).scroll(function() {
				self.scrollHandler();
			});

			$(window).resize(function() {
				self.initForDesktop();
				self.initForMobile();
				self.scrollHandler();

				setTimeout(function() {
					self.initializeHeight();
				}, 350);
			});
		},

		initForDesktop: function() {
			if (window.isResponsiveMenuVisible() || this.initedForDesktop) {
				return false;
			}

			this.initializeHeight();
			this.initializeStyles();

			if (this.$topArea.length && !this.topAreaInSiteHeader)
				this.options.startTop = this.$topArea.outerHeight();
		},

		initForMobile: function() {
			if (!window.isResponsiveMenuVisible() || this.initedForMobile) {
				return false;
			}

			//this.initializeHeight();
			//this.initializeStyles();

			if (this.$topArea.length && !this.topAreaInSiteHeader)
				this.options.startTop = this.$topArea.outerHeight();
		},

		setMargin: function($img) {
			var $small = $img.siblings('img.small'),
				w = 0;

			if (this.$headerMain.hasClass('logo-position-right')) {
				w = $small.width();
			} else if (this.$headerMain.hasClass('logo-position-center') || this.$headerMain.hasClass('logo-position-menu_center')) {
				w = $img.width();
				var smallWidth = $small.width(),
					offset = (w - smallWidth) / 2;

				w = smallWidth + offset;
				$small.css('margin-right', offset + 'px');
			}
			if (!w) {
				w = $img.width();
			}
			$small.css('margin-left', '-' + w + 'px');
			$img.parent().css('min-width', w + 'px');

			$small.show();
		},

		initializeStyles: function() {
			var self = this;

			if (this.$headerMain.hasClass('logo-position-menu_center')) {
				var $img = $('#primary-navigation .menu-item-logo a .logo img.default', this.$el);
			} else {
				var $img = $('.site-title a .logo img.default', this.$el);
			}

			if ($img.length && $img.is(':visible') && $img[0].complete) {
				self.setMargin($img);
				self.initializeHeight();
			} else {
				$img.on('load error', function() {
					self.setMargin($img);
					self.initializeHeight();
				});
			}

		},

		initializeHeight: function() {
			if (window.isResponsiveMenuVisible()) {
				this.$el.removeClass('shrink fixed');
				if (this.settedWrapperHeight) {
					this.$wrapper.css({
						height: ''
					});
				}
				return false;
			}

			if (this.hideWrapper) {
				return false;
			}

			that = this;

			setTimeout(function() {
				var shrink = that.$el.hasClass('shrink');
				that.$el.removeClass('shrink');
				var elHeight = that.$el.outerHeight();
				that.$wrapper.height(elHeight);
				that.settedWrapperHeight = true;
				if(shrink) {
					that.$el.addClass('shrink');
				}
			}, 50);
		},

		updateTopOffset: function() {
			var offset = this.htmlOffset;

			if (this.$wrapper.hasClass('header-on-slideshow') && !this.$el.hasClass('fixed'))
				offset = 0;

			scrollTop = this.getScrollY();

			if (this.options.startTop > 0) {
				if (scrollTop < this.options.startTop)
					offset += this.options.startTop - scrollTop;
			}

			if (this.topOffset != offset) {
				this.topOffset = offset;
				this.$wrapper.css('top', offset + 'px');
			}
		},

		scrollHandlerMobile: function() {
			this.updateTopOffset();
		},

		scrollHandler: function() {
			if (window.isResponsiveMenuVisible()) {
				this.scrollHandlerMobile();
				return false;
			} else {
				this.$wrapper.css('top', '');
			}


			if (this.getScrollY() >= this.options.startTop) {
				if (!this.$el.hasClass('shrink')) {
					var shrinkClass = 'shrink fixed';
					if (window.gemSettings.fillTopArea) {
						shrinkClass += ' fill';
					}
					this.$el.addClass(shrinkClass)

					if (this.hasAdminBar) {
						this.$el.css({
							top: this.htmlOffset
						});
					}
				}
			} else {
				if (this.$el.hasClass('shrink')) {
					this.$el.removeClass('shrink fixed')

					if (this.hasAdminBar) {
						this.$el.css({
							top: ''
						});
					}
				}
			}
		},

		updateScrollTop: function() {
			this.scrollTop = $(window).scrollTop();
		},

		getScrollY: function(){
			return window.pageYOffset || document.documentElement.scrollTop;
		},
	};

	$.fn.headerAnimation = function(options) {
		options = options || {};
		return new HeaderAnimation(this.get(0), options);
	};
})(jQuery);

/*
     FILE ARCHIVED ON 17:13:37 Nov 21, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 04:25:46 Jan 14, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 34.516 (3)
  esindex: 0.006
  captures_list: 49.306
  CDXLines.iter: 10.066 (3)
  PetaboxLoader3.datanode: 109.068 (4)
  exclusion.robots: 0.184
  exclusion.robots.policy: 0.17
  RedisCDXSource: 1.696
  PetaboxLoader3.resolve: 188.053
  load_resource: 289.702
*/