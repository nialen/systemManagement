/**
 * Auth 
 * Date 2016-09-13
 */

angular
	.module('modifyOperate', ['ui.bootstrap'])
	.run(['$rootScope', '$parse', '$log', function($rootScope, $parse, $log) {
		var id = window.frameElement && window.frameElement.id || '',
			obj = parent.$('#' + id).attr('data');
		$rootScope.modifiedOperateSpec = obj ? JSON.parse(obj) : {}; // 待修改的员工信息
		$rootScope.operateType = ['进销存管理', '系统管理']; // 地区列表

		$rootScope.ownerSys = ['1', '2']; 
		$rootScope.businessModuleType = ['3', '4']; 
		
	}])
	// 修改基本信息控制器
	.controller('modifyOperateFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
		$scope.isForbid = true;
		$scope.modifyOperateForm = $.extend(true, {
			operateId: '10101', //权限规格ID
            operateName: '采购入库', //权限规格名称
            operateType: '进销存管理', //权限类型
            operateCode: '前台页面', //权限规格编码
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
        // 新建
        $scope.addPreveligeDimension = function(title) {
            $rootScope.addPreveligeDimension = {};
            $rootScope.modalTitle = title;
            $scope.$emit('openAddPreveligeDimensionModal');
        }
	}])

	// 权限维度弹出框控制器
	// TODO 删除冗余代码
	.controller('addPreveligeDimensionModalCtrl', function($scope, $rootScope, $uibModal, $log) {
		var $ctrl = this;
		$scope.$on('openAddPreveligeDimensionModal', function(d, data) {
			$ctrl.open(data);
		});
		$ctrl.items = ['item1', 'item2', 'item3'];

		$ctrl.animationsEnabled = true;

		$ctrl.open = function() {
			var modalInstance = $uibModal.open({
				animation: $ctrl.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'dimensionContent.html',
				controller: 'ModalDimensionCtrl',
				controllerAs: '$ctrl',
				size: 'lg',
				resolve: {
					items: function() {
						return $ctrl.items;
					}
				}
			});
			modalInstance.result.then(function(selectedItem) {
				$ctrl.selected = selectedItem;
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};

		$ctrl.openComponentModal = function() {
			var modalInstance = $uibModal.open({
				animation: $ctrl.animationsEnabled,
				component: 'modalComponent',
				resolve: {
					items: function() {
						return $ctrl.items;
					}
				}
			});

			modalInstance.result.then(function(selectedItem) {
				$ctrl.selected = selectedItem;
			}, function() {
				$log.info('modal-component dismissed at: ' + new Date());
			});
		};

		$ctrl.toggleAnimation = function() {
			$ctrl.animationsEnabled = !$ctrl.animationsEnabled;
		};
	})
	.controller('ModalDimensionCtrl', function($uibModalInstance, $scope, items) {
		var $ctrl = this;
		$ctrl.items = items;
		$ctrl.selected = {
			item: $ctrl.items[0]
		};

		$ctrl.ok = function() {
			$uibModalInstance.close($ctrl.selected.item);
			$scope.$broadcast('submitPreveligeDimensionModal');
		};

		$ctrl.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.component('modalComponent', {
		templateUrl: 'dimensionContent.html',
		bindings: {
			resolve: '<',
			close: '&',
			dismiss: '&'
		},
		controller: function() {
			var $ctrl = this;

			$ctrl.$onInit = function() {
				$ctrl.items = $ctrl.resolve.items;
				$ctrl.selected = {
					item: $ctrl.items[0]
				};
			};

			$ctrl.ok = function() {
				$ctrl.close({
					$value: $ctrl.selected.item
				});
			};

			$ctrl.cancel = function() {
				$ctrl.dismiss({
					$value: 'cancel'
				});
			};
		}
	})
	// 查询控制器
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
        $scope.$on('submitQueryDimensionModal', function(d, data) {
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
       		remark:'可操作',
		}, {
			businessModuleId:'10101',
       		businessModuleName:'地区',
       		remark:'可操作',
		}];
        // 新建
        $scope.addPreveligeDone = function(title) {
            $rootScope.addPreveligeDone = {};
            $rootScope.modalTitle = title;
            $scope.$emit('openAddPreveligeDoneModal');
        }
	}])
	// 权限可操作的模块弹出框控制器
	// TODO 删除冗余代码
	.controller('addPreveligeDoneModalCtrl', function($scope, $rootScope, $uibModal, $log) {
		var $ctrl = this;
		$scope.$on('openAddPreveligeDoneModal', function(d, data) {
			$ctrl.open(data);
		});
		$ctrl.items = ['item1', 'item2', 'item3'];

		$ctrl.animationsEnabled = true;

		$ctrl.open = function() {
			var modalInstance = $uibModal.open({
				animation: $ctrl.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'doneModalContent.html',
				controller: 'ModalDoneCtrl',
				controllerAs: '$ctrl',
				size: 'lg',
				resolve: {
					items: function() {
						return $ctrl.items;
					}
				}
			});
			modalInstance.result.then(function(selectedItem) {
				$ctrl.selected = selectedItem;
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};

		$ctrl.openComponentModal = function() {
			var modalInstance = $uibModal.open({
				animation: $ctrl.animationsEnabled,
				component: 'modalComponent',
				resolve: {
					items: function() {
						return $ctrl.items;
					}
				}
			});

			modalInstance.result.then(function(selectedItem) {
				$ctrl.selected = selectedItem;
			}, function() {
				$log.info('modal-component dismissed at: ' + new Date());
			});
		};

		$ctrl.toggleAnimation = function() {
			$ctrl.animationsEnabled = !$ctrl.animationsEnabled;
		};
	})
	.controller('ModalDoneCtrl', function($uibModalInstance, $scope, items) {
		var $ctrl = this;
		$ctrl.items = items;
		$ctrl.selected = {
			item: $ctrl.items[0]
		};

		$ctrl.ok = function() {
			$uibModalInstance.close($ctrl.selected.item);
			$scope.$broadcast('submitPreveligeDoneModal');
		};

		$ctrl.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.component('modalComponent', {
		templateUrl: 'doneModalContent.html',
		bindings: {
			resolve: '<',
			close: '&',
			dismiss: '&'
		},
		controller: function() {
			var $ctrl = this;

			$ctrl.$onInit = function() {
				$ctrl.items = $ctrl.resolve.items;
				$ctrl.selected = {
					item: $ctrl.items[0]
				};
			};

			$ctrl.ok = function() {
				$ctrl.close({
					$value: $ctrl.selected.item
				});
			};

			$ctrl.cancel = function() {
				$ctrl.dismiss({
					$value: 'cancel'
				});
			};
		}
	})
	// 查询控制器
	.controller('queryDoneFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
		$scope.isForbid = true;
		$scope.queryDoneForm = {
			businessModuleId: '',
			businessModuleName: '',
			ownerSys: '',
			businessModuleType: '',
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
			if (scope.queryDoneForm.businessModuleId || scope.queryDoneForm.businessModuleName) {
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