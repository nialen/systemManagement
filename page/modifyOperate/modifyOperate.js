/**
 * Auth 
 * Date 2016-09-13
 */

angular
	.module('modifyOperate', ['ui.bootstrap'])
	.run(['$rootScope', '$parse', '$log', function($rootScope, $parse, $log) {
		 debugger
		var id = window.frameElement && window.frameElement.id || '',
			obj = parent.$('#' + id).attr('data');
		$rootScope.modifiedOperateSpec = obj ? JSON.parse(obj) : {}; // 待修改的员工信息
	
		$rootScope.operateType = ['进销存管理', '系统管理']; // 地区列表
		
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

		// $scope.infoPreveligeDimension = function(title,index) {
  //           $rootScope.modifiedQueryType = $rootScope.queryTypeResultList[index];
  //           $rootScope.modalTitle = title;
  //           $scope.$emit('openInfoQueryTypeModal');
  //       }
        // 新建
        $scope.addPreveligeDimension = function(title) {
            $rootScope.addPreveligeDimension = {};
            $rootScope.modalTitle = title;
            $scope.$emit('openAddPreveligeDimensionModal');
        }
	}])

	// 权限维度弹出框控制器
	// TODO 删除冗余代码
	.controller('AddPreveligeDimensionModalCtrl', function($scope, $rootScope, $uibModal, $log) {
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
			$scope.$broadcast('submitPreveligeDimensionModal');
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
		// $scope.$on('submitPreveligeDimensionModal', function(d, data) {
  //           $scope.addQueryTypeFormSubmit(data);
  //       });
        
        $scope.addQueryTypeFormSubmit = function(data) {
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