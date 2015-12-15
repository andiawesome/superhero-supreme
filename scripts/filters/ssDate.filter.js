/** @ngdoc	filter
 *	@name	superheroSupreme.filter:ssDate
 *	@description
 *	# ssDate
 *	Custom Date filter that utilizes the moment formatting library
 *	@author Andi Norris
 *
 *	@dependencies Moment.js
 */
(function () {
	'use strict';

	angular.module('superheroSupreme')
	.filter('ssDate', ssDate);

	function ssDate () {
		return function(date, format, timezone) {
			if (!date) return;

			var fmt = format || 'L';

			return !!timezone ? moment.tz(date, timezone).format(fmt) : moment(date).format(fmt);

		};
	}
})();