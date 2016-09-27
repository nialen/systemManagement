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
		
		// $rootScope.operateType = ['进销存管理', '系统管理']; // 规格类型

		$rootScope.preveligeDimensionResultList = [];//权限维度列表
		$rootScope.preveligeDoneResultList = [];//权限可操作列表
		
		// $rootScope.ownerSys = ['1', '2']; 
		// $rootScope.businessModuleType = ['3', '4']; 
		
	}])
	// 修改权限规格基本信息控制器
	.controller('modifyOperateFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
		$scope.isForbid = true;
		$scope.modifyOperateForm = $.extend(true, {
			operateId: '', //权限规格ID
            operateName: '', //权限规格名称
            operateType: '', //权限类型
            operateCode: '', //权限规格编码
            description:'',//地区描述
		}, $rootScope.modifiedOperateSpec);

		$scope.modifyOperateFormSubmit = function() {
			// TODO $http发送请求，获取数据$scope.modifyStaffForm;
			$log.log($scope.isForbid, $scope.modifyOperateForm);
		};
		
		// 监听响应变化
		$scope.$watch('modifiedOperateSpec', function(current, old, scope) {
			if (current.operateId !== old.operateId || current.operateName !== old.operateName) {
				scope.modifyOperateForm.operateId = $rootScope.modifiedOperateSpec.operateId;
				scope.modifyOperateForm.operateName = $rootScope.modifiedOperateSpec.operateName;
			}
		}, true);
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

	// 权限维度弹出框控制器
	// TODO 删除冗余代码
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
	// 维度查询控制器
	.controller('queryDimensionFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
		$scope.isForbid = true;
		$scope.queryDimensionForm = {
			dimensionCode: '',
			dimensionName: '',
		};
		$scope.queryDimensionFormSubmit = function() {
			// TODO $http发送请求，获取数据，写入$rootScope查询结果
			$rootScope.queryDimensionResultList = [{
				dimensionCode: '10101', //权限维度编码
				dimensionName: '35352', //权限维度名称
				remark: '李明浩', //描述
				moveSQL: '南京', //动态SQL
				dataType: '在用', //数据类型
			}, {
				dimensionCode: '10101', //权限维度编码
				dimensionName: '35352', //权限维度名称
				remark: '李明浩', //描述
				moveSQL: '南京', //动态SQL
				dataType: '在用', //数据类型
			}, {
				dimensionCode: '10101', //权限维度编码
				dimensionName: '35352', //权限维度名称
				remark: '李明浩', //描述
				moveSQL: '南京', //动态SQL
				dataType: '在用', //数据类型
			}];
		}
		$scope.$watch('queryDimensionForm', function(current, old, scope) {
			if (scope.queryDimensionForm.dimensionCode || scope.queryDimensionForm.dimensionName) {
				scope.isForbid = false;
			} else {
				scope.isForbid = true;
			}
		}, true);
	}])
	// 查询结果控制器
	.controller('queryDimensionResultCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {   
        $scope.$on('submitPreveligeDimensionModal', function(d, data) {
            $scope.addQueryDimensionFormSubmit(data);
        });
        $scope.addQueryDimensionFormSubmit = function(data) {
            // TODO 获取更改之后的信息$rootScope.modifiedQueryType提交接口；
            $log.log('弹出框表单提交', data, $rootScope.addPreveligeDimension);
        }
	}])
	
	// 权限可操作查询控制器
	.controller('preveligeDoneFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
		$scope.isForbid = false;	
		$rootScope.preveligeDoneResultList = [{
			businessModuleId:'10101',
       		businessModuleName:'地区',
       		doneDescription:'可操作',
		}, {
			businessModuleId:'10103',
       		businessModuleName:'地区',
       		doneDescription:'可操作',
		}];
        
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
	// 权限可操作的模块弹出框控制器
	// TODO 删除冗余代码
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
	// 查询控制器
	.controller('queryDoneFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
		$scope.isForbid = true;
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
		$scope.$watch('queryDoneForm', function(current, old, scope) {
			if (scope.queryDoneForm.businessModuleId || scope.queryDoneForm.businessModuleName||scope.queryDoneForm.ownerSys||scope.queryDoneForm.businessModuleType) {
				scope.isForbid = false;
			} else {
				scope.isForbid = true;
			}
		}, true);
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