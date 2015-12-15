/**
 * @ngdoc directive
 * @name superheroSupreme.directive:ssSortableHeader
 * @description
 * # ssSortableHeader
 * Creates sort icons that toggle & connects the sort functionality to the DOM
 */
(function () {
    'use strict';

    angular.module('superheroSupreme')
    .directive('ssSortableHeader', ssSortableHeader);

    function ssSortableHeader () {
        var directive = {
            require: '^ssSortableList',
            link: postLink,
            scope: {
                attr: '@'
            },
            transclude: true,
            template: '<span class="sortable" ng-click="sort()"><span ng-transclude></span><b class="fa sort sort-{{ ::css_attr }}"></b></span>'
        };

        return directive;

        /////////////////////////

        function postLink (scope, element, attrs, listCtrl) {
            scope.sort = sort;

            scope.$on('sort.list.clear', function () {
                scope.dir = null;
                listCtrl.changeOrder(scope.attr, scope.css_attr, scope.dir);
            });

            //////////////////////////////

            function sort () {
                switchDirection();
                sendSortListCommand();
                formatCssAttr();

                // push new listOrderBy to ctrl
                listCtrl.changeOrder(scope.attr, scope.css_attr, scope.dir);
            }

           function switchDirection () {
                // set the order to asc, desc, or none
                // change the icon to match
                switch(scope.dir) {
                    case 'asc':
                        scope.dir = 'desc';
                        break;
                    case 'desc':
                        scope.dir = null;
                        break;
                    default:
                        scope.dir = 'asc';
                }
            }

            function sendSortListCommand () {
                var obj = {order: scope.dir, sortKey: scope.attr};
                scope.$emit('sort.list', obj);
            }

            function formatCssAttr () {
                // if the attr is a child attr, remove the period
                if (scope.attr.indexOf('.') > -1) {
                    var array_string = angular.copy(scope.attr).split('.');
                    scope.css_attr = array_string.join('');
                } else {
                    scope.css_attr = scope.attr;
                }
            }
        }

    }
})();