/** @ngdoc factory
 *	@name superheroSupreme.factory:dateTimeUtils
 *  @description utility functions for date/time manipulation
 *	@author Andi Norris
 *
 *	@dependencies Moment.js
 */
(function () {
    'use strict';

    angular.module('superheroSupreme')
    .service('dateTimeUtils', dateTimeUtils);

    function dateTimeUtils () {
        var utils = {
            beginningOfDay: beginningOfDay,
            endOfDay: endOfDay,
            parseDate: parseDate
        };

        return utils;

        ///////////////////////////////
        /**
         * Get midnight for the given day
         * @param   {Date}      datetime        A Date for which to reset time.
         * @returns {String}    datetime        Local ISO String with zeroed out time.
         */
         function beginningOfDay (datetime) {
            var new_date = datetime || new Date(),
                mmt = moment(new_date);

            mmt.startOf('day');
            var formatted = mmt.format('h:mm');

            return mmt.format();
         }

         /**
         * Get 11:59 for the given day
         * @param   {Date}      datetime        A Date for which to reset time.
         * @returns {String}    datetime        Local ISO String with end of day time.
         */
         function endOfDay (datetime) {
            var new_date = datetime || new Date(),
                mmt = moment(new_date);

            mmt.endOf('day');

            return mmt.format();
         }

         /**
          * Parse date from individual pieces to UTC before saving
          * @param   {Number}    date        Date as ISO String - to get MM/DD/YYYY.
          * @param   {Number}    time        Minutes from midnight - to get hh:mm a.
                                             False - set to end of day.
          * @param   {String}    offset      The timezone offset as [Continent/Name_Of_Zone].
         */
         function parseDate(date, time, offset) {
             var mmt_day = moment(new Date(date)).format('MM/DD/YYYY');
             var mmt_time = time ? moment(time) : moment().endOf('day');

             // set the timezone for the desired day
             var mmt_tz = offset ? moment.tz(mmt_day, 'MM/DD/YYYY', offset) : moment(mmt_day, 'MM/DD/YYYY');

             // After offset, set time
             mmt_tz = mmt_tz.hours(mmt_time.hours()).minutes(mmt_time.minutes());

             // convert to utc
             return mmt_tz.utc().format();
         }

    }

})();