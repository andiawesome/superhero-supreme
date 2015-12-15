/**
 * @ngdoc directive
 * @name superheroSupreme.directive:ssSortableList
 * @description
 * # ssSortableList
 * Creates sort icons that toggle & connects the sort functionality to the DOM
 */
(function () {
	'use strict';

	angular.module('cipCommonUtils')
	.directive('ssSortableList', ssSortableList);

	function ssSortableList () {
		var directive = {
			restrict: 'A',
			controller: ssSortableListCtrl,
			controllerAs: 'sortable',
			scope: {
				sortBy: "=",
				sortClass: "="
			}
		};

		return directive;
	}

	ssSortableListCtrl.$inject = ['$scope', '$element'];

	function ssSortableListCtrl ($scope, $element) {
		var ctrl = this;

		ctrl.changeOrder = changeOrder;

		/////////////////////////////

		function changeOrder (attr, css_attr, dir) {
			// if direction is defined, add a new orderBy to the array
			if (dir == 'desc') {
				$scope.sortBy ='-' + attr;
				$scope.sortClass = css_attr + '-' + dir;
			} else if (dir == 'asc') {
				$scope.sortBy = attr;
				$scope.sortClass = css_attr + '-' + dir;
			} else {
				$scope.sortBy = null;
				$scope.sortClass = null;
			}
		}
	}
})();