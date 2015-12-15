/**
 * @ngdoc factory
 * @name superheroSupreme.factory:tableListManager
 * @description
 * # manages the resource data for superheroes
 * @author Andi Norris
 */
(function () {
    'use strict';

    angular.module('superheroSupreme')
    .factory('tableListManager', tableListManager);

    superheroSupreme.$inject = ['$rootScope'];

    function tableListManager ($rootScope) {
        var params = {
                page: 1,
                limit: 10,
                sort: null,
                order: null,
                filter: null
            },
            total_count = 0;

        var manager = {
                list: [],
                getList: getList,
                getCount: getCount,
                setCount: setCount,
                getParam: getParam,
                getQueryParams: getQueryParams,
                setList: setList
            };

        return manager;

        ////////////////////////

        function setParam (key, value) {
            params[key] = value;
        }

        function getList () {
            return manager.list;
        }

        function getCount () {
            return total_count;
        }

        function getParam (key) {
            if (params.hasOwnProperty(key)) {
                return params[key];
            }
        }

        function setCount (new_count) {
            total_count = new_count;
        }

        function getQueryParams (new_params) {
            var query_params = {};

            // keep params in sync for tracking across the controllers
            if (angular.isObject(new_params)) {
                angular.forEach(new_params, function (value, key) {
                    setParam(key, value);
                });
            }

            // set filters as top level param attributes
            angular.forEach(params, function (value, key) {
                if (key === 'filter') {
                    angular.forEach(value, function (v, k) {
                        k = 'filter_' + k;
                        query_params[k] = v;
                    });
                } else {
                    query_params[key] = value;
                }
            });

            return query_params;
        }

        function setList (new_list) {
            manager.list = new_list;

            $rootScope.$broadcast('list.updated');
        }
    }
})();