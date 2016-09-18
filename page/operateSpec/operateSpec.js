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
		// 修改
		// $scope.editQueryOperate = function(index) {
		// 	$rootScope.modifiedQueryOperate = $rootScope.queryOperateResultList[index];
		// 	$scope.$emit('openEditQueryOperateModal');
		// }

		//详情
		$scope.infoQueryOperate = function(index) {
			$rootScope.detailQueryOperate = $rootScope.queryOperateResultList[index];
			$scope.$emit('openDetailQueryOperateModal');
		}

		// 新建
		// $scope.addQueryOperate = function() {
		// 	$rootScope.modifiedQueryOperate = {};
		// 	$scope.$emit('openEditQueryOperateModal');
		// }
	}])
	// 弹出框控制器
	// TODO 删除冗余代码
	// TODO 弹出样式调整；弹出框的OK按钮绑定提交表单操作；
	.controller('detailQueryOperateModalCtrl', function($scope, $rootScope, $uibModal, $log) {
		var $ctrl = this;
		$scope.$on('openDetailQueryOperateModal', function(d, data) {
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