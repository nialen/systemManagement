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
	}])

    /*传入数据*/
        .factory('httpMethod', ['$http', '$q', function($http, $q) {
            var httpMethod = {};
            var httpConfig = {
                 'siteUrl': 'http://192.168.74.17/psm',
                // 'siteUrl': 'http://192.168.16.161:80/psm',
                // 'siteUrl': 'http://192.168.16.67:8080/psm',
                'requestHeader': {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            };
            // 查询角色
            httpMethod.queryRole = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/role/profile/queryRole.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    // data: 'param=' + param
                    data: 'param=' + encodeURI(JSON.stringify(param))
                }).success(function(data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function(data, status, headers, config) {
                    defer.reject(data);
                });
                return defer.promise;
            };

            // 新建服务
            httpMethod.insertRole = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/role/profile/insertRole.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'data=' + encodeURI(JSON.stringify(param))
                }).success(function(data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function(data, status, headers, config) {
                    defer.reject(data);
                });
                return defer.promise;
            };

            // 查询权限规格
            httpMethod.queryOperateSpecForSelect = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/role/profile/queryOperateSpecForSelect.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'data=' + encodeURI(JSON.stringify(param))
                }).success(function(data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function(data, status, headers, config) {
                    defer.reject(data);
                });
                return defer.promise;
            };

            // 修改服务
            httpMethod.alterRole = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/role/profile/alterRole.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'data=' + encodeURI(JSON.stringify(param))
                }).success(function(data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function(data, status, headers, config) {
                    defer.reject(data);
                });
                return defer.promise;
            };

            // 删除服务
            httpMethod.deleteRoleBatch = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/role/profile/deleteRoleBatch.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'data=' + param
                }).success(function(data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function(data, status, headers, config) {
                    defer.reject(data);
                });
                return defer.promise;
            };

            return httpMethod;
        }])
    /*传入数据*/

    // 查询控制器
    .controller('queryRoleFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        
        // 查询结果分页信息
        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 5; // 每页显示行数
        $scope.totalNum = 0; // 总条数

        $scope.queryRoleFormSubmit = function(currentPage) {
            $scope.checkedRole = []; // 置空已选角色定义列表

            var param = {
                // roleId: '', // 角色Id
                // name: '', // 角色名称
                // description: '', // 描述
                // startDt: '', //生效日期
                // endDt: '',  //失效日期
                requirePaging: $scope.requirePaging, // 是否需要分页
                currentPage: currentPage || $scope.currentPage, // 当前页
                rowNumPerPage: $scope.rowNumPerPage // 每页显示行数
            };
            $scope.queryRoleForm.roleId ? param.roleId = $scope.queryRoleForm.roleId : '';
            $scope.queryRoleForm.name ? param.roleName = $scope.queryRoleForm.name : '';
            // $scope.queryRoleForm.sysIdItem ? param.sysId = $scope.queryRoleForm.sysIdItem.sysId : '';

            // 获取业务模块类型列表
            httpMethod.queryRole(param).then(function(rsp) {
                $log.log('调用获取查询角色接口成功.');
                $rootScope.RoleList = rsp.data.list;
                $scope.totalNum = rsp.data.totalNum;
            }, function() {
                $log.log('调用获取查询角色接口失败.');
            });
        }
        $scope.$watch('queryRoleForm', function(current, old, scope) {
            if ( scope.queryRoleForm.roleId || scope.queryRoleForm.name ) {
                scope.isForbid = false;
            } else {
                scope.isForbid = true;
            }
        }, true)
    }])
    // 查询结果控制器
    .controller('RoleResultCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        // 修改
        $scope.editRole = function(index, title) {
            $rootScope.modifiedRole = $rootScope.RoleList[index];
            parent.angular.element(parent.$('#tabs')).scope().addTab('角色修改', '/page/postRole/addrole/addrole.html',  'modifiedRole', JSON.stringify($rootScope.modifiedRole));
        }
        //详情
        $scope.modifyRole = function(index, title) {
            $rootScope.modifiedRole = $rootScope.RoleList[index];
            $rootScope.RoleTitle = title;
            $scope.$emit('openEditRoleModal');
        }
        // 新建
        $scope.addRole = function() {
            parent.angular.element(parent.$('#tabs')).scope().addTab('新建角色', '/page/postRole/addrole/addrole.html', 'addNewrole');
        }

        $scope.check = function (val, chk) {
            var valueOfIndex = '';
            $scope.checkedRole.length && $scope.checkedRole.map(function (item, index) {
                if (item.roleId == val.roleId) {
                    valueOfIndex = index;
                }
            })
            chk ? valueOfIndex === '' && $scope.checkedRole.push(val) : $scope.checkedRole.splice(valueOfIndex, 1);
        }

        // 删除
        $scope.deleteRoleBatch = function () {
            if ($scope.checkedRole.length) {
                var param = [];
                $scope.checkedRole.map(function (item, index) {
                    param.push(item.roleId);
                });
                param = param.join();
                swal({
                    title: "删除角色",
                    text: "您确定要把角色ID为" + param + "的角色删除吗？",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "确定",
                    confirmButtonColor: "#ffaa00",
                    cancelButtonText: "取消",
                    showLoaderOnConfirm: true
                }, function () {
                    httpMethod.deleteRoleBatch(param).then(function(rsp) {
                        $log.log('调用删除角色接口成功.');
                        if (rsp.data){
                            swal("操作成功!", "删除角色成功！", "success");
                        } else {
                            swal("OMG", "删除角色失败!", "error");
                        }
                    }, function () {
                        $log.log('调用删除角色接口失败.');
                        swal("OMG", "调用删除角色接口失败!", "error");
                    });
                });
            } else {
                swal("操作提醒", "您没有选中任何需要删除的角色！", "info");
            }
        }

        // 子iframe调用父iframe控制器内方法；
        $scope.demo = function () {
            parent.angular.element(parent.$('#tabs')).scope().addTab('新建模块', '/page/sysModular/sysModular.html');
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
    .controller('paginationCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
        $scope.maxSize = 10;
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function () {
            $scope.queryRoleFormSubmit($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }]);
