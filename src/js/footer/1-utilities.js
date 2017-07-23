// Utility JavaScript functions

// Polyfill
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

/**
 * Get the true window width, without scrollbars.
 * @return integer The window width in px.
 */
function windowWidth() {
  // Temporarily disable scrollbar
  $('body').css( {
    overflow: 'hidden',
  } );

  // Get window width
  var w = $(window).width();

  // Remove styles
  $('body').css( {
    overflow: '',
  } );

  return w;
}

/**
 * Get the window height.
 * @return integer The window height in px.
 */
function windowHeight() {
  return $(window).height();
}

/**
 * Check if an x,y point is inside a rectangle on the screen.
 * @param  {object} point An object with point.x & point.y keys.
 * @param  {object} rect  An object with object.topLeft & object.bottomRight keys.
 *                        Each of these keys should also be a point object with point.x & point.y keys.
 * @return {boolean}      
 */
function pointIsInsideRect( point, rect ) {
  return( 
    point.x >= rect.topLeft.x &&
    point.x <= rect.bottomRight.x &&

    point.y >= rect.topLeft.y &&
    point.y <= rect.bottomRight.y
  );
}

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function throttle(fn, threshold, scope) {
  threshold = threshold || 250;
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date(),
        args = arguments;
    if (last && now < last + threshold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}
