/**
 * Auth 
 * Date 2016-09-07
 */

angular
 	.module('privilegeTypeModule', ['ui.bootstrap'])
    .run(['$rootScope', function($rootScope) {
        // debugger
    	$rootScope.queryTypeResultList = []; // 查询
		$rootScope.modifiedQueryType = {}; // 待修改
	}])
	// 查询控制器
    .controller('queryTypeFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
		// debugger
        $scope.isForbid = true;
		$scope.queryTypeForm = {
			typeId: '',
			typeName: '',
		};
        $scope.queryTypeFormSubmit = function() {
            // TODO $http发送请求，获取数据，写入$rootScope；
            // TODO查询结果
    		$rootScope.queryTypeResultList = [{
	            typeId: '10101', //权限类型编码
				typeName: '进销存管理', //权限类型名称
				typeRulePreCode: '10002', //权限规格编码前缀
    			description: '', //描述
    	    }, {
	            typeId: '10103', //权限类型编码
				typeName: '进销存管理', //权限类型名称
				typeRulePreCode: '10002', //权限规格编码前缀
				description: '', //描述
    	    }, {
	            typeId: '10102', //权限类型编码
				typeName: '进存管理', //权限类型名称
				typeRulePreCode: '10002', //权限规格编码前缀
				description: '', //描述
    	    }];
            $log.log($scope.queryTypeForm.typeId);
        }
		$scope.$watch('queryTypeForm', function(current, old, scope) {
            if (scope.queryTypeForm.typeId || scope.queryTypeForm.typeName) {
                scope.isForbid = false;
            } else {
                scope.isForbid = true;
            }
        }, true);
	}])
	// 查询结果控制器
    .controller('privilegeTypeResultCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        // 修改
        $scope.editQueryType = function(index) {
            $rootScope.modifiedQueryType = $rootScope.queryTypeResultList[index];
            $scope.$emit('openEditQueryTypeModal');
        }
        // 新建
        $scope.addQueryType = function() {
            $rootScope.modifiedQueryType = {};
            $scope.$emit('openEditQueryTypeModal');
        }
    }])
	// 弹出框控制器
    // TODO 删除冗余代码
    // TODO 弹出样式调整；弹出框的OK按钮绑定提交表单操作；
    .controller('editQueryTypeModalCtrl', function($scope, $rootScope, $uibModal, $log) {
    	var $ctrl = this;
        $scope.$on('openEditQueryTypeModal', function(d,data) {  
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
            $scope.$broadcast('submitQueryTypeModal');
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
    // 编辑控制器
    .controller('editQueryTypeFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.$on('submitQueryTypeModal', function(d, data) {
            $scope.editQueryTypeFormSubmit(data);
        });
        $scope.$watch('modifiedQueryType', function(current, old, scope) {        
            if (scope.modifiedQueryType.typeId && scope.modifiedQueryType.typeName ) {
                $rootScope.isForbidSubmit = false;
            } else {
                $rootScope.isForbidSubmit = true;
            }
        }, true);
        $scope.editQueryTypeFormSubmit = function(data) {
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