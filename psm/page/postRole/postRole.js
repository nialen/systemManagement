/**
 * Auth heyue
 * Date 2016-09-12
 */

angular
    .module('RoleModule', ['ui.bootstrap'])
    .run(['$rootScope', function($rootScope) {
    	$rootScope.RoleList = []; // 查询角色列表
		$rootScope.modifiedRole = {}; // 待修改的角色信息
        $rootScope.isForbidSubmit = true; // 禁用编辑模块提交按钮
        $rootScope.RoleType = ['进销存管理']; // 业务模块类型
	}])
    // 查询控制器
    .controller('queryRoleFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.isForbid = true;
        $scope.queryRoleForm = {
            RoleId: '',
            RoleName: '',
            RoleType: 'null',
        };
        $scope.queryRoleFormSubmit = function() {
        	// TODO $http发送请求，获取数据，写入$rootScope；
        	// TODO查询结果
	        $rootScope.RoleList = [{
	            roleId: '10101', //角色ID
                roleName: '采购员', //角色名称
                roleDescribe:'负责采购业务的操作人员',//描述
                roleStart: '2016-01-24',//生效时间
                roleExpire : '2016-03-12',//失效时间              
	        }, {
                roleId: '20306', //角色ID
                roleName: '采购员', //角色名称
                roleDescribe:'负责采购业务的操作人员',//描述
                roleStart: '2016-03-20',//生效时间
                roleExpire : '2016-05-11',//失效时间              
            }];
            $log.log($scope.queryRoleForm.roleId);
        }
        $scope.$watch('queryRoleForm', function(current, old, scope) {
            if (scope.queryRoleForm.roleId || scope.queryRoleForm.roleName || 
                scope.queryRoleForm.roleDescribe) {
                scope.isForbid = false;
            } else {
                scope.isForbid = true;
            }
        }, true)
    }])
    // 查询结果控制器
    .controller('RoleResultCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        // 修改
        $scope.editRole = function(index, title) {
            $rootScope.modifiedRole = $rootScope.RoleList[index];
            $rootScope.RoleTitle = title;
            $scope.$emit('openEditRoleModal');
        }
        // 新建
        $scope.addRole = function() {
        /*
            $rootScope.modifiedRole = {};
            $rootScope.RoleTitle = '新建角色'; 
            $scope.$emit('openEditRoleModal');
        */
            parent.angular.element(parent.$('#tabs')).scope().addTab('新建角色', '/psm/page/postRole/addrole/addrole.html', 'addNewrole');
        }
        // 子iframe调用父iframe控制器内方法；
        $scope.demo = function() {
            parent.angular.element(parent.$('#tabs')).scope().addTab('新建角色', '/psm/page/postRole/postRole.html');
            // $log.log(parent.angular.element($('#tabs')).abbTabs, '父层iframe');
        }
    }])
    // 弹出框控制器
    // TODO 删除冗余代码
    // TODO 弹出样式调整；弹出框的OK按钮绑定提交表单操作；
    .controller('editRoleModalCtrl', function($scope, $rootScope, $uibModal, $log) {
        var $ctrl = this;
    	$scope.$on('openEditRoleModal', function(d,data) {  
	        $ctrl.open(data); 
	    });
        $ctrl.items = ['item1', 'item2', 'item3'];

        $ctrl.animationsEnabled = true;

        $ctrl.open = function() {
            var modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModularContent.html',
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
            $scope.$broadcast('submitRoleModal');
        };

        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .component('modalComponent', {
        templateUrl: 'myModularContent.html',
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
    // 编辑模块信息控制器
    .controller('editRoleFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.$on('submitRoleModal', function(d, data) {
            $scope.editRoleFormSubmit(data);
        });
        $scope.$watch('modifiedRole', function(current, old, scope) {
            if ( scope.modifiedRole.roleId && scope.modifiedRole.roleName && 
                scope.modifiedRole.roleDescribe ) {
                $rootScope.isForbidSubmit = false;
            } else {
                $rootScope.isForbidSubmit = true;
            }
        }, true);
        $scope.editRoleFormSubmit = function(data) {
            // TODO 获取更改之后的模块信息$rootScope.modifiedSys提交接口；
            $log.log('弹出框表单提交', data, $rootScope.modifiedRole);
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
