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

} )( jQuery, window, document );
