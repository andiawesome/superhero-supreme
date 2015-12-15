/** @ngdoc  controller
 *  @name   superheroSupreme.controller:ListCtrl
 *  @description
 *  Manages displaying the superhero list, & setting up the sortability
 *  functionality
 *  @author Andi Norris
 */
(function () {
    'use strict';

    angular.module('superheroSupreme')
    .controller('ListCtrl', ListCtrl);

    ListCtrl.$inject = ['$scope', '$filter', 'tableListFactory', 'listManager'];

    function ListCtrl ($scope, $filter, tableListFactory, listManager) {
        var ctrl = this;

        // SORTABLE LIST
        ctrl.sortableList = {
            sortBy: null,
            sortClass: null
        };

        ctrl.heroList = tableListFactory.list;

        $scope.$on('sort.list', function (evt, obj) {
            sortList(obj);
        });

        //////////////////////////

        function sortList (sort_params) {

            var map_keys = {
                'name': 'name',
                'association.name': 'association',
                'hours': 'hours',
                'status': 'status',
                'start_date': 'startDate'
            };

            var params = {
                sort: map_keys[sort_params.sortKey],
                order: sort_params.order ? sort_params.order.toUpperCase() : null
            };

            listManager.loadList(params);
        }
    }
})();