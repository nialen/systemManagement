/**
 * Auth 
 * Date 2016-09-13
 */

angular
	.module('modifyOperate', ['ui.bootstrap', 'angular-md5'])
	.run(['$rootScope', '$parse', '$log', function($rootScope, $parse, $log) {
		var id = window.frameElement && window.frameElement.id || '',
			obj = parent.$('#' + id).attr('data');
		$rootScope.modifiedOperateSpec = obj ? JSON.parse(obj) : {}; // 待修改的权限规格信息
		$rootScope.operationType = []; // 权限类型列表

		$rootScope.isModifiedOperateList = !obj ? true : false;

		$rootScope.preveligeDimensionResultList = [];//权限维度列表
		$rootScope.preveligeDoneResultList = [];//权限可操作列表
		// $rootScope.ownerSys = ['1', '2']; 
		// $rootScope.businessModuleType = ['3', '4']; 
		
	}])
	.factory('httpMethod', ['$http', '$q', function ($http, $q) {
        var httpMethod = {};
        var httpConfig = {
            'siteUrl': 'http://192.168.74.17/psm',
            //'siteUrl': 'http://192.168.16.67:8080/psm',
            // 'siteUrl': 'http://192.168.74.17/psm',
            'requestHeader': {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        };

        // 获取权限类型
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

        // 查询已选权限维度
        httpMethod.queryPrivilegeDimensionInOperationSpec = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/privilege/profile/queryPrivilegeDimensionInOperationSpec.action',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(param)
            }).success(function (data, header, config, status) {
                if (status != 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        // 查询已选业务模块
        httpMethod.querySysModularInOperationSpec = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/privilege/profile/querySysModularInOperationSpec.action',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(param)
            }).success(function (data, header, config, status) {
                if (status != 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        // 查询可选权限维度
        httpMethod.queryPrivilegeDimension4Pick = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/privilege/profile/queryPrivilegeDimension4Pick.action',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(param)
            }).success(function (data, header, config, status) {
                if (status != 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        // 查询可选业务模块
        httpMethod.querySysModular4Pick = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/privilege/profile/querySysModular4Pick.action',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(param)
            }).success(function (data, header, config, status) {
                if (status != 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        // 查询业务系统平台
        httpMethod.queryBusinessSystem = function () {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/privilege/profile/queryBusinessSystem.action',
                method: 'POST',
                headers: httpConfig.requestHeader,
            }).success(function (data, header, config, status) {
                if (status != 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
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
				url: httpConfig.siteUrl + '/privilege/profile/alterOperationSpec.action',
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
	
	// 修改权限规格基本信息控制器
	.controller('modifyOperateFormCtrl', ['$scope', '$rootScope', '$log','httpMethod', function($scope, $rootScope, $log, httpMethod) {	
		// 获取权限类型列表
        httpMethod.queryOperationType().then(function(rsp) {
            $log.log('调用获取权限类型接口成功.');
            $rootScope.operationType = rsp.data.list;
        }, function() {
            $log.log('调用获取权限类型接口失败.');
        });  

		$scope.modifyOperateForm = $.extend(true, {
			operationSpecCd: '', //权限规格编码
            name: '', //权限规格名称
            operationSpecTypeCd: '', //数据类型
            description:'',//地区描述
		}, $rootScope.modifiedOperateSpec);	
        		
		$scope.modifyOperateFormSubmit = function() {
            var param = {
                operationSpecCd:'',//权限规格编码
				name:'',//权限规格名称	
				operationSpecTypeCd:'',//权限规格类型
				manageCd:'',//管理编码
				state:'',//状态（0－启用，1－未启用，2－注销）
				specLevel:'',//权限规格级别
				description:'',//描述
				modularList:[{
					sysModularId:''//业务模块Id
				}],
				dimensionList:[{
					privilegeDimensionCd:''//权限维度编码
				}]
            };
            $scope.modifyOperateForm.operationSpecCd ? param.operationSpecCd = $scope.modifyOperateForm.operationSpecCd : '';
            $scope.modifyOperateForm.name ? param.name = $scope.modifyOperateForm.name : '';
            $scope.modifyOperateForm.modularTypeCdItem ? param.modularTypeCd = $scope.modifyOperateForm.modularTypeCdItem :'';
            $scope.modifyOperateForm.operationSpecTypeCd ? param.operationSpecTypeCd = $scope.modifyOperateForm.operationSpecTypeCd : '';
            $scope.modifyOperateForm.manageCd ? param.manageCd = $scope.modifyOperateForm.manageCd :'';
            $scope.modifyOperateForm.state ? param.state = $scope.modifyOperateForm.state :'';
            $scope.modifyOperateForm.specLevel ? param.specLevel = $scope.modifyOperateForm.specLevel :'';
            $scope.modifyOperateForm.description? param.description = $scope.modifyOperateForm.description :'';
           	$scope.modifyOperateForm.modularList? param.modularList.sysModularId = $scope.modifyOperateForm.modularList :'';
           	$scope.modifyOperateForm.dimensionList? param.dimensionList.privilegeDimensionCd = $scope.modifyOperateForm.dimensionList :'';
 
            if ($rootScope.isModifiedOperateList) {
            	debugger
                httpMethod.insertOperateSpec(param).then(function (rsp) {
                    $log.log('调用新建权限规格接口成功.');
                    if (rsp.data) {
                        swal({
                            title: '操作成功!',
                            text: '新建权限规格成功！',
                            type: 'success'
                        }, function () {
                            location.reload();
                        });
                    } else {
                        swal("OMG", rsp.msg || "新建权限规格失败!", "error");
                    }
                })
            } else {
                httpMethod.alertOperateSpec(param).then(function (rsp) {
                    $log.log('调用修改权限规格接口成功.');
                    if (rsp.success) {
                        swal("操作成功", "修改权限规格成功!", "success");
                        // TODO 关闭TABS
                    } else {
                        swal("OMG", rsp.msg || "修改权限规格失败!", "error");
                    }
                })
            }
        };
		// 监听响应变化
		$scope.$watch('modifiedOperateSpec', function(current, old, scope) {
			if (current.operationSpecCd !== old.operationSpecCd || current.name !== old.name) {
				scope.modifyOperateForm.operationSpecCd = $rootScope.modifiedOperateSpec.operationSpecCd;
				scope.modifyOperateForm.name = $rootScope.modifiedOperateSpec.name;
			}
		}, true);
	}])


	// 权限维度查询控制器
	.controller('preveligeDimensionFormCtrl', ['$scope', '$rootScope', '$log','httpMethod', function($scope, $rootScope, $log,httpMethod) {
		// 查询结果分页信息
		$scope.requirePaging = true; // 是否需要分页
		$scope.currentPage = 1; // 当前页
		$scope.rowNumPerPage = 4; // 每页显示行数
		$scope.totalNum = 0; // 总条数

		$scope.checkedDimension = []; // 已经选中
		var param = {
			requirePaging: $scope.requirePaging, //是否需要分页
            currentPage: $scope.currentPage, //当前页
            rowNumPerPage: $scope.rowNumPerPage, //每页展示行数
		};
		
		param.operationSpecCd = $rootScope.modifiedOperateSpec.operationSpecCd;
		
		// 查询已选权限维度信息
		httpMethod.queryPrivilegeDimensionInOperationSpec(param).then(function(rsp) {
			$log.log('调用查询已选权限维度接口成功.');
			$scope.preveligeDimensionResultList = rsp.data;
			$scope.totalNum = rsp.data.totalNum;
		}, function() {
			$log.log('调用查询已选权限维度接口失败.');
		});
		
		// $scope.queryDimensionFormSubmit = function(currentPage) {
		// 	$scope.checkedDimension = []; // 置空已选员工列表	
		// }

        // 新建权限维度
        $scope.addDimension = function() {
            $scope.$emit('openAddDimensionModal');
        }
        // 权限维度详情
        $scope.dimensionInfo = function(index, title) {
            $rootScope.dimensionInfo = $rootScope.preveligeDimensionResultList[index];
            $rootScope.syeTitle = title;
            $scope.$emit('openDimensionInfoModal');
        }
	}])

	// 业务模块查询控制器
	.controller('preveligeDoneFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod',function($scope, $rootScope, $log,httpMethod) {
		$scope.requirePaging = true; // 是否需要分页
		$scope.currentPage = 1; // 当前页
		$scope.rowNumPerPage = 4; // 每页显示行数
		$scope.totalNum = 0; // 总条数

		$scope.checkedDimension = []; // 已经选中

		var param = {
			requirePaging: $scope.requirePaging, //是否需要分页
            currentPage: $scope.currentPage, //当前页
            rowNumPerPage: $scope.rowNumPerPage, //每页展示行数
		};
		
		param.operationSpecCd = $rootScope.modifiedOperateSpec.operationSpecCd;
		
		// 查询已选业务模块信息
		httpMethod.querySysModularInOperationSpec(param).then(function(rsp) {
			$log.log('调用查询已选业务模块接口成功.');
			$scope.preveligeDoneResultList = rsp.data;
			$scope.totalNum = rsp.data.totalNum;
		}, function() {
			$log.log('调用查询已选业务模块接口失败.');
		});
		
        // 新建业务模块
        $scope.addPreveligeDone = function() {
            $scope.$emit('openAddPreveligeDoneModal');
        }
        // 业务模块详情
        $scope.businessModuleInfo = function(index, title) {
            $rootScope.businessModuleInfo = $rootScope.preveligeDoneResultList[index];
            $rootScope.syeTitle = title;
            $scope.$emit('openBusinessModuleInfoModal');
        }
	}])

	// 权限维度弹出框控制器
	.controller('preveligeDimensionModalCtrl', function($scope, $rootScope, $uibModal, $log) {
		var $ctrl = this;
        $scope.$on('openAddDimensionModal', function(d, data) {
            $ctrl.addDimensionModal(data);
        });

        $scope.$on('openDimensionInfoModal', function(d, data) {
            $ctrl.dimensionInfoModal(data);
        });

        $ctrl.animationsEnabled = true;

		$ctrl.addDimensionModal = function() {
			var modalInstance = $uibModal.open({
				animation: $ctrl.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'addDimensionModal.html',
				controller: 'ModalAddDimensionCtrl',
				controllerAs: '$ctrl',
				size: 'lg',	
				resolve: {
					items: function() {
						return $ctrl.items;
					}
				}
			});
		};
		$ctrl.dimensionInfoModal = function() {
			var modalInstance = $uibModal.open({
				animation: $ctrl.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'dimensionInfoModal.html',
				controller: 'ModalDimensionInfoCtrl',
				controllerAs: '$ctrl',
				size: 'lg',	
				resolve: {
					items: function() {
						return $ctrl.items;
					}
				}
			});
		};

		$ctrl.toggleAnimation = function() {
			$ctrl.animationsEnabled = !$ctrl.animationsEnabled;
		};
	})
	.controller('ModalAddDimensionCtrl', function($uibModalInstance, $scope, items) {
		var $ctrl = this;

		$ctrl.ok = function() {
			$uibModalInstance.close($ctrl.selected.item);
			$scope.$broadcast('submitPreveligeDimensionModal');
		};

		$ctrl.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('ModalDimensionInfoCtrl', function($uibModalInstance, $scope, items) {
		var $ctrl = this;
		$ctrl.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	// 维度可选查询控制器queryPrivilegeDimension4Pick
	.controller('queryDimensionFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod',function($scope, $rootScope, $log,httpMethod) {
		
		$scope.requirePaging = true, // 是否需要分页
        $scope.currentPage = 1, // 当前页
        $scope.rowNumPerPage = 4, // 每页显示行数
        $scope.totalNum = 0 // 总条数

        $scope.checkedPrivilegeDimension4Pick = []; // 已经选中的权限类型信息

		$scope.queryDimensionFormSubmit = function(currentPage) {
            $scope.checkedPrivilegeDimension4Pick = []; // 置空已选权限类型列表

            var param = {
                requirePaging: $scope.requirePaging, //是否需要分页
                currentPage: currentPage || $scope.currentPage, //当前页
                rowNumPerPage: $scope.rowNumPerPage, //每页展示行数
                totalRowNum: $scope.totalRowNum //总行数
            };
            $scope.queryDimension.operationSpecCd ? param.operationSpecCd = $scope.queryDimension.operationSpecCd : '';
            // 查询权限类型配置
            httpMethod.queryPrivilegeDimension4Pick(param).then(function(rsp) {
                $log.log('调用查询可选权限维度接口成功.');
                $rootScope.queryDimensionResultList = rsp.data;
                $scope.totalNum = rsp.data.totalNum;
            }, function() {
                $log.log('调用查询可选权限维度接口失败.');
            });
        }
	}])
	// 查询结果控制器
	.controller('queryDimensionResultCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log,httpMethod) {   
        $scope.$on('submitPreveligeDimensionModal', function(d, data) {
            $scope.addQueryDimensionFormSubmit(data);
        });
        $scope.addQueryDimensionFormSubmit = function(data) {
            // TODO 获取更改之后的信息$rootScope.modifiedQueryType提交接口；
            $log.log('弹出框表单提交', data, $rootScope.addPreveligeDimension);
        }
	}])
	

	// 权限可操作的模块弹出框控制器
	.controller('preveligeDoneModalCtrl', function($scope, $rootScope, $uibModal, $log) {
		var $ctrl = this;
		$scope.$on('openAddPreveligeDoneModal', function(d, data) {
			$ctrl.addPreveligeDoneModal(data);
		});

		$scope.$on('openBusinessModuleInfoModal', function(d, data) {
			$ctrl.businessModuleInfoModal(data);
		});

		$ctrl.animationsEnabled = true;

		$ctrl.addPreveligeDoneModal = function() {
			var modalInstance = $uibModal.open({
				animation: $ctrl.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'doneModalContent.html',
				controller: 'ModalAddPreveligeDoneCtrl',
				controllerAs: '$ctrl',
				size: 'lg',
				resolve: {
					items: function() {
						return $ctrl.items;
					}
				}
			});
		};
		$ctrl.businessModuleInfoModal = function() {
			var modalInstance = $uibModal.open({
				animation: $ctrl.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'businessModuleInfoModal.html',
				controller: 'ModalBusinessModuleInfoCtrl',
				controllerAs: '$ctrl',
				size: 'lg',
				resolve: {
					items: function() {
						return $ctrl.items;
					}
				}
			});
		};

		$ctrl.toggleAnimation = function() {
			$ctrl.animationsEnabled = !$ctrl.animationsEnabled;
		};
	})
	.controller('ModalAddPreveligeDoneCtrl', function($uibModalInstance, $scope, items) {
		var $ctrl = this;
		$ctrl.ok = function() {
			$uibModalInstance.close($ctrl.selected.item);
			$scope.$broadcast('submitPreveligeDoneModal');
		};
		$ctrl.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.controller('ModalBusinessModuleInfoCtrl', function($uibModalInstance, $scope, items) {
		var $ctrl = this;
		$ctrl.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	// 权限维度可选查询控制器
	.controller('queryDoneFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
		$scope.requirePaging = true, // 是否需要分页
        $scope.currentPage = 1, // 当前页
        $scope.rowNumPerPage = 4, // 每页显示行数
        $scope.totalNum = 0 // 总条数

        $scope.checkedPrivilegeType = []; // 已经选中的权限类型信息

		$scope.queryDoneForm = {
			businessModuleId: '',
			businessModuleName: '',
			ownerSys: 'null',
			businessModuleType: 'null',
		};
		$scope.queryDoneFormSubmit = function() {
			// TODO $http发送请求，获取数据，写入$rootScope查询结果
			$rootScope.queryDoneResultList = [{
				businessModuleId: '10101', //业务模块ID
				businessModuleName: '35352', //业务模块名称
				businessModuleType: '李明浩', //业务模块类型
				ownerSys: '南京', //所属系统
				preBusinessModule: '在用', //上级业务模块
				moduleURL: '李明浩', //模块URL
				interfaceMethod: '南京', //接口方法
				doneDescription:'',//描述
			}, {
				businessModuleId: '10102', //业务模块ID
				businessModuleName: '35352', //业务模块名称
				businessModuleType: '李明浩', //业务模块类型
				ownerSys: '南京', //所属系统
				preBusinessModule: '在用', //上级业务模块
				moduleURL: '李明浩', //模块URL
				interfaceMethod: '南京', //接口方法
				doneDescription:'',//描述
			}, {
				businessModuleId: '10103', //业务模块ID
				businessModuleName: '35352', //业务模块名称
				businessModuleType: '李明浩', //业务模块类型
				ownerSys: '南京', //所属系统
				preBusinessModule: '在用', //上级业务模块
				moduleURL: '李明浩', //模块URL
				interfaceMethod: '南京', //接口方法
				doneDescription:'',//描述
			}];
		}
		

	
	}])
	// 查询结果控制器
	.controller('queryDoneResultCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {   
        $scope.$on('submitQueryDoneModal', function(d, data) {
            $scope.addQueryDoneFormSubmit(data);
        });
        $scope.addQueryDoneFormSubmit = function(data) {
            // TODO 获取更改之后的信息$rootScope.modifiedQueryType提交接口；
            $log.log('弹出框表单提交', data, $rootScope.modifiedQueryType);
        }
	}])
	
	// 分页控制器
	.controller('paginationDimensionCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        $scope.maxSize = 4;
        $scope.pageChanged = function() {
            $scope.queryOperateFormSubmit($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }]);

    // .controller('paginationSysModularCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
    //     $scope.maxSize = 10;
    //     $scope.pageChanged = function() {
    //         $scope.preveligeDoneFormSubmit($scope.currentPage);
    //         $log.log('Page changed to: ' + $scope.currentPage);
    //     };
    // }]);


