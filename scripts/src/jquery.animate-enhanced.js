/*
jquery.animate-enhanced plugin v0.91
---
http://github.com/benbarnett/jQuery-Animate-Enhanced
http://benbarnett.net
@benpbarnett
---
Copyright (c) 2012 Ben Barnett

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
---
Extends jQuery.animate() to automatically use CSS3 transformations where applicable.
Tested with jQuery 1.3.2+

Supports -moz-transition, -webkit-transition, -o-transition, -ms-transition, transition
Supports -moz-transform, -webkit-transform, -o-transform, -ms-transform, transform

Targetted properties (for now):
	- position: left, top, right, bottom
	- opacity
	- width
	- height
	- margin: margin-left, margin-right, margin-top, margin-bottom

Usage (exactly the same as it would be normally):

	jQuery(element).animate({left: 200},  500, function() {
		// callback
	});

Changelog:
	0.92 (17/5/2012):
		- Added support for translation when usign the raw css method (i.e. {top:10px,left:10px} -> translate(10px, 10px)
		- Added support for the delay method (uses the transition-delay property)
		- Added better defaults support
		- Assure all calls to original methods are done with all arguments (since it may not be the original one)
		- Merge pull from lelolo (unit management)
		- Merge pull from klarstil (show and hide shortcut)
		- Merge pull from amercier (new animatable properties and big fixes with floats)
		- Merge pull from caseycorcorcan (speed object)
		- Merge pull from snaver (slide test)

	0.91 (2/4/2012):
		- Merge Pull Request #74 - Unit Management

	0.90 (7/3/2012):
		- Adding public $.toggleDisabledByDefault() feature to disable entire plugin by default (Issue #73)

	0.89 (24/1/2012):
		- Adding 'avoidCSSTransitions' property. Set to true to disable entire plugin. (Issue #47)

	0.88 (24/1/2012):
		- Fix Issue #67 for HighchartsJS compatibility

	0.87 (24/1/2012):
		- Fix Issue #66 selfCSSData.original is undefined

	0.86 (9/1/2012):
		- Strict JS fix for undefined variable

	0.85 (20/12/2011):
		- Merge Pull request #57 from Kronuz
		- Codebase cleaned and now passes jshint.
		- Fixed a few bugs (it now saves and restores the original css transition properties).
		- fadeOut() is fixed, it wasn't restoring the opacity after hiding it.

	0.80 (13/09/2011):
		- Issue #28 - Report $(el).is(':animated') fix

	0.79 (06/09/2011):
		- Issue #42 - Right negative position animation: please see issue notes on Github.

	0.78 (02/09/2011):
		- Issue #18 - jQuery/$ reference joys

	0.77 (02/09/2011):
		- Adding feature on Github issue #44 - Use 3D Transitions by default

	0.76 (28/06/2011):
		- Fixing issue #37 - fixed stop() method (with gotoEnd == false)

	0.75 (15/06/2011):
		- Fixing issue #35 to pass actual object back as context for callback

	0.74 (28/05/2011):
		- Fixing issue #29 to play nice with 1.6+

	0.73 (05/03/2011):
		- Merged Pull Request #26: Fixed issue with fadeOut() / "hide" shortcut

	0.72 (05/03/2011):
		- Merged Pull Request #23: Added Penner equation approximations from Matthew Lein's Ceaser, and added failsafe fallbacks

	0.71 (05/03/2011):
		- Merged Pull Request #24: Changes translation object to integers instead of strings to fix relative values bug with leaveTransforms = true

	0.70 (17/03/2011):
		- Merged Pull Request from amlw-nyt to add bottom/right handling

	0.68 (15/02/2011):
		- width/height fixes & queue issues resolved.

	0.67 (15/02/2011):
		- Code cleanups & file size improvements for compression.

	0.66 (15/02/2011):
		- Zero second fadeOut(), fadeIn() fixes

	0.65 (01/02/2011):
		- Callbacks with queue() support refactored to support element arrays

	0.64 (27/01/2011):
		- BUGFIX #13: .slideUp(), .slideToggle(), .slideDown() bugfixes in Webkit

	0.63 (12/01/2011):
		- BUGFIX #11: callbacks not firing when new value == old value

	0.62 (10/01/2011):
		- BUGFIX #11: queue is not a function issue fixed

	0.61 (10/01/2011):
		- BUGFIX #10: Negative positions converting to positive

	0.60 (06/01/2011):
		- Animate function rewrite in accordance with new queue system
		- BUGFIX #8: Left/top position values always assumed relative rather than absolute
		- BUGFIX #9: animation as last item in a chain - the chain is ignored?
		- BUGFIX: width/height CSS3 transformation with left/top working

	0.55 (22/12/2010):
		- isEmptyObject function for <jQuery 1.4 (requires 1.3.2)

	0.54a (22/12/2010):
		- License changed to MIT (http://www.opensource.org/licenses/mit-license.php)

	0.54 (22/12/2010):
		- Removed silly check for 'jQuery UI' bailouts. Sorry.
		- Scoping issues fixed - Issue #4: $(this) should give you a reference to the selector being animated.. per jquery's core animation funciton.

	0.53 (17/11/2010):
		- New $.translate() method to easily calculate current transformed translation
		- Repeater callback bug fix for leaveTransforms:true (was constantly appending properties)

	0.52 (16/11/2010):
		- leaveTransforms: true bug fixes
		- 'Applying' user callback function to retain 'this' context

	0.51 (08/11/2010):
		- Bailing out with jQuery UI. This is only so the plugin plays nice with others and is TEMPORARY.

	0.50 (08/11/2010):
		- Support for $.fn.stop()
		- Fewer jQuery.fn entries to preserve namespace
		- All references $ converted to jQuery
		- jsDoc Toolkit style commenting for docs (coming soon)

	0.49 (19/10/2010):
		- Handling of 'undefined' errors for secondary CSS objects
		- Support to enhance 'width' and 'height' properties (except shortcuts involving jQuery.fx.step, e.g slideToggle)
		- Bugfix: Positioning when using avoidTransforms: true (thanks Ralf Santbergen reports)
		- Bugfix: Callbacks and Scope issues

	0.48 (13/10/2010):
		- Checks for 3d support before applying

	0.47 (12/10/2010);
		- Compatible with .fadeIn(), .fadeOut()
		- Use shortcuts, no duration for jQuery default or "fast" and "slow"
		- Clean up callback event listeners on complete (preventing multiple callbacks)

	0.46 (07/10/2010);
		- Compatible with .slideUp(), .slideDown(), .slideToggle()

	0.45 (06/10/2010):
		- 'Zero' position bug fix (was originally translating by 0 zero pixels, i.e. no movement)

	0.4 (05/10/2010):
		- Iterate over multiple elements and store transforms in jQuery.data per element
		- Include support for relative values (+= / -=)
		- Better unit sanitization
		- Performance tweaks
		- Fix for optional callback function (was required)
		- Applies data[translateX] and data[translateY] to elements for easy access
		- Added 'easeInOutQuint' easing function for CSS transitions (requires jQuery UI for JS anims)
		- Less need for leaveTransforms = true due to better position detections
*/

(function(jQuery, originalAnimateMethod, originalStopMethod, originalCssMethod, originalDelayMethod, undefined) {

	// use script parser rules: creates better code
	"use strict";
	
	// ----------
	// Plugin variables
	// ----------
	var	// make this public and extendable
		cssTransitionProperties = 'top right bottom left opacity height width margin-left margin-right margin-top margin-bottom border-left border-right border-top border-bottom padding-left padding-right padding-top padding-bottom'.split(' '),
		directions = 'top right bottom left'.split(' '),
		noUnitProperties = 'opacity'.split(' '),
		cssPrefixes = ['', '-webkit-', '-moz-', '-o-', '-ms-'],
		pluginOptions = ['avoidTransforms', 'useTranslate3d', 'leaveTransforms', 'avoidCSSTransitions'],
		
		rfxnum = /^([+-]=)?([\d+-.]+)(.*)$/,
		rupper = /([A-Z])/g,
		defaultEnhanceData = {
			secondary: {},
			meta: {
				top : 0,
				right : 0,
				bottom : 0,
				left : 0
			}
		},
		// Constants 
		DATA_KEY = 'jQe',
		CUBIC_BEZIER_OPEN = 'cubic-bezier(',
		CUBIC_BEZIER_CLOSE = ')',
		// make this public and extendable
		easings = {
			bounce: CUBIC_BEZIER_OPEN + '0.0, 0.35, .5, 1.3' + CUBIC_BEZIER_CLOSE,
			linear: 'linear',
			swing: 'ease-in-out',
			ease: 'ease', // (0.25, 0.1, 0.25, 1.0)
			easeIn: 'ease-in', // (0.42, 0, 1.0, 1.0)
			easeOut: 'ease-out', // (0, 0, 0.58, 1.0),
			easeInOut: 'ease-in-out', // (0.42, 0, 0.58, 1.0)

			// Penner equation approximations from Matthew Lein's Ceaser: http://matthewlein.com/ceaser/
			easeInQuad:     CUBIC_BEZIER_OPEN + '0.550, 0.085, 0.680, 0.530' + CUBIC_BEZIER_CLOSE,
			easeInCubic:    CUBIC_BEZIER_OPEN + '0.550, 0.055, 0.675, 0.190' + CUBIC_BEZIER_CLOSE,
			easeInQuart:    CUBIC_BEZIER_OPEN + '0.895, 0.030, 0.685, 0.220' + CUBIC_BEZIER_CLOSE,
			easeInQuint:    CUBIC_BEZIER_OPEN + '0.755, 0.050, 0.855, 0.060' + CUBIC_BEZIER_CLOSE,
			easeInSine:     CUBIC_BEZIER_OPEN + '0.470, 0.000, 0.745, 0.715' + CUBIC_BEZIER_CLOSE,
			easeInExpo:     CUBIC_BEZIER_OPEN + '0.950, 0.050, 0.795, 0.035' + CUBIC_BEZIER_CLOSE,
			easeInCirc:     CUBIC_BEZIER_OPEN + '0.600, 0.040, 0.980, 0.335' + CUBIC_BEZIER_CLOSE,
			easeInBack:     CUBIC_BEZIER_OPEN + '0.600, -0.280, 0.735, 0.045' + CUBIC_BEZIER_CLOSE,
			easeOutQuad:    CUBIC_BEZIER_OPEN + '0.250, 0.460, 0.450, 0.940' + CUBIC_BEZIER_CLOSE,
			easeOutCubic:   CUBIC_BEZIER_OPEN + '0.215, 0.610, 0.355, 1.000' + CUBIC_BEZIER_CLOSE,
			easeOutQuart:   CUBIC_BEZIER_OPEN + '0.165, 0.840, 0.440, 1.000' + CUBIC_BEZIER_CLOSE,
			easeOutQuint:   CUBIC_BEZIER_OPEN + '0.230, 1.000, 0.320, 1.000' + CUBIC_BEZIER_CLOSE,
			easeOutSine:    CUBIC_BEZIER_OPEN + '0.390, 0.575, 0.565, 1.000' + CUBIC_BEZIER_CLOSE,
			easeOutExpo:    CUBIC_BEZIER_OPEN + '0.190, 1.000, 0.220, 1.000' + CUBIC_BEZIER_CLOSE,
			easeOutCirc:    CUBIC_BEZIER_OPEN + '0.075, 0.820, 0.165, 1.000' + CUBIC_BEZIER_CLOSE,
			easeOutBack:    CUBIC_BEZIER_OPEN + '0.175, 0.885, 0.320, 1.275' + CUBIC_BEZIER_CLOSE,
			easeInOutQuad:  CUBIC_BEZIER_OPEN + '0.455, 0.030, 0.515, 0.955' + CUBIC_BEZIER_CLOSE,
			easeInOutCubic: CUBIC_BEZIER_OPEN + '0.645, 0.045, 0.355, 1.000' + CUBIC_BEZIER_CLOSE,
			easeInOutQuart: CUBIC_BEZIER_OPEN + '0.770, 0.000, 0.175, 1.000' + CUBIC_BEZIER_CLOSE,
			easeInOutQuint: CUBIC_BEZIER_OPEN + '0.860, 0.000, 0.070, 1.000' + CUBIC_BEZIER_CLOSE,
			easeInOutSine:  CUBIC_BEZIER_OPEN + '0.445, 0.050, 0.550, 0.950' + CUBIC_BEZIER_CLOSE,
			easeInOutExpo:  CUBIC_BEZIER_OPEN + '1.000, 0.000, 0.000, 1.000' + CUBIC_BEZIER_CLOSE,
			easeInOutCirc:  CUBIC_BEZIER_OPEN + '0.785, 0.135, 0.150, 0.860' + CUBIC_BEZIER_CLOSE,
			easeInOutBack:  CUBIC_BEZIER_OPEN + '0.680, -0.550, 0.265, 1.550' + CUBIC_BEZIER_CLOSE
		},
	
	
	// ----------
	// Check if this browser supports CSS3 transitions
	// ----------
		thisBody = document.body || document.documentElement,
		thisStyle = thisBody.style,
		transitionEndEvent = (thisStyle.WebkitTransition !== undefined) ? 'webkitTransitionEnd' : (thisStyle.OTransition !== undefined) ? 'oTransitionEnd' : 'transitionend',
		cssTransitionsSupported = thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.OTransition !== undefined || thisStyle.transition !== undefined,
		cssTransformSupported = thisStyle.WebkitTransform !== undefined || thisStyle.MozTransform !== undefined || thisStyle.OTransform !== undefined || thisStyle.transform !== undefined,
		has3D = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()),
		use3DByDefault = has3D;



	// ----------
	// Extended :animated filter
	// ----------
	if ( jQuery.expr && jQuery.expr.filters ) {
		var originalAnimatedFilter = jQuery.expr.filters.animated;
		jQuery.expr.filters.animated = function(elem) {
			return jQuery(elem).data('events') && jQuery(elem).data('events')[transitionEndEvent] ? true : originalAnimatedFilter.call(this, elem);
		};
	}
	
	// patching older version of jquery
	function _isNumeric(val) {
		var isNum = false;
		if (jQuery.isFunction(jQuery.isNumeric)) {
			isNum = jQuery.isNumeric(val);
		} else if (jQuery.isFunction(jQuery.isNaN)) {
			isNum = !jQuery.isNaN(val);
		} else {
			isNum = val !== true && val !== false && val != null && !window.isNaN(val);
		}
		
		return isNum;
	};


	/**
		@private
		@name _getCssUnit
		@function
		@description Return unit value ("px", "%", "em" for re-use correct one when translating)
		@param {variant} [val] Target value
	*/
	function _getCssUnit(val, prop){
		if (val === undefined || val === null || val === false || val === true) {
			return ''; // no unit for all of this
		}
		
		var unit = _isNumeric(val) ? '' : (val+'').match(/\D+$/);//
		
		if (!!prop && !!~jQuery.inArray(prop, noUnitProperties)) {
			return ''; // no values for things like opacity
		}
		
		return (!unit || unit == 'show' || unit == 'hide' || unit == 'toggle')?'px':unit[0];
	};
	var _getUnit = _getCssUnit;
	
	/**
	 * @private
	 * @param css - The css properties to be animated
	 * @returns object
	 */
	function _createPNP(css) {
		var g = {
			original: css,
			p: {},
			np: {}
		},
		i = null;
		for (i in css) {
			if (_isSupportedProperty(i)) {
				// add supported property to p
				g.p[i] = css[i];
			} else if (!_isOptionProperty(i)) {
				// add not supported property to np
				g.np[i] = css[i];
			}
		}
		return g;
	};


	/**
		@private
		@name _interpretValue
		@function
		@description Interpret value ("px", "+=" and "-=" sanitisation)
		@param {object} [element] The Element for current CSS analysis
		@param {variant} [val] Target value
		@param {string} [prop] The property we're looking at
		@param {boolean} [isTransform] Is this a CSS3 transform?
	*/
	function _interpretValue(e, val, prop, isTransform) {
		// this is a nasty fix, but we check for prop == 'd' to see if we're dealing with SVG, and abort
		if (prop == "d") return false;
		
		var parts = _isNumeric(val) ? false : rfxnum.exec(val), //
			start = e.css(prop) === 'auto' ? 0 : parseFloat(e.css(prop),10),
			cleanCSSStart = typeof start == 'string' ? _cleanValue(start) : start,
			cleanTarget = typeof val == 'string' ? _cleanValue(val) : val,
			cleanStart = {
				value: cleanTarget,  //isTransform === true ? 0 : cleanCSSStart,
				unit: _getUnit(start, prop)
			},
			hidden = e.is(':hidden'),
			translation = e.translation();

		if (prop == 'left') cleanStart.value = parseFloat(cleanCSSStart, 10) + translation.x;
		else if (prop == 'right') cleanStart.value = parseFloat(cleanCSSStart, 10) + translation.x;
		else if (prop == 'top') cleanStart.value = parseFloat(cleanCSSStart, 10) + translation.y;
		else if (prop == 'bottom') cleanStart.value = parseFloat(cleanCSSStart, 10) + translation.y;

		// deal with shortcuts
		if(!parts) {
			if(val === 'show') {
				cleanStart.value = 1;
				/*if (hidden) {
					e.css({'display':'block', 'opacity': cleanStart.value, avoidCSSTransitions: true});
				}*/
			} else if (val == 'hide') {
				cleanStart.value = 0;
			}
			
		} else {
			var end = parseFloat(parts[2], 10);

			// If a +=/-= token was provided, we're doing a relative animation
			if (!!parts[1]) {
				cleanStart.value = ((parts[1] === '-=' ? -1 : 1) * end) + parseFloat(cleanStart.value, 10);
			}
		}
		return cleanStart;
	};

	/**
		@private
		@name _getTranslation
		@function
		@description Make a translate or translate3d string
		@param {integer} [x]
		@param {integer} [y]
		@param {integer} [z]
		@param {boolean} [use3D] Use translate3d if available?
		@param {integer} [xUnit]
		@param {integer} [yUnit]
		@param {integer} [zUnit]
	*/
	function _getTranslation(x, y, z, use3D, xUnit, yUnit, zUnit) {
		// assure unit value
		xUnit = xUnit || 'px'; // unit must be present, event if it's 0 (bug in Chrome)
		yUnit = yUnit || xUnit;
		zUnit = zUnit || xUnit;
		// assure values with units
		x = x + xUnit;
		y = y + yUnit;
		z = z + zUnit;
		
		// fix here, since this variable will disapear
		use3DByDefault = jQuery.fn.animate.defaults.useTranslate3d;
		
		var _3D = (has3D && (use3D === true || (use3DByDefault === true && use3D !== false))),
			prefix = (_3D ? '3d(' : '('),
			suffix = (_3D ? ',' + z + ')' : ')');
		
		return 'translate' + prefix + x + ',' + y + suffix;
	};


	/**
		@private
		@name _applyCSSTransition
		@function
		@description Build up the CSS object
		@param {object} [e] Element
		@param {string} [property] Property we're dealing with
		@param {integer} [duration] Duration
		@param {string} [easing] Easing function
		@param {variant} [value] String/integer for target value
		@param {boolean} [isTransform] Is this a CSS transformation?
		@param {boolean} [isTranslatable] Is this a CSS translation?
		@param {boolean} [use3D] Use translate3d if available?
	*/
	function _applyCSSTransition(e, property, duration, easing, value, unit, isTransform, isTranslatable, use3D) {
		var eCSSData = e.data(DATA_KEY),
			enhanceData = eCSSData && !_isEmptyObject(eCSSData) ? eCSSData : jQuery.extend(true, {}, defaultEnhanceData),
			offsetPosition = value,
			isDirection = _isDirection(property);

		if (isDirection && isTranslatable) {
			var meta = enhanceData.meta,
				cleanPropertyValue = _cleanValue(e.css(property)) || 0,
				stashedProperty = property + '_o';

			offsetPosition = value - cleanPropertyValue;

			meta[property] = offsetPosition;
			meta[stashedProperty] = e.css(property) == 'auto' ? 0 + offsetPosition : cleanPropertyValue + offsetPosition || 0;
			enhanceData.meta = meta;

			// fix 0 issue (transition by 0 = nothing)
			if (Math.abs(offsetPosition) < 1) {
				offsetPosition = 0;
			}
		}

		// reapply data and return
		return e.data(DATA_KEY, _applyCSSWithPrefix(e, enhanceData, property, duration, easing, offsetPosition, unit, isTransform, isTranslatable, use3D));
	};

	/**
		@private
		@name _applyCSSWithPrefix
		@function
		@description Helper function to build up CSS properties using the various prefixes
		@param {object} [cssProperties] Current CSS object to merge with
		@param {string} [property]
		@param {integer} [duration]
		@param {string} [easing]
		@param {variant} [value]
		@param {boolean} [isTransform] Is this a CSS transformation?
		@param {boolean} [isTranslatable] Is this a CSS translation?
		@param {boolean} [use3D] Use translate3d if available?
	*/
	function _applyCSSWithPrefix(e, cssProperties, property, duration, easing, value, unit, isTransform, isTranslatable, use3D) {
		var saveOriginal = false,
			transform = isTransform === true && isTranslatable === true;

		cssProperties = cssProperties || {};
		if (!cssProperties.original) {
			cssProperties.original = {
				avoidCSSTransitions:true
			};
			saveOriginal = true;
		}
		
		// assure default objects
		cssProperties.meta = cssProperties.meta || {};
		cssProperties.properties = cssProperties.properties || {avoidCSSTransitions:true};
		cssProperties.secondary = cssProperties.secondary || {avoidCSSTransitions:true};

		var meta = cssProperties.meta,
			original = cssProperties.original,
			properties = cssProperties.properties,
			secondary = cssProperties.secondary;

		for (var i = cssPrefixes.length - 1; i >= 0; i--) {
			var tp = cssPrefixes[i] + 'transition-property',
				td = cssPrefixes[i] + 'transition-duration',
				tf = cssPrefixes[i] + 'transition-timing-function';

			var cssProperty = (transform ? cssPrefixes[i] + 'transform' : property);

			if (saveOriginal) {
				original[tp] = e.css(tp) || 'none';
				original[td] = e.css(td) || '0s';
				original[tf] = e.css(tf) || 'linear';
			}

			//secondary[cssProperty] = transform ? _getTranslation(meta.left, meta.top, use3D) : value; 
			secondary[cssProperty] = transform ? _getTranslation(
											property === 'left' ? meta.left || 0 : -meta.right, 
											property === 'top' ? meta.top || 0 : -meta.bottom, 
											0, use3D, unit) : value;

			properties[tp] = (properties[tp] ? properties[tp] + ',' : '') + cssProperty;
			properties[td] = (properties[td] ? properties[td] + ',' : '') + duration + 'ms';
			properties[tf] = (properties[tf] ? properties[tf] + ',' : '') + easing;
		}

		return cssProperties;
	};

	/**
		@private
		@name _isBoxShortcut
		@function
		@description Shortcut to detect if we need to step away from slideToggle, CSS accelerated transitions (to come later with fx.step support)
		@param {object} [prop]
	*/
	function _isBoxShortcut(prop) {
		for (var property in prop) {
			if ((property == 'width' || property == 'height') && (prop[property] == 'show' || prop[property] == 'hide' || prop[property] == 'toggle')) {
				return true;
			}
		}
		return false;
	};
	
	/**
		@private
		@name _isOpacityShortcut
		@function
		@description Shortcut to detect if we need to step away from fadeToggle/In/Out, CSS accelerated transitions (to come later with fx.step support)
		@param {object} [prop]
	*/
	function _isOpacityShortcut(prop) {
		for (var property in prop) {
			if ((property == 'opacity') && (prop[property] == 'show' || prop[property] == 'hide' || prop[property] == 'toggle')) {
				return true;
			}
		}
		return false;
	};


	/**
		@private
		@name _isEmptyObject
		@function
		@description Check if object is empty (<1.4 compatibility)
		@param {object} [obj]
	*/
	function _isEmptyObject(obj) {
		if (typeof obj !== 'object') {
			return false;
		}
		for (var i in obj) {
			return false;
		}
		return true;
	};


	/**
		@private
		@name _getCssValue
		@function
		@description Remove 'px' and other artifacts
		@param {variant} [val]
	*/
	function _getCssValue(val) {
		if (val === undefined || val === null || val === true || val === false) {
			return val; // always return boolean and null values
		}
		var v = _isNumeric(val) ? val : (val+'').replace(/-=|\+=|px$|em$|%$|pt$|s$|ms$|min$/gi, ''); //
		
		return _isNumeric(v) ? parseFloat(v,10) : val; //
	};
	var _cleanValue = _getCssValue;
	
	
	/**
		@private
		@name _getCssModifier
		@function
		@description Isolate +=/-= artifacts
		@param {variant} [val]
	*/
	function _getCssModifier(val) {
		if (_isNumeric(val)/*//*/ || val === undefined || val === null || val === true || val === false) {
			return ''; // always return boolean, null and numeric values
		}
		var mod = !!~val.indexOf('-=') ? '-=' : 
				  !!~val.indexOf('+=') ? '+=' : ''; 
			
		return mod;
	};
	
	function _parseCssValue(input,prop) {
		if (input == undefined || input === '' || prop == undefined || prop === '') {
			return null;
		}
		var val = {
			value: _getCssValue(input),
			modifier: _getCssModifier(input),
			unit: _getCssUnit(input, prop)
		};
		
		return val;
	};
	
	/**
	 * Parse the input duration and returns it's int value in ms
	 * @private
	 * @param duration
	 * @returns int
	 */
	function _parseDuration(duration) {
		if (!_isNumeric(duration)/*//*/ && jQuery.type(duration) != 'string') {
			return 0;
		}
		var value = _getCssValue(duration),
			unit = _getCssUnit(duration);
		
		if (unit == 'min') {
			value *= (60 * 1000);
		} else if (unit == 's') {
			value *= 1000;
		} else if (value < 0) {
			value = 0;
		}
		return parseInt(value, 10);
	};


	/**
		@private
		@name _appropriateProperty
		@function
		@description Function to check if property should be handled by plugin
		@param {string} [prop]
		@param {variant} [value]
		@deprecated
	*/
	function _appropriateProperty(prop, value, element) {
		var is = jQuery.inArray(prop, cssTransitionProperties) > -1;
		if ((prop == 'width' || prop == 'height') && (value === parseFloat(element.css(prop)))) is = false;
		return is;
	};
	function _isSupportedProperty(prop) {
		return !!~jQuery.inArray(prop, cssTransitionProperties);
	};
	
	/**
		@private
		@name _appropriateEasing
		@function
		@description Function to check if easing should be handled by plugin
		@param {string} [easing]
	 */
	function _appropriateEasing(easing, element) {
		return easing in easings;
	};


	jQuery.extend({
		/**
			@public
			@name toggle3DByDefault
			@function
			@description Toggle for plugin settings to automatically use translate3d (where available). Usage: $.toggle3DByDefault
		*/
		toggle3DByDefault: function() {
			return use3DByDefault = !use3DByDefault;
		},
		
		
		/**
			@public
			@name toggleEnabledByDefault
			@function
			@description Toggle the plugin to be disabled by default (can be overridden per animation with avoidCSSTransitions)
		*/
		toggleDisabledByDefault: function() {
			return jQuery.fn.animate.avoidCSSTransitions = !jQuery.fn.animate.avoidCSSTransitions; //pluginDisabledDefault = !pluginDisabledDefault;
		}
	});


	/**
		@public
		@name translation
		@function
		@description Get current X and Y translations
	*/
	jQuery.fn.translation = function() {
		if (!this[0]) {
			return null;
		}

		var	elem = this[0],
			cStyle = window.getComputedStyle(elem, null),
			translation = {
				x: 0,
				y: 0
			};

		if (cStyle) {
			for (var i in cssPrefixes) {
				var transform = cStyle.getPropertyValue(cssPrefixes[i] + 'transform');
				if (!!transform && (/matrix/i).test(transform)) {
					var explodedMatrix = transform.replace(/^matrix\(/i, '').split(/, |\)$/g);
					translation = {
						x: parseFloat(explodedMatrix[4], 10),
						y: parseFloat(explodedMatrix[5], 10)
					};

					break;
				}
			}
		}

		return translation;
	};

	function _isOptionProperty(p) {
		return !!~jQuery.inArray(p, pluginOptions);
	};
	
	function _assureDefault(props, prop) {
		return props != undefined && props[prop] != undefined ? !!props[prop] : !!jQuery.fn.animate.defaults[prop];
	};
	
	function _isDirection(p) {
		return !!~jQuery.inArray(p, directions);
	};
	
	function _hasDirection(p) {
		if (!p || !jQuery.isPlainObject(p)) {
			return false;
		}
		for (var i in p) {
			if (_isDirection(i)) {
				return true;
			}
		}
		return false;
	};


	/**
		@public
		@name jQuery.fn.animate
		@function
		@description The enhanced jQuery.animate function
		@param {string} [property]
		@param {string} [speed]
		@param {string} [easing]
		@param {function} [callback]
	*/
	jQuery.fn.animate = function(prop, speed, easing, callback) {
		prop = prop || {};
		
		// normalize values
		if (!_isEmptyObject(prop)) {
			prop.avoidTransforms = _assureDefault(prop, 'avoidTransforms');
			prop.leaveTransforms = _assureDefault(prop, 'leaveTransforms');
			prop.avoidCSSTransitions = _assureDefault(prop, 'avoidCSSTransitions');
			prop.useTranslate3d = _assureDefault(prop, 'useTranslate3d');
		}

		var isTranslatable = _hasDirection(prop),
			optall = jQuery.isPlainObject(speed) ? speed : jQuery.speed(speed, easing, callback),
			elements = this,
			callbackQueue = 0,
			propertyCallback = function() {
				callbackQueue--;
				if (callbackQueue === 0) {
					// we're done, trigger the user callback
					if (typeof optall.complete === 'function') {
						optall.complete.apply(elements[0], arguments);
					}
				}
			};

		if (prop.avoidCSSTransitions === true || !cssTransitionsSupported || _isEmptyObject(prop) || _isBoxShortcut(prop) || optall.duration <= 0) {
			return originalAnimateMethod.apply(this, arguments);
		}

		return this[ optall.queue === true ? 'queue' : 'each' ].call(this, function() {
			var self = jQuery(this),
				opt = jQuery.extend({}, optall),
				cssCallback = function() {
					var selfCSSData = self.data(DATA_KEY) || { original: {avoidCSSTransitions: true} },
						restore = {
							avoidCSSTransitions: true
						},
						isHideOpacity = _isOpacityShortcut(prop) && prop.opacity == 'hide';

					// convert translations to left & top for layout
					if (!isHideOpacity && prop.leaveTransforms !== true) {
						for (var i = cssPrefixes.length - 1; i >= 0; i--) {
							restore[cssPrefixes[i] + 'transform'] = '';
						}
						if (isTranslatable && typeof selfCSSData.meta !== 'undefined') {
							for (var j = 0, dir; (dir = directions[j]); ++j) {
								if(dir + '_o' in selfCSSData.meta) {
									restore[dir] = selfCSSData.meta[dir + '_o'] + 'px';
								}
							}
						}
					}
					
					// remove transition timing functions
					self.
						unbind(transitionEndEvent).
						css(selfCSSData.original).
						css(restore).
						data(DATA_KEY, null);

					// if we used the fadeOut shortcut make sure elements are display:none
					if (isHideOpacity) {
						self.css({'display': 'none', avoidCSSTransitions: true});
					}

					// run the main callback function
					propertyCallback.call(self);
				},
				domProperties = {};

			// *** code starts here ***
			// seperate out the properties for the relevant animation functions
			for (var p in prop) {
				if (!_isOptionProperty(p)) {
					var isDirection = _isDirection(p),
						cleanVal = _interpretValue(self, prop[p], p, (isDirection && prop.avoidTransforms !== true));

					// assure string values are converted to values
					if (_isOpacityShortcut(prop)) {
						prop[p] = (prop[p] == 'show' ? 1 : (prop[p] == 'hide' ? 0 : prop[p]));
					}
					
					// converts marginLeft to margin-left, etc...
					var cssP = !p.match(/border|margin|padding/i) ? p : p.replace(/([A-Z])/g, function(s, group1) {
					    return '-' + group1.toLowerCase();
					});
					
					if (!!cleanVal && prop.avoidTransforms !== true && _appropriateProperty(cssP, cleanVal.value, self) /*&& _appropriateEasing(opt.easing || 'swing')*/) {
						_applyCSSTransition(
							self,
							cssP,
							opt.duration,
							easings[opt.easing || (jQuery.easing && jQuery.easing.def) || 'swing'], //? easings[opt.easing || 'swing'] : opt.easing || 'swing',
							/*isDirection && prop.avoidTransforms === true ? */ cleanVal.value, //: prop[p], //cleanVal,
							cleanVal.unit,
							isDirection && prop.avoidTransforms !== true,
							isTranslatable,
							prop.useTranslate3d === true);
					} else {
						domProperties[cssP] = prop[p];
					}
				}
			}

			// unbind any transition events
			self.unbind(transitionEndEvent);

			// get our calculated data
			var selfCSSData = self.data(DATA_KEY);

			if (selfCSSData && !_isEmptyObject(selfCSSData) && !_isEmptyObject(selfCSSData.secondary)) {
				callbackQueue++;

				self.css(selfCSSData.properties);

				// store in a var to avoid any timing issues, depending on animation duration
				var secondary = selfCSSData.secondary;

				// has to be done in a timeout to ensure transition properties are set
				setTimeout(function() {
					self.bind(transitionEndEvent, cssCallback).css(secondary);
					if (secondary.opacity == 'show') {
						self.css({'display': 'block', avoidCSSTransitions: true});
					}
				});
			}
			else {
				// it won't get fired otherwise
				opt.queue = false;
			}

			// fire up DOM based animations
			if (!_isEmptyObject(domProperties)) {
				callbackQueue++;
				originalAnimateMethod.apply(self, [domProperties, {
					duration: opt.duration,
					easing: !!jQuery.easing[opt.easing] ? opt.easing : (jQuery.easing.swing ? 'swing' : 'linear'),
					complete: propertyCallback,
					queue: opt.queue,
					step: opt.step
				}]);
			}

			// strict JS compliance
			return true;
		}); // end each/queue
	};

    jQuery.fn.animate.defaults = {
    	avoidTransforms: undefined,
    	useTranslate3d: true,
    	leaveTransforms: undefined,
    	avoidCSSTransitions: undefined,
    	_private: {
			_getCssUnit:_getCssUnit,
			_getCssValue: _getCssValue,
			_getCssModifier: _getCssModifier,
			_parseCssValue: _parseCssValue,
			_parseDuration: _parseDuration,
			
			//_interpretValue: _interpretValue,
			
			_getTranslation: _getTranslation,
			_applyCSSTransition: _applyCSSTransition,
			_applyCSSWithPrefix: _applyCSSWithPrefix,
			
			_isBoxShortcut: _isBoxShortcut,
			_isOpacityShortcut: _isOpacityShortcut,
			_isEmptyObject: _isEmptyObject,
			_appropriateProperty: _appropriateProperty,
			_appropriateEasing: _appropriateEasing,
			
			_isOptionProperty: _isOptionProperty,
			_assureDefault: _assureDefault,
			_isDirection: _isDirection,
			_hasDirection: _hasDirection,
			
			// new methods
			_createPNP: _createPNP
		}
    };


	/**
		@public
		@name jQuery.fn.stop
		@function
		@description The enhanced jQuery.stop function (resets transforms to left/top)
		@param {boolean} [clearQueue]
		@param {boolean} [gotoEnd]
		@param {boolean} [leaveTransforms] Leave transforms/translations as they are? Default: false (reset translations to calculated explicit left/top props)
	*/
	jQuery.fn.stop = function(clearQueue, gotoEnd, leaveTransforms) {
		if (!cssTransitionsSupported) {
			return originalStopMethod.apply(this, arguments);
		}
		
		leaveTransforms = _assureDefault({leaveTransforms:leaveTransforms}, 'leaveTransforms')

		// clear the queue?
		if (clearQueue) this.queue([]);

		// route to appropriate stop methods
		return this.each(function() {
			var self = jQuery(this),
				selfCSSData = self.data(DATA_KEY);

			// is this a CSS transition?
			if (selfCSSData && !_isEmptyObject(selfCSSData)) {
				var i, restore = {
						avoidCssTransitions: true
					};

				if (gotoEnd) {
					// grab end state properties
					restore = selfCSSData.secondary;

					if (!leaveTransforms && (
						selfCSSData.meta['left_o'] != undefined || 
						selfCSSData.meta['right_o'] != undefined || 
						selfCSSData.meta['top_o'] != undefined || 
						selfCSSData.meta['bottom_o'] != undefined )) {
						
						// create css object
						restore['left']   = selfCSSData.meta['left_o']   != undefined ? selfCSSData.meta['left_o']   : 'auto';
						restore['right']  = selfCSSData.meta['right_o']  != undefined ? selfCSSData.meta['right_o']  : 'auto';
						restore['top']    = selfCSSData.meta['top_o']    != undefined ? selfCSSData.meta['top_o']    : 'auto';
						restore['bottom'] = selfCSSData.meta['bottom_o'] != undefined ? selfCSSData.meta['bottom_o'] : 'auto';
						
						// remove the transformations
						for (i = cssPrefixes.length - 1; i >= 0; i--) {
							restore[cssPrefixes[i]+'transform'] = '';
						}
					}
				} else if (!_isEmptyObject(selfCSSData.secondary)) {
					var cStyle = window.getComputedStyle(self[0], null);
					if (cStyle) {
						// grab current properties
						for (var prop in selfCSSData.secondary) {
							if(selfCSSData.secondary.hasOwnProperty(prop)) {
								prop = prop.replace(rupper, '-$1').toLowerCase();
								restore[prop] = cStyle.getPropertyValue(prop);

								// is this a matrix property? extract left/right/top/bottom and apply
								if (!leaveTransforms && (/matrix/i).test(restore[prop])) {
									var explodedMatrix = restore[prop].replace(/^matrix\(/i, '').split(/, |\)$/g);
									
									var left   = self.css('left'),
										right  = self.css('right'),
										top    = self.css('top'),
										bottom = self.css('bottom');

									// apply the explicit left/right/top/bottom props
									restore['left']   = left   === 'auto' ? 'auto' : ( parseFloat(explodedMatrix[4]) + parseFloat(left))   + valUnit;//'px';
									restore['right']  = right  === 'auto' ? 'auto' : (-parseFloat(explodedMatrix[4]) + parseFloat(right))  + valUnit;//'px';
									restore['top']    = top    === 'auto' ? 'auto' : ( parseFloat(explodedMatrix[5]) + parseFloat(top))    + valUnit;//'px';
									restore['bottom'] = bottom === 'auto' ? 'auto' : (-parseFloat(explodedMatrix[5]) + parseFloat(bottom)) + valUnit;//'px';

									// remove the transformations
									for (i = cssPrefixes.length - 1; i >= 0; i--) {
										restore[cssPrefixes[i]+'transform'] = '';
									}
								}
							}
						}
					}
				}

				// remove transition timing functions
				self.
					unbind(transitionEndEvent).
					css(selfCSSData.original).
					css(restore).
					data(DATA_KEY, null);
			}
			else {
				// dom transition
				originalStopMethod.apply(self, arguments);
			}
			return true;
		});
	};
	
	
	/**
	@public
	@name jQuery.fn.delay
	@function
	@description The enhanced jQuery.delay function
	@param {int} [time]
	@param {string} [type]
	@param {boolean} [avoidCSSTransitions] flag to disable custom beahviour
	 */
	jQuery.fn.delay = function( time, type, avoidCSSTransitions ) {
		
		avoidCSSTransitions = _assureDefault({avoidCSSTransition:avoidCSSTransitions}, 'avoidCSSTransitions');
		
		// if no support for css 3, use the old method
		if (!cssTransitionsSupported || !!avoidCSSTransitions) {
			return originalDelayMethod.apply(this, arguments);
		}
		
		var t = jQuery(this), args = arguments;
		
		return t.each(function (index, elem) {
			var self = $(elem), i = null,
				// if there this element is being animated with CSS 3
				selfCSSData = self.data(DATA_KEY);

			// is this a CSS transition?
			if ( (selfCSSData && !_isEmptyObject(selfCSSData)) || type === true) {
			
				// replace the current delay call with a transition-delay in css3
				for (i in cssPrefixes) {
					self.css(cssPrefixes[i]+'transition-delay', time+'ms', true);
				}
				
				// when it's done, remove the delay since it's expired
				setTimeout(function () {
					for (var i in cssPrefixes) {
						self.css(cssPrefixes[i]+'transition-delay', '', true);
					}
				}, time+1);
			} else {
				originalDelayMethod.apply(self, args);
			}
			return true;
		});
	};

	
	/**
	@public
	@name jQuery.fn.css
	@function
	@description The enhanced jQuery.css function
	@param {string} [name]
	@param {mixed} [value]
	@param {boolean} [avoidCSSTransitions] flag to disable custom beahviour
	 */
	jQuery.fn.css = function ( name, value, avoidCSSTransitions ) {
		var i, translate, oname = name,
			hasProps = false, 
			hasExtraProps = false, isGetter = false, t = jQuery(this);
		
		// normalize input
		if (name == undefined || !jQuery.isPlainObject(name)) {
			if (value == undefined) {
				isGetter = true;
			} else {
				name = {};
				name[oname] = value;
			}
		}
		avoidCSSTransitions = avoidCSSTransitions != undefined ? avoidCSSTransitions :
							  _assureDefault(name, 'avoidCSSTransitions');
		
		if (!isGetter) {
			hasProps = _hasDirection(name);
		}
		
		// no need for our extension, call the original method
		if (isGetter || !hasProps || !!avoidCSSTransitions || !cssTransformSupported ) {
			return originalCssMethod.apply(this, arguments);
		}
		
		// detect if there is more css to set
		if (hasProps) {
			var extraCss = {
					avoidCSSTransitions: true
				};
			
			for (i in name) {
				// if i is not part of directions and it's not an option property
				if (!_isDirection(i) && !_isOptionProperty(i)) {
					hasExtraProps = true;
					extraCss[i] = name[i];
				}
			}
			
			// make sure we do not omit extra properties
			if (hasExtraProps) {
				t.css(extraCss);
			}
		}	
		
		// actual magic, for each element
		return t.each(function(index, elem) {
			
			var t = jQuery(elem);
		
			// calculate values on top left
			if (name.top == undefined) {
				if (name.bottom == undefined) {
					name.top = t.translation().y; // get the actual value
				} else {
					// calculate value based on the offset parent
					name.top = /*_getPositionElement(t).height() - t.height() */ - _cleanValue(name.bottom);
					t.css('bottom', 0, true); // let the browser know that we handle this
				}
			} else {
				if (name.bottom != undefined) {
					// since top AND bottom were specified
					// maybe animate it ?
					t.css('bottom', name.bottom, true);
				}
			}
			if (name.left == undefined) {
				if (name.right == undefined) {
					name.left = t.translation().x; // get the actual value
				} else {
					// calculate value based on the offset parent
					name.left = /*_getPositionElement(t).width() - t.width()*/ - _cleanValue(name.right);
					t.css('right', 0, true); // let the browser know that we handle this
				}
			} else {
				if (name.right != undefined) {
					t.css('right', name.right, true);
				}
			}
			
			// apply the real css 3 
			// @todo, pass unit on a value basis
			translate = _getTranslation(_cleanValue(name.left), _cleanValue(name.top), 0, has3D, _getUnit(name.left, 'left'), _getUnit(name.top, 'top'));
			
			// for every browser
			for (i in cssPrefixes) {
				t.css(cssPrefixes[i]+'transform', translate, true);
			}
			//return true;
		});
	};
	
})(jQuery, jQuery.fn.animate, jQuery.fn.stop, jQuery.fn.css, jQuery.fn.delay);
