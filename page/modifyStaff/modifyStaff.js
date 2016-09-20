/**
 * Auth 丁少华
 * Date 2016-09-13
 */

angular
	.module('modifyStaff', ['ui.bootstrap'])
	.run(['$rootScope', '$parse', '$log', function($rootScope, $parse, $log) {
		var id = window.frameElement && window.frameElement.id || '',
			obj = parent.$('#' + id).attr('data');
		$rootScope.modifiedStaffMan = obj ? JSON.parse(obj) : {}; // 待修改的员工信息
		$rootScope.isForbidSubmit = true; // 禁用编辑员工提交按钮
		$rootScope.areaList = ['南京', '镇江', '丹阳']; // 地区列表
		// 员工选择弹框内部信息
		$rootScope.staffManResultList = []; // 查询员工列表
		$rootScope.checkedStaffMan = {}; // 选中的员工信息
		$rootScope.checkedIndex = ''; // 选中的索引
	}])
	// 修改用户控制器
	.controller('modifyStaffFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
		$scope.isForbid = true;
		$scope.modifyStaffForm = $.extend(true, {
			userId: '', //用户ID
			userAccount: '', //用户账户
			staffJobId: '', //员工工号
			staffName: '', //员工姓名
			staffPhoneNum: '', //手机号码
			systemPassword: '888888', //系统密码
			confirmPassword: '888888', //确认密码
			remark: '', //备注
			checkDefault: true //默认密码
		}, $rootScope.modifiedStaffMan);

		$scope.modifyStaffFormSubmit = function() {
			// TODO $http发送请求，获取数据$scope.modifyStaffForm;
			$log.log($scope.isForbid, $scope.modifyStaffForm);
		};
		// 员工选择
		$scope.checkStaffMan = function(index) {
			$scope.$emit('openCheckStaffManModal');
		}
		$scope.$watch('modifyStaffForm', function(current, old, scope) {
			if (scope.modifyStaffForm.staffJobId || scope.modifyStaffForm.staffName || scope.modifyStaffForm.staffPhoneNum) {
				scope.isForbid = false;
			} else {
				scope.isForbid = true;
			}
		}, true);
		// 监听响应变化
		$scope.$watch('modifiedStaffMan', function(current, old, scope) {
			if (current.staffJobId !== old.staffJobId || current.staffName !== old.staffName) {
				scope.modifyStaffForm.staffJobId = $rootScope.modifiedStaffMan.staffJobId;
				scope.modifyStaffForm.staffName = $rootScope.modifiedStaffMan.staffName;
			}
		}, true);
	}])
	// 弹出框控制器
	// TODO 删除冗余代码
	.controller('selectStaffManModalCtrl', function($scope, $rootScope, $uibModal, $log) {
		var $ctrl = this;
		$scope.$on('openCheckStaffManModal', function(d, data) {
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
	// 查询控制器
	.controller('queryStaffFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
		$scope.isForbid = true;
		$scope.queryStaffForm = {
			staffId: '',
			staffName: '',
			staffArea: null,
		};
		$scope.queryStaffFormSubmit = function() {
			// TODO $http发送请求，获取数据，写入$rootScope查询结果
			$rootScope.staffManResultList = [{
				staffId: '10101', //员工ID
				staffJobId: '35352', //员工工号
				staffName: '李明浩', //员工姓名
				staffArea: '南京', //归属地区
				status: '在用', //状态
				createDate: '2016-01-12', //创建时间
				lastModifiedDate: '2016-01-30', //最后修改时间
			}, {
				staffId: '20306', //员工ID
				staffJobId: '64201', //员工工号
				staffName: '张晓东', //员工姓名
				staffArea: '南京', //归属地区
				status: '在用', //状态
				createDate: '2016-02-22', //创建时间
				lastModifiedDate: '2016-02-28', //最后修改时间
			}, {
				staffId: '10101', //员工ID
				staffJobId: '35352', //员工工号
				staffName: '李明浩', //员工姓名
				staffArea: '南京', //归属地区
				status: '在用', //状态
				createDate: '2016-01-12', //创建时间
				lastModifiedDate: '2016-01-30', //最后修改时间
			}, {
				staffId: '20306', //员工ID
				staffJobId: '64201', //员工工号
				staffName: '张晓东', //员工姓名
				staffArea: '南京', //归属地区
				status: '在用', //状态
				createDate: '2016-02-22', //创建时间
				lastModifiedDate: '2016-02-28', //最后修改时间
			}];
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
		// 选中索引
		$scope.selectStaffMan = function(index) {
			$rootScope.checkedStaffMan = $rootScope.staffManResultList[index];
		}
		$scope.$on('submitStaffManModal', function(d, data) {
			$scope.selectStaffManFormSubmit(data);
		});
		$scope.selectStaffManFormSubmit = function(data) {
			// 更新数据为选择的员工信息
			$rootScope.modifiedStaffMan.staffJobId = $rootScope.checkedStaffMan.staffJobId;
			$rootScope.modifiedStaffMan.staffName = $rootScope.checkedStaffMan.staffName;
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