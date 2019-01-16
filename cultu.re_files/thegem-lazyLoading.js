(function($) {

	var prefixes = 'Webkit Moz ms Ms O'.split(' ');
    var docElemStyle = document.documentElement.style;

    function getStyleProperty( propName ) {
        if ( !propName ) {
            return;
        }

        // test standard property first
        if ( typeof docElemStyle[ propName ] === 'string' ) {
            return propName;
        }

        // capitalize
        propName = propName.charAt(0).toUpperCase() + propName.slice(1);

        // test vendor specific properties
        var prefixed;
        for ( var i=0, len = prefixes.length; i < len; i++ ) {
            prefixed = prefixes[i] + propName;
            if ( typeof docElemStyle[ prefixed ] === 'string' ) {
                return prefixed;
            }
        }
    }

    var transitionProperty = getStyleProperty('transition');
    var transitionEndEvent = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'otransitionend',
        transition: 'transitionend'
    }[ transitionProperty ];

	function getElementData(element, attributeNameCamel, attributeName, defaultValue) {
		if (element.dataset != undefined) {
			if (element.dataset[attributeNameCamel] != undefined) {
				return element.dataset[attributeNameCamel];
			} else {
				var value = $(element).data(attributeName);
				if (value == undefined) {
					return defaultValue;
				}
				return value;
			}
			return element.dataset[attributeNameCamel] != undefined ? element.dataset[attributeNameCamel] : defaultValue;
		}
		var value = this.getAttribute(attributeName);
		return value != null && value != '' ? value : defaultValue;
	}

	function Queue(lazyInstance) {
		this.lazyInstance = lazyInstance;
		this.queue = [];
		this.running = false;
		this.initTimer();
	}

	Queue.prototype = {
		add: function(element) {
			this.queue.push(element);
		},

		next: function() {
			if (this.running || this.queue.length == 0) return false;
			this.running = true;
			var element = this.queue.shift();
			if (element.isOnTop()) {
				element.forceShow();
				this.finishPosition();
				return;
			}
			element.startAnimation();
		},

		finishPosition: function() {
			this.running = false;
			this.next();
		},

		initTimer: function() {
			var self = this;

			this.timer = document.createElement('div');
			this.timer.className = 'lazy-loading-timer-element';
			document.body.appendChild(this.timer);

			this.timerCallback = function() {};
			$(this.timer).bind(transitionEndEvent, function(event) {
				self.timerCallback();
			});
			this.timer.className += ' start-timer';
		},

		startTimer: function(callback) {
			this.timerCallback = callback;
			if (this.timer.className.indexOf('start-timer') != -1) {
				this.timer.className = this.timer.className.replace(' start-timer', '');
			} else {
				this.timer.className += ' start-timer';
			}
		}
	};

	function Group(el, lazyInstance) {
		this.el = el;
		this.$el = $(el);
		this.lazyInstance = lazyInstance;
		this.elements = [];
		this.showed = false;
		this.finishedElementsCount = 0;
		this.position = {
			left: 0,
			top: 0
		};
		this.options = {
			offset: parseFloat(getElementData(el, 'llOffset', 'll-offset', 0.7)),
			itemDelay: getElementData(el, 'llItemDelay', 'll-item-delay', -1),
			isFirst: lazyInstance.hasHeaderVisuals && this.el.className.indexOf('lazy-loading-first') != -1,
			force: getElementData(el, 'llForceStart', 'll-force-start', 0) != 0,
			finishDelay: getElementData(el, 'llFinishDelay', 'll-finish-delay', 200)
		};
		this.$el.addClass('lazy-loading-before-start-animation');
	}

	timeNow = function () {
		var newDate = new Date();
		return ((newDate.getHours() < 10)?"0":"") + newDate.getHours() +":"+ ((newDate.getMinutes() < 10)?"0":"") + newDate.getMinutes() +":"+ ((newDate.getSeconds() < 10)?"0":"") + newDate.getSeconds();
	}

	Group.prototype = {
		addElement: function(element) {
			this.elements.push(element);
		},

		setElements: function(elements) {
			this.elements = elements;
		},

		getElements: function() {
			return this.elements;
		},

		getElementsCount: function() {
			return this.elements.length;
		},

		getItemDelay: function() {
			return this.options.itemDelay;
		},

		updatePosition: function() {
			this.position = $(this.el).offset();
		},

		getPosition: function() {
			return this.position;
		},

		isShowed: function() {
			return this.showed;
		},

		isVisible: function() {
			if (this.options.force) return true;
			return this.position.top + this.options.offset * this.el.offsetHeight <= this.lazyInstance.getWindowBottom();
		},

		isOnTop: function() {
			return this.position.top + this.el.offsetHeight < this.lazyInstance.getWindowBottom() - this.lazyInstance.getWindowHeight();
		},

		show: function() {
			this.lazyInstance.queue.add(this);
			this.showed = true;
		},

		forceShow: function() {
			this.showed = true;
			this.el.className = this.el.className.replace('lazy-loading-before-start-animation', 'lazy-loading-end-animation');
		},

		startAnimation: function() {
			var self = this;
			self.elements.forEach(function(element) {
				element.$el.bind(transitionEndEvent, function(event) {
					var target = event.target || event.srcElement;
					if (target != element.el) {
						return;
					}
					element.$el.unbind(transitionEndEvent);
					self.finishedElementsCount++;
					if (self.finishedElementsCount >= self.getElementsCount()) {
						var className = self.el.className
							.replace('lazy-loading-before-start-animation', '')
							.replace('lazy-loading-start-animation', 'lazy-loading-end-animation');
						self.el.className = className;
					}
				});
				element.show();
			});

			if (self.options.finishDelay > 0) {
				self.lazyInstance.queue.startTimer(function() {
					self.finishAnimation();
				});
			} else {
				self.finishAnimation();
			}

			self.$el.addClass('lazy-loading-start-animation');
		},

		finishAnimation: function() {
			this.lazyInstance.queue.finishPosition();
		}
	};

	function Element(el, group) {
		this.el = el;
		this.$el = $(el);
		this.group = group;
		this.options = {
			effect: getElementData(el, 'llEffect', 'll-effect', ''),
			delay: getElementData(el, 'llItemDelay', 'll-item-delay', group.getItemDelay()),
			actionFunction: getElementData(el, 'llActionFunc', 'll-action-func', '')
		};
		this.options.queueType = this.options.delay != -1 ? 'async' : 'sync';
		if (this.options.effect != '') {
			this.$el.addClass('lazy-loading-item-' + this.getEffectClass());
		}
	}

	Element.prototype = {
		effects: {
			action: function(element) {
				if (!element.options.actionFunction ||
						window[element.options.actionFunction] == null ||
						window[element.options.actionFunction] == undefined) {
					return;
				}
				window[element.options.actionFunction](element.el);
			}
		},

		getEffectClass: function() {
			var effectClass = this.options.effect;
			if (effectClass == 'drop-right-without-wrap' || effectClass == 'drop-right-unwrap') {
				return 'drop-right';
			}
			return effectClass;
		},

		show: function() {
			if (this.effects[this.options.effect] != undefined) {
				this.effects[this.options.effect](this);
			}
		}
	};

	LazyLoading.prototype = {
		initialize: function() {
			this.queue = new Queue(this);
			this.groups = [];
			this.hasHeaderVisuals = $('.ls-wp-container').length > 0;
			this.$checkPoint = $('#lazy-loading-point');
			if (!this.$checkPoint.length) {
				$('<div id="lazy-loading-point"></div>').insertAfter('#main');
				this.$checkPoint = $('#lazy-loading-point');
			}
			this.windowBottom = 0;
			this.windowHeight = 0;
			this.scrollHandle = false;
			$(document).ready(this.documentReady.bind(this));
		},

		documentReady: function() {
			this.updateCheckPointOffset();
			this.updateWindowHeight();
			this.buildGroups();
			this.windowScroll();
			$(window).scroll(this.windowScroll.bind(this));
			$(window).resize(this.windowResize.bind(this));
		},

		windowResize: function() {
			this.updateWindowHeight();
			this.updateGroups();
			this.windowScroll();
		},

		buildGroups: function() {
			var self = this;
			self.groups = [];

			$('.lazy-loading').each(function() {
				var group = new Group(this, self);
				group.updatePosition();
				$('.lazy-loading-item', this).each(function() {
					group.addElement(new Element(this, group));
				});
				if (group.getElementsCount() > 0) {
					self.groups.push(group);
				}
			});
		},

		updateGroups: function() {
			var self = this;
			self.groups.forEach(function(group) {
				if (group.isShowed()) {
					return;
				}
				group.updatePosition();
			});
		},

		windowScroll: function() {
			if (this.scrollHandle) {
				//return;
			}
			this.scrollHandle = true;
			this.calculateWindowBottom();
			if (this.isGroupsPositionsChanged()) {
				this.updateGroups();
			}
			this.groups.forEach(function(group) {
				if (group.isShowed()) {
					return;
				}
				if (group.isOnTop()) {
					group.forceShow();
				}
				if (group.isVisible()) {
					group.show();
				}
			});
			this.scrollHandle = false;
			this.queue.next();
		},

		calculateWindowBottom: function() {
			this.windowBottom = $(window).scrollTop() + this.windowHeight;
		},

		getWindowBottom: function() {
			return this.windowBottom;
		},

		updateWindowHeight: function() {
			this.windowHeight = $(window).height();
		},

		getWindowHeight: function() {
			return this.windowHeight;
		},

		updateCheckPointOffset: function() {
			this.checkPointOffset = this.$checkPoint.offset().top;
		},

		isGroupsPositionsChanged: function() {
			var oldCheckPointOffset = this.checkPointOffset;
			this.updateCheckPointOffset();
			return Math.abs(this.checkPointOffset - oldCheckPointOffset) > 1;
		},

		getLastGroup: function() {
			if (!this.groups.length) {
				return null;
			}
			return this.groups[this.groups.length - 1];
		}
	};

	function LazyLoading(options) {
		this.options = {};
		$.extend(this.options, options);
		this.initialize();
	}

	$.lazyLoading = function(options) {
		return new LazyLoading(options);
	}

})(jQuery);

/*
     FILE ARCHIVED ON 18:32:43 Nov 21, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 04:25:46 Jan 14, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 353.999 (3)
  esindex: 0.011
  captures_list: 385.658
  CDXLines.iter: 17.689 (3)
  PetaboxLoader3.datanode: 171.189 (4)
  exclusion.robots: 1.343
  exclusion.robots.policy: 1.327
  RedisCDXSource: 7.827
  PetaboxLoader3.resolve: 57.146
  load_resource: 168.848
*/