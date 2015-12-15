/**
 * @ngdoc factory
 * @name superheroSupreme.factory:listManager
 * @description
 * # manages which list to load
 */

 (function () {
    'use strict';

    angular.module('superheroSupreme')
    .factory('listManager', listManager);

    listManager.$inject = ['superheroApi', 'tableListManager'];

    function listManager (superheroApi, tableListManager) {
        var manager = {
            loadList: loadList
        };

        return manager;

        ///////////////////////

        function loadList (params) {
            var query_params = tableListManager.getQueryParams(params);

            superheroApi.get(query_params).$promise.then(function (response) {
                tableListManager.setList(response.data.superheroes);
                tableListManager.setCount(response.data.count);
            });
        }
    }
 })();
