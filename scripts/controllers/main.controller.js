/** @ngdoc  controller
 *  @name   superheroSupreme.controller:MainCtrl
 *  @description
 *  # MainCtrl
 *  Handles the main view of the Superhero List page
 *  @author Andi Norris
 */
(function () {
    'use strict';

    angular.module('superheroSupreme')
    .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$log', 'listManager'];

    function MainCtrl ($scope, $log, listManager) {
        activate();

        /////////////////////

        function activate () {
            listManager.loadList();
        }
    }
})();