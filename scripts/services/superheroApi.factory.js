/**
 * @ngdoc factory
 * @name superheroSupreme.factory:superheroApi
 * @description
 * # manages the resource data for superheroes
 * @author Andi Norris
 */

 (function () {
    'use strict';

    angular.module('superheroSupreme')
    .factory('superheroApi', superheroApi);

    superheroApi.$inject = ['$resource'];

    function superheroApi ($resource) {
        return $resource('/api/superheroes/:superhero_id', {superhero_id: '@superhero_id'});
    }
 })();