/**
 * Auth 丁少华
 * Date 2016-09-13
 */

angular
	.module('detailOperate', ['ui.bootstrap'])
	.run(['$rootScope', '$parse', '$log', function($rootScope, $parse, $log) {
		var id = window.frameElement && window.frameElement.id || '',
			obj = parent.$('#' + id).attr('data');
		$rootScope.detailOperateSpec = obj ? JSON.parse(obj) : {}; // 待修改的员工信息
		$rootScope.isForbidSubmit = true; // 禁用编辑员工提交按钮
	}])
	// 控制器
	.controller('detailOperateFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
		$scope.isForbid = true;
		$scope.detailOperateForm = $.extend(true, {
			operateId: '10101', //权限规格ID
            operateName: '采购入库', //权限规格名称
            operateCode: '前台页面', //权限规格编码
            operateType: '进销存管理', //权限类型
            description:'',//描述
		}, $rootScope.detailOperateSpec);
	}])

	// 权限维度查询控制器
	.controller('preveligeDimensionFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
		$scope.isForbid = false;	
		$rootScope.preveligeDimensionResultList = [{
			dimensionCode:'10101',
       		dimensionName:'地区',
       		dataType:'',
       		moveSql:'',
       		remark:'可操作',
		}, {
			dimensionCode:'10102',
       		dimensionName:'地区',
       		dataType:'',
       		moveSql:'',
       		remark:'可操作',
		}];
		
	}])
	// 权限可操作查询控制器
	.controller('preveligeDoneFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
		$scope.isForbid = true;
		$rootScope.preveligeDoneResultList = [{
			businessModuleId:'10101',
       		businessModuleName:'采购入库',
       		remark:'商业的采购入库人业务',
		}, {
			businessModuleId:'10102',
       		businessModuleName:'采购入库',
       		remark:'商业的采购入库人业务',
		}];
		
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