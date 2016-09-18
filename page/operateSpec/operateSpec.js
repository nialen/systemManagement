/**
 * Auth 丁少华
 * Date 2016-09-07
 */

angular
	.module('operateSpecModule', ['ui.bootstrap'])
	.run(['$rootScope', function($rootScope) {
		$rootScope.queryOperateResultList = []; // 查询员工列表
		$rootScope.detailQueryOperate = {}; // 待修改的员工信息
	}])
	// 查询控制器
	.controller('queryOperateFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
		$scope.isForbid = true;
		$scope.queryOperateForm = {
			operateId: '',
            operateName: '',
            operateType: null,
		};
		$scope.queryOperateFormSubmit = function() {
			// TODO $http发送请求，获取数据，写入$rootScope；
			// TODO查询结果
			$rootScope.queryOperateResultList = [{
				operateId: '10101', //权限规格ID
	            operateName: '采购入库', //权限规格名称
	            operateCode: '前台页面', //权限规格编码
	            operateType: '进销存管理', //权限类型
	            status: '在用', //状态
	            creatDate: '2016-01-12', //创建时间
	            lastModifiedDate: '2016-01-30', //最后修改时间
                description:'',//描述              
			},{
				operateId: '10102', //权限规格ID
	            operateName: '采购入库', //权限规格名称
	            operateCode: '前台页面', //权限规格编码
	            operateType: '进销存管理', //权限类型
	            status: '在用', //状态
	            creatDate: '2016-01-12', //创建时间
	            lastModifiedDate: '2016-01-30', //最后修改时间
                description:'',//描述                
			},{
				operateId: '10103', //权限规格ID
	            operateName: '采购入库', //权限规格名称
	            operateCode: '前台页面', //权限规格编码
	            operateType: '进销存管理', //权限类型
	            status: '在用', //状态
	            creatDate: '2016-01-12', //创建时间
	            lastModifiedDate: '2016-01-30', //最后修改时间
                description:'',//描述
			},{
				operateId: '10104', //权限规格ID
	            operateName: '采购入库', //权限规格名称
	            operateCode: '前台页面', //权限规格编码
	            operateType: '进销存管理', //权限类型
	            status: '在用', //状态
	            creatDate: '2016-01-12', //创建时间
	            lastModifiedDate: '2016-01-30', //最后修改时间
                description:'',//描述
			}];
			$log.log($scope.queryOperateForm.operateId);
		}
		$scope.$watch('queryOperateForm', function(current, old, scope) {
			if (scope.queryOperateForm.operateId || scope.queryOperateForm.operateName || scope.queryOperateForm.operateType) {
				scope.isForbid = false;
			} else {
				scope.isForbid = true;
			}
		}, true);
	}])
	// 查询结果控制器
	.controller('queryOperateResultCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
		// 修改
		// $scope.editQueryOperate = function(index) {
		// 	$rootScope.modifiedQueryOperate = $rootScope.queryOperateResultList[index];
		// 	$scope.$emit('openEditQueryOperateModal');
		// }
		$scope.editQueryOperate = function(index) {
			$rootScope.modifiedOperaSpec = $rootScope.queryOperateResultList[index];
			parent.angular.element(parent.$('#tabs')).scope().addTab('权限信息', '/page/modifyOperate/modifyOperate.html', 'modifyOperate', JSON.stringify($rootScope.modifyOperateSpec));
		}

		//详情
		$scope.infoQueryOperate = function(index) {
			$rootScope.detailQueryOperate = $rootScope.queryOperateResultList[index];
			parent.angular.element(parent.$('#tabs')).scope().addTab('权限信息', '/page/detailOperate/detailOperate.html', 'detailOperate', JSON.stringify($rootScope.detailOperateSpec));
		}

		// 新建
		// $scope.addQueryOperate = function() {
		// 	$rootScope.modifiedQueryOperate = {};
		// 	$scope.$emit('openEditQueryOperateModal');
		// }
	}])
	// 分页控制器
	.controller('paginationCtrl', ['$scope', '$log', function($scope, $log) {
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
	}]);