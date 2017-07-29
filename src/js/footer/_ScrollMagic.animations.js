// Define Animations for ScrollMagic

( function( $, window, document, undefined ) {
	
	/**
	 * Define drop in animations.
	 * Can be injected with dependancy injection 
	 * when Animator is initialised.
	 *
	 * All animations should adhere to the interface
	 * (Object) getTween()     Return a TimelineMax object defining the tween of the animation.
	 * 		@param {DOMElement} element A DOM node to animate. 
	 * (Object) getOptions()   Return an options object defining the tween.
	 */

	/**
	 * Define fade in animation
	 */
	var FadeIn = function( element ) {
		var _ = this;

		_.element = element;
		_.duration = 1;
		_.ease = Expo.easeInOut;
	};

	FadeIn.prototype.getTween = function() {
		var _ = this;

		return new TimelineMax().from(
			_.element,
			_.duration,
			_.getOptions()
		);
	};

	FadeIn.prototype.getOptions = function() {
		var _ = this;

		return {
			opacity: 0,
			ease: _.ease
		};
	};

	/**
	 * Define slide in from bottom animation
	 */
	var SlideInBottom = function( element ) {
		var _ = this;

		_.element = element;
		_.duration = 1;
	};

	SlideInBottom.prototype.getTween = function() {
		var _ = this;

		return new TimelineMax().from(
			_.element,
			_.duration,
			_.getOptions()
		);
	};

	SlideInBottom.prototype.getOptions = function() {
		var _ = this;

		return {
			opacity: 0,
			y: "+=200"
		};
	};

	/**
	 * Define slide in from left animation
	 */
	var SlideInLeft = function( element ) {
		var _ = this;

		_.element = element;
		_.duration = 2;
		_.ease = Expo.easeOut;
	};

	SlideInLeft.prototype.getTween = function() {
		var _ = this;

		return new TimelineMax().from(
			_.element,
			_.duration,
			_.getOptions()
		);
	};

	SlideInLeft.prototype.getOptions = function() {
		var _ = this;

		return {
			opacity: 0,
			x: "-=200",
			ease: _.ease
		};
	};
	
	/**
	 * Define slide in from left animation
	 */
	var SlideInRight = function( element ) {
		var _ = this;

		_.element = element;
		_.duration = 2;
		_.ease = Expo.easeOut;
	};

	SlideInRight.prototype.getTween = function() {
		var _ = this;

		return new TimelineMax().from(
			_.element,
			_.duration,
			_.getOptions()
		);
	};

	SlideInRight.prototype.getOptions = function() {
		var _ = this;

		return {
			opacity: 0,
			x: "+=200",
			ease: _.ease
		};
	};
	

	// Expose globally
	window.ScrollMagicAnimations = {
		FadeIn: FadeIn,
		SlideInBottom: SlideInBottom,
		SlideInLeft: SlideInLeft,
		SlideInRight: SlideInRight
	};

} )( jQuery, window, document );
