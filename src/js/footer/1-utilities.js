// Utility JavaScript functions

// mobile Safari reports wrong values on offset()
// http://dev.jquery.com/ticket/6446
if ( /webkit.*mobile/i.test(navigator.userAgent)) {
  console.log( 'Running safari' );
  (function($) {
      $.fn.offsetOld = $.fn.offset;
      $.fn.offset = function() {
        var result = this.offsetOld();
        result.top -= window.scrollY;
        result.left -= window.scrollX;
        return result;
      };
  })(jQuery);
}
