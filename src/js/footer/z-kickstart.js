// Initialise plugins and modules

( function( $, window, document, undefined ) {
	
	/**
	 * Initialise Slick carousel
	 * @type {Object}
	 */
	var slickArgs = {
		fade: true,
		autoplay: true,
		arrows: false,
		dots: true,
		adaptiveHeight: false
	},
	$carousel = $('[data-carousel]');

	if ( $carousel.length ) {
		$carousel.slick( slickArgs );
	}


	/**
	 * Initialise animation on scroll
	 */
	var $animatedElements = $('[data-animate]'),
			animationController = new ScrollMagic.Controller();

	$animatedElements.each( function( index, node ) {

		var $this = $(node),
				type = $this.data( 'animate' ),
				offset = $this.data( 'offset' ),
				animation,
				scene;

		if ( undefined === offset ) {
			offset = 0;
		}

		switch ( type ) {
			case 'slideInBottom':
				animation = new ScrollMagicAnimations.SlideInBottom( node );
				break;

			case 'slideInLeft':
				animation = new ScrollMagicAnimations.SlideInLeft( node );
				break;

			case 'slideInRight':
				animation = new ScrollMagicAnimations.SlideInRight( node );
				break;

			default:
				break;
		}

		scene = new ScrollMagic.Scene( {
			triggerElement: node,
			// Only play once on scroll down, not on scroll up
			reverse: false
		} )
		.triggerHook( 1 )
		.offset( offset )
		.setTween( animation.getTween() )
		.addTo( animationController );

	} );

} )( jQuery, window, document );
