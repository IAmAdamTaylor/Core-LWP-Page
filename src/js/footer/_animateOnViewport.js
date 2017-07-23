// Animate on entering viewport library

( function( $, window, document, undefined ) {
	
	/**
	 * Define a fade in animation.
	 */
	var FadeInAnimation = function() {
		var _ = this;

		// Initial and final property changes
		// Opacity
		_.initial = 0;
		_.final = 1;
	};

	FadeInAnimation.prototype.getPartial = function( percent ) {
		var _ = this,
				// Get the current position between the initial and final states
				currentAmount = ( ( _.final - _.initial ) * percent ) + _.initial;

		// Limit currentAmount to final
		currentAmount = Math.min( currentAmount, _.final );

		// Return as a series of properties to apply to transform
		return {
			opacity: currentAmount
		};
	};

	/**
	 * Define a slide in animation.
	 * @param {String} direction The direction the element should slide.
	 */
	var SlideInAnimation = function( direction ) {
		var _ = this;

		direction = direction || 'right';

		if ( 'right' !== direction && 'left' !== direction ) {
			direction = 'right';
		}

		_.direction = direction;

		// Initial and final property changes
		// translateX

		if ( 'right' === direction ) {

			_.initial = 90;

		} else if ( 'left' === direction ) {

			_.initial = -90;

		}

		_.final = 0;
	};

	SlideInAnimation.prototype.getPartial = function( percent ) {
		var _ = this,
				// Get the current position between the initial and final states
				currentAmount = ( ( _.final - _.initial ) * percent ) + _.initial;

		// Limit currentAmount to final
		if ( 
			( 'right' === _.direction && currentAmount > _.final ) &&
			( 'left' === _.direction && currentAmount < _.final )
		) {
			currentAmount = _.final;
		} 

		// Return as a series of properties to apply to transform
		return {
			'-webkit-transform': 'translateX(' + currentAmount + 'px)',
			'-ms-transform': 'translateX(' + currentAmount + 'px)',
			transform: 'translateX(' + currentAmount + 'px)'
		};
	};

	/**
	 * Define an interface for an element which will animate.
	 * @param {jQuery} $element  The element to animate.
	 * @param {Object} animation An instance of one of the animation classes above, dependency injected.
	 */
	var Animator = function( $element, animation ) {
		var _ = this;

		_.$element = $element;
		_.animation = animation;

		// The amount the animation should be offset by
		_.scrollOffset = Math.max( windowWidth() * 0.1, 80 );

		_._setInitial()._bindEvents().requestAnimationFrame();
	};

	Animator.prototype._setInitial = function() {
		var _ = this;

		_.$element.css( _.animation.getPartial( 0 ) );

		return _;
	};

	Animator.prototype._bindEvents = function() {
		var _ = this,
				onScroll = function( event ) {
					_.requestAnimationFrame();
				};

		$(window).on( 'scroll', throttle( onScroll, 50 ) );

		return _;
	};

	Animator.prototype.requestAnimationFrame = function() {
		var _ = this,
				percent = _.getPercentStep();

		_.$element.css( _.animation.getPartial( percent ) );

		return _;
	};

	Animator.prototype.getPercentStep = function() {
		var _ = this,
				elementTop = _.$element.offset().top,
				elementBottom = elementTop + _.$element.outerHeight(),
				scrollTop = $(window).scrollTop() - _.scrollOffset,
				scrollBottom,
				percent = 0;

		scrollTop = Math.max( 0, scrollTop );
		scrollBottom = scrollTop + windowHeight();
		percent = ( scrollBottom - elementTop ) / ( elementBottom - elementTop );

		// Limit the percentage, between 0 and 1
		percent = Math.max( 0, percent );
		percent = Math.min( 1, percent );

		return percent;
	};

	// Expose globally
	window.Animator = Animator;
	window.Animations = {};
	window.Animations.FadeIn = FadeInAnimation;
	window.Animations.SlideIn = SlideInAnimation;

} )( jQuery, window, document );
