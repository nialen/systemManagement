/**
 * Auth heyue
 * Date 2016-09-12
 */

angular
    .module('SysModule', ['ui.bootstrap'])
    .run(['$rootScope', function($rootScope) {
    	$rootScope.SysResultList = []; // 查询模块列表
		$rootScope.modifiedSys = {}; // 待修改的模块信息
        $rootScope.isForbidSubmit = true; // 禁用编辑模块提交按钮
        $rootScope.sysType = ['前台页面', '后台页面', '销售页面', '业绩页面']; // 业务模块类型
        $rootScope.systemList = ['进销存系统', '管理系统', '销售系统']; // 所属系统
	}])
    // 查询控制器
    .controller('querySysFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.isForbid = true;
        $scope.querySysForm = {
            sysId: '',
            sysName: '',
            sysType: 'null',
        };
        $scope.querySysFormSubmit = function() {
        	// TODO $http发送请求，获取数据，写入$rootScope；
        	// TODO查询结果
	        $rootScope.SysResultList = [{
	            sysId: '10101', //业务模块ID
                sysName: '采购入库', //业务模块名称
                sysType: '前台页面',//业务模块类型
                sysSystem: '进销存系统',//所属系统
                sysSupmodule: '采购管理',//上级业务模块
                sysUrl:'',//模块URL
                sysInterface:'',//接口方法
                sysDescribe:'',//描述                
	        }, {
	            sysId: '20306', //业务模块ID
                sysName: '采购入库', //业务模块名称
                sysType: '前台页面',//业务模块类型
                sysSystem: '进销存系统',//所属系统
                sysSupmodule: '采购管理',//上级业务模块
                sysUrl:'',//模块URL
                sysInterface:'',//接口方法
                sysDescribe:'',//描述 
	        }, {
                sysId: '30000', //业务模块ID
                sysName: '采购入库', //业务模块名称
                sysType: '后台页面',//业务模块类型
                sysSystem: '管理系统',//所属系统
                sysSupmodule: '库存管理',//上级业务模块
                sysUrl:'',//模块URL
                sysInterface:'',//接口方法
                sysDescribe:'',//描述 
            }, {
                sysId: '40000', //业务模块ID
                sysName: '销售出库', //业务模块名称
                sysType: '销售页面',//业务模块类型
                sysSystem: '销售系统',//所属系统
                sysSupmodule: '销售管理',//上级业务模块
                sysUrl:'',//模块URL
                sysInterface:'',//接口方法
                sysDescribe:'',//描述 
            }];
            $log.log($scope.querySysForm.sysId);
        }
        $scope.$watch('querySysForm', function(current, old, scope) {
            if (scope.querySysForm.sysId || scope.querySysForm.sysName || 
                scope.querySysForm.sysType || scope.querySysForm.sysSystem) {
                scope.isForbid = false;
            } else {
                scope.isForbid = true;
            }
        }, true)
    }])
    // 查询结果控制器
    .controller('SysResultCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        // 修改
        $scope.editSys = function(index, title) {
            $rootScope.modifiedSys = $rootScope.SysResultList[index];
            $rootScope.syeTitle = title;
            $scope.$emit('openEditSysModal');
        }
        // 新建
        $scope.addSys = function() {
            $rootScope.modifiedSys = {};
            $rootScope.syeTitle = '新建模块'; 
            $scope.$emit('openEditSysModal');
        }
        // 子iframe调用父iframe控制器内方法；
        $scope.demo = function() {
            parent.angular.element(parent.$('#tabs')).scope().addTab('新建模块', '/page/privilegeType/privilegeType.html');
            // $log.log(parent.angular.element($('#tabs')).abbTabs, '父层iframe');
        }
    }])
    // 弹出框控制器
    // TODO 删除冗余代码
    // TODO 弹出样式调整；弹出框的OK按钮绑定提交表单操作；
    .controller('editSysModalCtrl', function($scope, $rootScope, $uibModal, $log) {
        var $ctrl = this;
    	$scope.$on('openEditSysModal', function(d,data) {  
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
            $scope.$broadcast('submitSysModal');
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
    .controller('editSysFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.$on('submitSysModal', function(d, data) {
            $scope.editSysFormSubmit(data);
        });
        $scope.$watch('modifiedSys', function(current, old, scope) {
            if ( scope.modifiedSys.sysId && scope.modifiedSys.sysName && scope.modifiedSys.sysType 
                && scope.modifiedSys.sysSystem) {
                $rootScope.isForbidSubmit = false;
            } else {
                $rootScope.isForbidSubmit = true;
            }
        }, true);
        $scope.editSysFormSubmit = function(data) {
            // TODO 获取更改之后的模块信息$rootScope.modifiedSys提交接口；
            $log.log('弹出框表单提交', data, $rootScope.modifiedSys);
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
