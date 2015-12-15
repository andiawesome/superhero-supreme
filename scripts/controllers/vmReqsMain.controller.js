/** @ngdoc  controller
 *  @name   mainCtrl
 *  @description    Handles the main view of the Volunteer Manage Requests page
 *  @author Andi Norris
 */
(function () {
    'use strict';

    angular.module('volunteerManager')
    .controller('manageReqsCtrl', manageReqsCtrl);

    manageReqsCtrl.$inject = ['$scope', '$log', 'listManager'];

    function manageReqsCtrl ($scope, $log, listManager) {
        activate();

        /////////////////////
        function activate () {
            listManager.loadReqList();
        }
    }
})();