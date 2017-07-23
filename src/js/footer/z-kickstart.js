// Initialise plugins and modules

( function( $, window, document, undefined ) {
	
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
	var $animatedElements = $('[data-animate]');

	$animatedElements.each( function( index, node ) {

		var $this = $(node),
				type = $this.attr( 'data-animate' );

		if ( 'fadeIn' === type ) {
			$this.Animator = new Animator( $this, new Animations.FadeIn() );
		} else if ( 'slideInLeft' === type ) {
			$this.Animator = new Animator( $this, new Animations.SlideIn('left') );
		} else if ( 'slideInRight' === type ) {
			$this.Animator = new Animator( $this, new Animations.SlideIn('right') );
		} else {
			console.log( 'No animator attached for: ', node );
		}

	} );

} )( jQuery, window, document );
