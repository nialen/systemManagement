/**
 * Auth heyue
 * Date 2016-09-19
 */

angular
	.module('modifyPower', ['ui.bootstrap'])
	.run(['$rootScope', '$parse', '$log', function($rootScope, $parse, $log) {
		var id = window.frameElement && window.frameElement.id || '',
			obj = parent.$('#' + id).attr('data');
		$rootScope.modifiedPowerList = obj ? JSON.parse(obj) : {}; // 待修改的模块信息
		$rootScope.isForbidSubmit = true; // 禁用编辑模块提交按钮
		$rootScope.powerTypeList = ['进销存管理', '销售管理', '库存管理']; // 权限类型
		// 模块选择弹框内部信息
		$rootScope.powerListResultList = []; // 查询模块列表
		$rootScope.checkedPowerList = {}; // 选中的模块信息
		$rootScope.checkedIndex = ''; // 选中的索引
		$rootScope.powerList = [
			{
				powerId: '10101', //权限规格ID
				powerCode: '10101', //权限规格编码
				powerType: '进销存管理', //权限类型
				powerSupmodule: '处理采购业务的所有权限'//备注
			},
			{
				powerId: '20306', //权限规格ID
				powerCode: '20306', //权限规格编码
				powerType: '进销存管理', //权限类型
				powerSupmodule: '处理采购业务的所有权限'//备注
			}
		]; // 权限类型
	}])
	// 修改用户控制器
	.controller('modifySysFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
		$scope.isForbid = true;
		$scope.modifySysForm = $.extend(true, {
			powerId: '', //权限规格ID
			powerCode: '', //权限规格编码
			powerType: '', //权限类型
			powerSupmodule: '' //备注
		}, $rootScope.modifiedPowerList);

		$scope.modifySysFormSubmit = function() {
			// TODO $http发送请求，获取数据$scope.modifySysForm;
			$log.log($scope.isForbid, $scope.modifySysForm);
		};
		// 模块选择
		$scope.checkPowerlist = function(index) {
			$scope.$emit('opencheckPowerlistModal');
		}
		$scope.$watch('modifySysForm', function(current, old, scope) {
			if ( scope.modifySysForm.powerId || scope.modifySysForm.powerCode 
				|| scope.modifySysForm.powerType) {
				scope.isForbid = false;
			} else {
				scope.isForbid = true;
			}
		}, true);
		// 监听响应变化
		$scope.$watch('modifiedPowerList', function(current, old, scope) {
			if ( current.powerId !== old.powerId || current.powerCode !== old.powerCode 
				|| current.powerType !== old.powerType || current.powerSupmodule !== old.powerSupmodule) {
				scope.modifySysForm.powerId = $rootScope.modifiedPowerList.powerId;
				scope.modifySysForm.powerCode = $rootScope.modifiedPowerList.powerCode;
				scope.modifySysForm.powerType = $rootScope.modifiedPowerList.powerType;
				scope.modifySysForm.powerSupmodule = $rootScope.modifiedPowerList.powerSupmodule;
			}
		}, true);
	}])
	// 弹出框控制器
	// TODO 删除冗余代码
	.controller('selectPowerModalCtrl', function($scope, $rootScope, $uibModal, $log) {
		var $ctrl = this;
		$scope.$on('opencheckPowerlistModal', function(d, data) {
			$ctrl.open(data);
		});
		$ctrl.items = ['item1', 'item2', 'item3'];

		$ctrl.animationsEnabled = true;

		$ctrl.open = function() {
			var modalInstance = $uibModal.open({
				animation: $ctrl.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'myModalContent.html',
				controller: 'ModalInstanceCtrl',
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
	.controller('ModalInstanceCtrl', function($uibModalInstance, $scope, items) {
		var $ctrl = this;
		$ctrl.items = items;
		$ctrl.selected = {
			item: $ctrl.items[0]
		};

		$ctrl.ok = function() {
			$uibModalInstance.close($ctrl.selected.item);
			$scope.$broadcast('submitSysListModal');
		};

		$ctrl.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	.component('modalComponent', {
		templateUrl: 'myModalContent.html',
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
	.controller('queryPowerFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
		$scope.isForbid = true;
		$scope.queryPowerlist = {
			powerId: '',
			powerCode: '',
			powerType: null,
		};
		$scope.queryPowerFormSubmit = function() {
			// TODO $http发送请求，获取数据，写入$rootScope查询结果
			$rootScope.powerListResultList = [{
				powerId: '10101', //权限规格ID
                powerCode: '10101', //权限规格编码
                powerType: '进销存管理',//权限类型
                powerSupmodule: '采购出入库操作权限',//备注
			}, {
				powerId: '20306', //权限规格ID
                powerCode: '20306', //权限规格编码
                powerType: '进销存管理',//权限类型
                powerSupmodule: '库存盘点录入操作权限',//备注
			}];
		}
		$scope.$watch('queryPowerlist', function(current, old, scope) {
			if ( scope.queryPowerlist.powerId || scope.queryPowerlist.powerCode 
				|| scope.queryPowerlist.powerType ) {
				scope.isForbid = false;
			} else {
				scope.isForbid = true;
			}
		}, true);
	}])
	// 查询结果控制器
	.controller('PowerListResultCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
		// 选中索引
		$scope.selectPowerList = function(index) {
			$rootScope.checkedPowerList = $rootScope.powerListResultList[index];
		}
		$scope.$on('submitSysListModal', function(d, data) {
			$scope.selectPowerListFormSubmit(data);
		});
		$scope.selectPowerListFormSubmit = function(data) {
			// 更新数据为选择的员工信息
			$rootScope.modifiedPowerList.powerId = $rootScope.checkedPowerList.powerId;
			$rootScope.modifiedPowerList.powerCode = $rootScope.checkedPowerList.powerCode;
			$rootScope.modifiedPowerList.powerType = $rootScope.checkedPowerList.powerType;
			$rootScope.modifiedPowerList.powerSupmodule = $rootScope.checkedPowerList.powerSupmodule;
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