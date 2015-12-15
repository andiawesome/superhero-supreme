/** @ngdoc  controller
 *  @name   superheroSupreme.controller:FormCtrl
 *  @description    Manages the filter form for the superhero list
 *  @author Andi Norris
 */
(function () {
    'use strict';

    angular.module('superheroSupreme')
    .controller('FormCtrl', FormCtrl);

    FormCtrl.$inject = ['$rootScope', '$scope', 'listManager', 'dateTimeUtils'];

    function FormCtrl ($rootScope, $scope, listManager, dateTimeUtils) {
        var ctrl = this;

        ctrl.statuses = [
            { title: 'All', value: 'all' },
            { title: 'Active', value: 'active' },
            { title: 'Retired', value: 'retired' },
            { title: 'Out of Commission', value: 'expired' }
        ];

        ctrl.filter_params = {
            name: null,
            status: ctrl.statuses[0],
            start_date: null,
            end_date: null,
        };

        ctrl.picker_config = {
            current_text: 'Today'
        };

        ctrl.filtering = false;
        ctrl.openStartPicker = openStartPicker;
        ctrl.openEndPicker = openEndPicker;

        ctrl.filterRequests = filterRequests;
        ctrl.searchMembers = searchMembers;

        ctrl.reset = reset;

        $scope.$on('list.updated', function () {
            ctrl.filtering = false;
        });

        ////////////////////////////////

        function openStartPicker ($e) {
            ctrl.start_picker_open = true;
        }

        function openEndPicker($e) {
            ctrl.end_picker_open = true;
        }

        function filterRequests () {
            var params = {
                name: ctrl.filter_params.name,
                status: ctrl.filter_params.status.value,
                start_date: ctrl.filter_params.start_date ? dateTimeUtils.parseDate(ctrl.filter_params.start_date, dateTimeUtils.beginningOfDay()) : null,
                end_date: ctrl.filter_params.end_date ? dateTimeUtils.parseDate(ctrl.filter_params.end_date) : null
            };

            // Clear any persistent sorting when new filters are set
            $rootScope.$broadcast('sort.list.clear');

            listManager.loadList({ page: 1, sort: null, order: null, filter: params });

            ctrl.filtering = true;
        }

        function reset () {
            ctrl.filter_params = {
                name: null,
                status: ctrl.statuses[0],
                start_date: null,
                end_date: null
            };

            ctrl.filterRequests();
        }

    }
})();