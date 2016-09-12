/**
 * Auth 丁少华
 * Date 2016-09-07
 */

angular
	.module('staffManModule', ['ui.bootstrap'])
	.run(['$rootScope', function($rootScope) {
		$rootScope.staffManResultList = []; // 查询员工列表
		$rootScope.modifiedStaffMan = {}; // 待修改的员工信息
		$rootScope.isForbidSubmit = true; // 禁用编辑员工提交按钮
		$rootScope.areaList = ['南京', '镇江', '丹阳']; // 地区列表
	}])
	// 查询控制器
	.controller('queryStaffFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
		$scope.isForbid = true;
		$scope.queryStaffForm = {
			staffId: '',
			staffName: '',
			staffArea: null,
		};
		$scope.queryStaffFormSubmit = function() {
			// TODO $http发送请求，获取数据，写入$rootScope；
			// TODO查询结果
			$rootScope.staffManResultList = [{
				staffId: '10101', //员工ID
				staffJobId: '35352', //员工工号
				staffName: '李明浩', //员工姓名
				staffArea: '南京', //归属地区
				status: '在用', //状态
				creatDate: '2016-01-12', //创建时间
				lastModifiedDate: '2016-01-30', //最后修改时间
			}, {
				staffId: '20306', //员工ID
				staffJobId: '64201', //员工工号
				staffName: '张晓东', //员工姓名
				staffArea: '南京', //归属地区
				status: '在用', //状态
				creatDate: '2016-02-22', //创建时间
				lastModifiedDate: '2016-02-28', //最后修改时间
			}, {
				staffId: '10101', //员工ID
				staffJobId: '35352', //员工工号
				staffName: '李明浩', //员工姓名
				staffArea: '南京', //归属地区
				status: '在用', //状态
				creatDate: '2016-01-12', //创建时间
				lastModifiedDate: '2016-01-30', //最后修改时间
			}, {
				staffId: '20306', //员工ID
				staffJobId: '64201', //员工工号
				staffName: '张晓东', //员工姓名
				staffArea: '南京', //归属地区
				status: '在用', //状态
				creatDate: '2016-02-22', //创建时间
				lastModifiedDate: '2016-02-28', //最后修改时间
			}];
			$log.log($scope.queryStaffForm.staffId);
		}
		$scope.$watch('queryStaffForm', function(current, old, scope) {
			if (scope.queryStaffForm.staffId || scope.queryStaffForm.staffName || scope.queryStaffForm.staffArea) {
				scope.isForbid = false;
			} else {
				scope.isForbid = true;
			}
		}, true);
	}])
	// 查询结果控制器
	.controller('staffManResultCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
		// 修改
		$scope.editStaffMan = function(index) {
			$rootScope.modifiedStaffMan = $rootScope.staffManResultList[index];
			$scope.$emit('openEditStaffManModal');
		}
		// 新建
		$scope.addStaffMan = function() {
			$rootScope.modifiedStaffMan = {};
			$scope.$emit('openEditStaffManModal');
		}
	}])
	// 弹出框控制器
	// TODO 删除冗余代码
	// TODO 弹出样式调整；弹出框的OK按钮绑定提交表单操作；
	.controller('editStaffManModalCtrl', function($scope, $rootScope, $uibModal, $log) {
		var $ctrl = this;
		$scope.$on('openEditStaffManModal', function(d, data) {
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
			$scope.$broadcast('submitStaffManModal');
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
	// 编辑员工信息控制器
	.controller('editStaffManFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
		$scope.$on('submitStaffManModal', function(d, data) {
			$scope.editStaffManFormSubmit(data);
		});
		$scope.$watch('modifiedStaffMan', function(current, old, scope) {
			if (scope.modifiedStaffMan.staffJobId && scope.modifiedStaffMan.staffName && scope.modifiedStaffMan.staffArea) {
				$rootScope.isForbidSubmit = false;
			} else {
				$rootScope.isForbidSubmit = true;
			}
		}, true);
		$scope.editStaffManFormSubmit = function(data) {
			// TODO 获取更改之后的员工信息$rootScope.modifiedStaffMan提交接口；
			$log.log('弹出框表单提交', data, $rootScope.modifiedStaffMan);
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