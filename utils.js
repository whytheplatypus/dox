"use strict";

/**
 * utils
 * The utils module.
 * @author visionmedia
 */
define([], function() {
  var utils = {};

	/**
	 * Escape the given `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */

	utils.escape = function(html){
	  return String(html)
	    .replace(/&(?!\w+;)/g, '&amp;')
	    .replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;');
	};

  return utils;
});
