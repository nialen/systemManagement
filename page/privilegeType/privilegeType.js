/**
 * Auth 
 * Date 2016-09-07
 */

angular
	.module('privilegeTypeModule', ['ui.bootstrap'])
	.controller('queryTypeFormCtrl', ['$scope', function($scope) {
		$scope.isForbid = true;
		$scope.queryTypeForm = {
			typeId: '',
			typeName: '',
		};
		$scope.queryTypeFormSubmit = function() {
			console.log($scope.queryTypeForm.typeId);
		}
		$scope.$watch('queryTypeForm', function(current, old, scope) {
			if (queryTypeForm.typeId.value || queryTypeForm.typeName.value) {
				scope.isForbid = false;
			} else {
				scope.isForbid = true;
			}
		}, true)
	}])
	.controller('privilegeTypeResultCtrl', ['$scope', function($scope) {
		// TODO查询结果
		$scope.privilegeTypeResultList = [{
			typeId: '10101', //权限类型编码
			typeName: '进销存管理', //权限类型名称
			typeRuleCode: '10002', //权限规格编码前缀
			description: '', //描述
		}, {
			typeId: '10102', //权限类型编码
			typeName: '进销存管理', //权限类型名称
			typeRuleCode: '20001', //权限规格编码前缀
			description: '', //描述
		}];
	}])
	.controller('PaginationDemoCtrl', function($scope, $log) {
		$scope.totalItems = 64;
		$scope.currentPage = 4;

		$scope.setPage = function(pageNo) {
			$scope.currentPage = pageNo;
		};

		$scope.pageChanged = function() {
			$log.log('Page changed to: ' + $scope.currentPage);
		};

		$scope.maxSize = 5;
		$scope.bigTotalItems = 175;
		$scope.bigCurrentPage = 1;
	});