/**
 * Auth 丁少华
 * Date 2016-09-07
 */

angular
	.module('operateSpecModule', ['ui.bootstrap'])
	.run(['$rootScope', function($rootScope) {
		$rootScope.queryOperateResultList = []; // 查询员工列表
		$rootScope.modifiedQueryOperate = {}; // 待修改的员工信息
		$rootScope.detailQueryOperate = {};
	}])
	.factory('httpMethod', ['$http', '$q', function($http, $q) {
		var httpMethod = {};
		var httpConfig = {
            'siteUrl': 'http://127.0.0.1/psm',
			// 'siteUrl': 'http://192.168.74.17/psm',
			//'siteUrl': 'http://192.168.16.161:80/psm',
			'requestHeader': {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		};

		// 查询权限规格信息
		httpMethod.queryOperateSpec = function(param) {
			var defer = $q.defer();
			$http({
				url: httpConfig.siteUrl + '/privilege/profile/queryOperationSpec.action',
				method: 'POST',
				headers: httpConfig.requestHeader,
				data: 'param=' + JSON.stringify(param)
			}).success(function(data, header, config, status) {
				if (status != 200) {
					// 跳转403页面
				}
				defer.resolve(data);
			}).error(function(data, status, headers, config) {
				defer.reject(data);
			});
			return defer.promise;
		};

		// 查询权限类型
        httpMethod.queryOperationType = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/privilege/profile/queryOperationSpecType.action',
                method: 'POST',
                headers: httpConfig.requestHeader,
            }).success(function(data, header, config, status) {
                if (status != 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

		// 新建权限规格信息
		httpMethod.insertOperateSpec = function(param) {
			var defer = $q.defer();
			$http({
				url: httpConfig.siteUrl + '/privilege/profile/insertOperationSpec.action',
				method: 'POST',
				headers: httpConfig.requestHeader,
				data: 'data=' + JSON.stringify(param)
			}).success(function(data, header, config, status) {
				if (status != 200) {
					// 跳转403页面
				}
				defer.resolve(data);
			}).error(function(data, status, headers, config) {
				defer.reject(data);
			});
			return defer.promise;
		};

		// 编辑权限规格信息
		httpMethod.alertOperateSpec = function(param) {
			var defer = $q.defer();
			$http({
				url: httpConfig.siteUrl + '/privilege/profile/alertOperationSpec.action',
				method: 'POST',
				headers: httpConfig.requestHeader,
				data: 'data=' + JSON.stringify(param)
			}).success(function(data, header, config, status) {
				if (status != 200) {
					// 跳转403页面
				}
				defer.resolve(data);
			}).error(function(data, status, headers, config) {
				defer.reject(data);
			});
			return defer.promise;
		};

 		// 权限规格信息详情
		httpMethod.infoOperateSpec = function(param) {
			var defer = $q.defer();
			$http({
				url: httpConfig.siteUrl + '/privilege/profile/alertOperationSpec.action',
				method: 'POST',
				headers: httpConfig.requestHeader,
				data: 'data=' + JSON.stringify(param)
			}).success(function(data, header, config, status) {
				if (status != 200) {
					// 跳转403页面
				}
				defer.resolve(data);
			}).error(function(data, status, headers, config) {
				defer.reject(data);
			});
			return defer.promise;
		};
		// 启用权限规格
		httpMethod.uLockOperateSpec = function(param) {
			var defer = $q.defer();
			$http({
				url: httpConfig.siteUrl + '/privilege/profile/alertOperationSpecState.action',
				method: 'POST',
				headers: httpConfig.requestHeader,
				data: 'data=' + JSON.stringify(param)
			}).success(function(data, header, config, status) {
				if (status != 200) {
					// 跳转403页面
				}
				defer.resolve(data);
			}).error(function(data, status, headers, config) {
				defer.reject(data);
			});
			return defer.promise;
		};

		// 停用权限规格
		httpMethod.lockOperateSpec = function(param) {
			var defer = $q.defer();
			$http({
				url: httpConfig.siteUrl + '/privilege/profile/alertOperationSpecState.action',
				method: 'POST',
				headers: httpConfig.requestHeader,
				data: 'data=' + JSON.stringify(param)
			}).success(function(data, header, config, status) {
				if (status != 200) {
					// 跳转403页面
				}
				defer.resolve(data);
			}).error(function(data, status, headers, config) {
				defer.reject(data);
			});
			return defer.promise;
		};

		// 删除权限规格
		httpMethod.batchCancelOperateSpec = function(param) {
			var defer = $q.defer();
			$http({
				url: httpConfig.siteUrl + '/privilege/profile/deleteOperationSpecBatch.action',
				method: 'POST',
				headers: httpConfig.requestHeader,
				data: 'data=' + JSON.stringify(param)
			}).success(function(data, header, config, status) {
				if (status != 200) {
					// 跳转403页面
				}
				defer.resolve(data);
			}).error(function(data, status, headers, config) {
				defer.reject(data);
			});
			return defer.promise;
		};

		return httpMethod;
	}])

	// 权限类型编码转换权限类型名称
	.filter('operationSpecTypeCdConversionName', function() {
		return function(operationSpecTypeCd, operationType) {
			var output = '';
			if (operationType.length) {
				operationType.map(function(item, index) {
					if (item.operationSpecTypeCd == operationSpecTypeCd) {
						output = item.operationSpecTypeName;
					}
				})
			}
			return output;
		}
	})

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
	            createDate: '2016-01-12', //创建时间
	            lastModifiedDate: '2016-01-30', //最后修改时间
                description:'',//描述
			},{
				operateId: '10102', //权限规格ID
	            operateName: '采购入库', //权限规格名称
	            operateCode: '前台页面', //权限规格编码
	            operateType: '进销存管理', //权限类型
	            status: '在用', //状态
	            createDate: '2016-01-12', //创建时间
	            lastModifiedDate: '2016-01-30', //最后修改时间
                description:'',//描述
			},{
				operateId: '10103', //权限规格ID
	            operateName: '采购入库', //权限规格名称
	            operateCode: '前台页面', //权限规格编码
	            operateType: '进销存管理', //权限类型
	            status: '在用', //状态
	            createDate: '2016-01-12', //创建时间
	            lastModifiedDate: '2016-01-30', //最后修改时间
                description:'',//描述
			},{
				operateId: '10104', //权限规格ID
	            operateName: '采购入库', //权限规格名称
	            operateCode: '前台页面', //权限规格编码
	            operateType: '进销存管理', //权限类型
	            status: '在用', //状态
	            createDate: '2016-01-12', //创建时间
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
		// 新建
		$scope.addQueryOperate = function() {
			parent.angular.element(parent.$('#tabs')).scope().addTab('新建权限规格', '/page/modifyOperate/modifyOperate.html', 'addQueryOperate');
		}
		//详情
		$scope.infoQueryOperate = function(index) {
			$rootScope.detailQueryOperate = $rootScope.queryOperateResultList[index];
			parent.angular.element(parent.$('#tabs')).scope().addTab('权限规格详情', '/page/detailOperate/detailOperate.html', 'detailOperate', JSON.stringify($rootScope.detailQueryOperate));
		}
		// 修改
		$scope.editQueryOperate = function(index) {
			$rootScope.modifiedQueryOperate = $rootScope.queryOperateResultList[index];
			parent.angular.element(parent.$('#tabs')).scope().addTab('修改权限规格', '/page/modifyOperate/modifyOperate.html', 'modifyOperate', JSON.stringify($rootScope.modifiedQueryOperate));
		}
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
        $scope.pageChanged = function() {
            $scope.queryOperateFormSubmit($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }]);
