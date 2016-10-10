/**
 * Auth 丁少华
 * Date 2016-09-18
 */

define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'ui-bootstrap-tpls', 'angular-animate'], function (angular, $, httpConfig, swal) {
    angular
        .module('authorizeModule', ['ui.bootstrap'])
        .run(['$rootScope', '$log', function ($rootScope, $log) {
            var id = window.frameElement && window.frameElement.id || '',
                obj = parent.$('#' + id).attr('data');
            $rootScope.staffManInformation = obj ? JSON.parse(obj) : {}; // 获取授权员工信息
            $rootScope.queryUserPrivilegeDimensionDetail = function (item) {
                $rootScope.userPrivilegeId = item.userPrivilegeId;
                $rootScope.operationSpecCd = item.operationSpecCd;
            };
            $rootScope.authorityDimensionList = []; // 权限维度详情列表
        }])
        .factory('httpMethod', ['$http', '$q', function ($http, $q) {
            var httpMethod = {};

            // 查询用户已分配权限
            httpMethod.queryUserPrivilege = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + "/privilege/profile/queryUserPrivilege.action",
                    method: "POST",
                    headers: httpConfig.requestHeader,
                    data: 'param=' + JSON.stringify(param)
                }).success(function (data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function (data, header, config, status) {
                    defer.reject(data);
                });
                return defer.promise;
            };
            // 查询用户已分配角色
            httpMethod.queryUserPostRole = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + "/role/profile/queryUserPostRole.action",
                    method: "POST",
                    headers: httpConfig.requestHeader,
                    data: 'param=' + JSON.stringify(param)
                }).success(function (data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function (data, header, config, status) {
                    defer.reject(data);
                });
                return defer.promise;
            };
            // 查询权限维度
            httpMethod.queryUserPrivilegeDimension = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + "/privilege/profile/queryUserPrivilegeDimension.action",
                    method: "POST",
                    headers: httpConfig.requestHeader,
                    data: 'param=' + JSON.stringify(param)
                }).success(function (data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function (data, header, config, status) {
                    defer.reject(data);
                });
                return defer.promise;
            };
            // 查询权限规格类型
            httpMethod.queryOperationSpecType = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + "/privilege/profile/queryOperationSpecType.action",
                    method: "POST",
                    headers: httpConfig.requestHeader,
                    data: param ? 'param=' + JSON.stringify(param) : ''
                }).success(function (data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function (data, header, config, status) {
                    defer.reject(data);
                });
                return defer.promise;
            };
            // 查询可选的权限
            httpMethod.queryOperationSpec4Select = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + "/privilege/profile/queryOperationSpec4Select.action",
                    method: "POST",
                    headers: httpConfig.requestHeader,
                    data: 'param=' + JSON.stringify(param)
                }).success(function (data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function (data, header, config, status) {
                    defer.reject(data);
                });
                return defer.promise;
            };
            // 查询可选的角色
            httpMethod.queryPostRole4Select = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + "/role/profile/queryPostRole4Select.action",
                    method: "POST",
                    headers: httpConfig.requestHeader,
                    data: 'param=' + JSON.stringify(param)
                }).success(function (data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function (data, header, config, status) {
                    defer.reject(data);
                });
                return defer.promise;
            };
            // 查询权限维度详情
            httpMethod.queryUserPrivilegeDimensionDetail = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + "/privilege/profile/queryUserPrivilegeDimensionDetail.action",
                    method: "POST",
                    headers: httpConfig.requestHeader,
                    data: 'param=' + JSON.stringify(param)
                }).success(function (data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function (data, header, config, status) {
                    defer.reject(data);
                });
                return defer.promise;
            };
            // 添加用户权限
            httpMethod.appendUserPrivilegeBatch = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + "/privilege/profile/appendUserPrivilegeBatch.action",
                    method: "POST",
                    headers: httpConfig.requestHeader,
                    data: 'data=' + JSON.stringify(param)
                }).success(function (data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function (data, header, config, status) {
                    defer.reject(data);
                });
                return defer.promise;
            };
            // 删除用户权限
            httpMethod.removeUserPrivilegeBatch = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + "/privilege/profile/removeUserPrivilegeBatch.action",
                    method: "POST",
                    headers: httpConfig.requestHeader,
                    data: 'data=' + JSON.stringify(param)
                }).success(function (data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function (data, header, config, status) {
                    defer.reject(data);
                });
                return defer.promise;
            };
            // 添加用户角色
            httpMethod.appendUserPostRoleBatch = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + "/role/profile/appendUserPostRoleBatch.action",
                    method: "POST",
                    headers: httpConfig.requestHeader,
                    data: 'data=' + JSON.stringify(param)
                }).success(function (data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function (data, header, config, status) {
                    defer.reject(data);
                });
                return defer.promise;
            };
            // 删除用户角色
            httpMethod.removeUserPostRoleBatch = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + "/role/profile/removeUserPostRoleBatch.action",
                    method: "POST",
                    headers: httpConfig.requestHeader,
                    data: 'data=' + JSON.stringify(param)
                }).success(function (data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function (data, header, config, status) {
                    defer.reject(data);
                });
                return defer.promise;
            };
            // 新增/修改用户权限维度
            httpMethod.insertUserPrivilegeDimension = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + "/privilege/profile/insertUserPrivilegeDimension.action",
                    method: "POST",
                    headers: httpConfig.requestHeader,
                    data: 'data=' + JSON.stringify(param)
                }).success(function (data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function (data, header, config, status) {
                    defer.reject(data);
                });
                return defer.promise;
            };
            // 查询可选权限维度
            httpMethod.queryDimensionValues = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + "/privilege/profile/queryDimensionValues.action",
                    method: "POST",
                    headers: httpConfig.requestHeader,
                    data: 'sql=' + param
                }).success(function (data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function (data, header, config, status) {
                    defer.reject(data);
                });
                return defer.promise;
            };
            return httpMethod;
        }])
        .controller('assignedAuthorityListCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            // 查询结果分页信息
            $scope.requirePaging = true; // 是否需要分页
            $scope.currentPage = 1; // 当前页
            $scope.rowNumPerPage = 4; // 每页显示行数
            $scope.totalNum = 0; // 总条数

            $scope.queryUserPrivilege = function (currentPage) {
                $rootScope.checkedOperationSpecList = []; // 选中的待删除的权限列表
                var param = {
                    userId: $rootScope.staffManInformation.userId,//用户id
                    requirePaging: $scope.requirePaging, // 是否需要分页
                    currentPage: currentPage || $scope.currentPage, // 当前页
                    rowNumPerPage: $scope.rowNumPerPage // 每页显示行数
                };

                // 查询用户已分配权限
                httpMethod.queryUserPrivilege(param).then(function (rsp) {
                    $log.log('调用查询用户已分配权限接口成功.');
                    $rootScope.assignedAuthorityList = rsp.data.list;
                    $scope.totalNum = rsp.data.totalNum;
                }, function () {
                    $log.log('调用查询用户已分配权限接口失败.');
                });
            };

            $scope.queryUserPrivilege();

            // 添加新权限
            $scope.addAuthority = function () {
                $scope.$emit('openAddAuthorityModal');
            };

            // 选中索引
            $scope.check = function (val, chk) {
                var valueOfIndex = '';
                $rootScope.checkedOperationSpecList.length && $rootScope.checkedOperationSpecList.map(function (item, index) {
                    if (item.operationSpecCd == val.operationSpecCd) {
                        valueOfIndex = index;
                    }
                });
                chk ? valueOfIndex === '' && $rootScope.checkedOperationSpecList.push(val) : $rootScope.checkedOperationSpecList.splice(valueOfIndex, 1);
            };

            // 删除权限
            $scope.removeAuthority = function () {
                if ($rootScope.checkedOperationSpecList.length) {
                    var param = [];
                    var name = [];
                    $rootScope.checkedOperationSpecList.map(function (item) {
                        var obj = {
                            userPrivilegeId: '',//用户权限Id
                            operationSpecName: '' //用户权限名称
                        };
                        obj.userPrivilegeId = item.userPrivilegeId; // 权限规格编码
                        obj.operationSpecName = item.operationSpecName; // 权限规格名称

                        param.push(obj);
                        name.push(obj.operationSpecName);
                    });

                    swal({
                        title: "删除已经分配权限",
                        text: "您确定要删除 " + name.join() + " 权限吗？",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "确定",
                        confirmButtonColor: "#ffaa00",
                        cancelButtonText: "取消",
                        showLoaderOnConfirm: true
                    }, function () {
                        httpMethod.removeUserPrivilegeBatch(param).then(function (rsp) {
                            $log.log('调用删除权限接口成功.');
                            if (rsp.data) {
                                swal("操作成功!", "删除权限成功！", "success");
                            } else {
                                swal("OMG", rsp.msg || "删除权限失败!", "error");
                            }
                        }, function () {
                            $log.log('调用删除权限接口失败.');
                        });
                    });
                } else {
                    swal("操作提醒", "您没有选中任何需要删除的权限！", "info");
                }
            };

            // 查看权限维度
            $scope.viewUserPrivilegeDimension = function (item) {
                $rootScope.queryUserPrivilegeDimensionDetail(item);

                var param = {
                    userPrivilegeId: $rootScope.userPrivilegeId,//用户权限ID
                    // requirePaging: 'true',//是否需要分页
                    // currentPage: '1', // 当前页
                    // rowNumPerPage: '10'//每页条数
                };
                httpMethod.queryUserPrivilegeDimension(param).then(function (rsp) {
                    $log.log('调用查询权限维度详情接口成功.');
                    if (rsp.data) {
                        $rootScope.authorityDimensionList = rsp.data;
                    }
                }, function () {
                    $log.log('调用查询权限维度详情接口失败.');
                });
            };
        }])

        // 分配角色控制器
        .controller('assignedRoleListCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            $scope.queryUserPostRole = function (currentPage) {
                $rootScope.checkedAssignedRoleList = []; // 选中的待删除的角色列表
                var param = {
                    userId: $rootScope.staffManInformation.userId,//用户id
                    requirePaging: $scope.requirePaging, // 是否需要分页
                    currentPage: currentPage || $scope.currentPage, // 当前页
                    rowNumPerPage: $scope.rowNumPerPage // 每页显示行数
                };

                // 查询用户已分配角色
                httpMethod.queryUserPostRole(param).then(function (rsp) {
                    $log.log('调用查询用户已分配权限接口成功.');
                    $rootScope.assignedRoleList = rsp.data.list;
                    $scope.totalNum = rsp.data.totalNum;
                }, function () {
                    $log.log('调用查询用户已分配权限接口失败.');
                });
            };

            $scope.queryUserPostRole();

            // 添加新角色
            $scope.addRole = function () {
                $scope.$emit('openAddRoleModal');
            };

            $rootScope.checkedRoleList = []; // 选中待删除的角色列表

            // 选中索引
            $scope.check = function (val, chk) {
                var valueOfIndex = '';
                $rootScope.checkedRoleList.length && $rootScope.checkedRoleList.map(function (item, index) {
                    if (item.userRoleId == val.userRoleId) {
                        valueOfIndex = index;
                    }
                });
                chk ? valueOfIndex === '' && $rootScope.checkedRoleList.push(val) : $rootScope.checkedRoleList.splice(valueOfIndex, 1);
            };

            // 删除已选择角色
            $scope.removeRole = function () {
                if ($rootScope.checkedRoleList.length) {
                    var param = [];
                    var name = [];
                    $rootScope.checkedRoleList.map(function (item) {
                        var obj = {
                            userRoleId: '',//用户权限Id
                            postRoleName: '' //用户权限名称
                        };
                        obj.userRoleId = item.userRoleId; // 权限规格编码
                        obj.postRoleName = item.postRoleName; // 权限规格名称

                        param.push(obj);
                        name.push(obj.postRoleName);
                    });

                    swal({
                        title: "删除已经分配角色",
                        text: "您确定要删除 " + name.join() + " 角色吗？",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "确定",
                        confirmButtonColor: "#ffaa00",
                        cancelButtonText: "取消",
                        showLoaderOnConfirm: true
                    }, function () {
                        httpMethod.removeUserPostRoleBatch(param).then(function (rsp) {
                            $log.log('调用删除角色接口成功.');
                            if (rsp.data) {
                                swal("操作成功!", "删除角色成功！", "success");
                            } else {
                                swal("OMG", rsp.msg || "删除角色失败!", "error");
                            }
                        }, function () {
                            $log.log('调用删除角色接口失败.');
                        });
                    });
                } else {
                    swal("操作提醒", "您没有选中任何需要删除的角色！", "info");
                }
            }
        }])

        // 权限维度列表控制器
        .controller('authorityDimensionListCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {

            // 权限维度-设置按钮
            $scope.setDimension = function (index) {
                var param = $scope.authorityDimensionList[index].dynamicSql;
                httpMethod.queryDimensionValues(param).then(function (rsp) {
                    $log.log('调用查询权限维度列表接口成功.');
                    $rootScope.allAuthorityDimension = rsp.data;
                }, function () {
                    $log.log('调用查询权限维度列表接口失败.');
                });

                $scope.$emit('openSetDimensionModal', $scope.authorityDimensionList[index]);
            };
            // 权限维度-查看按钮
            $scope.viewDimension = function (index) {
                $scope.$emit('openViewDimensionModal', $scope.authorityDimensionList[index]);
            }
        }])
        // 添加权限弹框
        .controller('addAuthorityModalCtrl', function ($scope, $rootScope, $uibModal, $log) {
            var $ctrl = this;
            $scope.$on('openAddAuthorityModal', function (d, data) {
                $ctrl.open(data);
            });

            $ctrl.animationsEnabled = true;

            $ctrl.open = function () {
                var modalInstance = $uibModal.open({
                    animation: $ctrl.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'addAuthorityModal.html',
                    controller: 'ModalAuthorityCtrl',
                    controllerAs: '$ctrl',
                    size: 'lg'
                });
            };

            $ctrl.toggleAnimation = function () {
                $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
            };
        })
        .controller('ModalAuthorityCtrl', function ($uibModalInstance, $scope) {
            var $ctrl = this;

            $ctrl.ok = function () {
                $uibModalInstance.close();
                $scope.$broadcast('submitAddAuthorityModal');
            };

            $ctrl.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        })
        // 权限维度设置弹框
        .controller('authorityDimensionModalCtrl', function ($scope, $rootScope, $uibModal, $log) {
            var $ctrl = this;
            $scope.$on('openSetDimensionModal', function (d, data) {
                $ctrl.setDimensionModal(data);
            });

            $scope.$on('openViewDimensionModal', function (d, data) {
                $ctrl.viewDimensionModal(data);
            });

            $ctrl.animationsEnabled = true;

            $ctrl.setDimensionModal = function (data) {
                var modalInstance = $uibModal.open({
                    animation: $ctrl.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'setDimensionModalContent.html',
                    controller: 'ModalSetDimensionCtrl',
                    controllerAs: '$ctrl',
                    size: 'lg',
                    resolve: {
                        items: function () {
                            return data;
                        }
                    }
                });
            };

            $ctrl.viewDimensionModal = function (data) {
                var modalInstance = $uibModal.open({
                    animation: $ctrl.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'viewDimensionModalContent.html',
                    controller: 'ModalViewDimensionCtrl',
                    controllerAs: '$ctrl',
                    size: 'lg',
                    resolve: {
                        items: function () {
                            return data;
                        }
                    }
                });
            };

            $ctrl.toggleAnimation = function () {
                $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
            };
        })
        .controller('ModalSetDimensionCtrl', function ($uibModalInstance, $scope, $rootScope, $log, httpMethod, items) {
            var $ctrl = this;

            $rootScope.checkedDimension = [];
            // 选中索引
            $scope.check = function (val, chk) {
                var valueOfIndex = '';
                $rootScope.checkedDimension.length && $rootScope.checkedDimension.map(function (item, index) {
                    if (item.VALUEID == val.VALUEID) {
                        valueOfIndex = index;
                    }
                });
                chk ? valueOfIndex === '' && $rootScope.checkedDimension.push(val) : $rootScope.checkedDimension.splice(valueOfIndex, 1);
            };

            $ctrl.ok = function () {
                if ($rootScope.checkedDimension.length) {
                    var checkedDimensionName = [];
                    var checkedDimensionId = [];
                    $rootScope.checkedDimension.map(function (item) {
                        checkedDimensionName.push(item.VALUENAME);
                        checkedDimensionId.push(item.VALUEID);
                    });

                    var obj = {
                        privilegeDimensionCd: items.privilegeDimensionCd,//权限维度编码
                        name: items.privilegeDimensionName,//权限维度名称
                        dimensionValue: checkedDimensionId.join(),//维度值
                        userPrivilegeId: items.userPrivilegeId,//用户权限Id
                        operationSpecCd: $rootScope.operationSpecCd,//权限规格Id
                        privilegeScopeId: items.privilegeScopeId//用户权限维度Id（新增时为空）
                    };

                    swal({
                        title: "添加权限维度",
                        text: "您确定要添加 " + checkedDimensionName.join() + " 权限维度吗？",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "确定",
                        confirmButtonColor: "#ffaa00",
                        cancelButtonText: "取消",
                        showLoaderOnConfirm: true
                    }, function () {
                        httpMethod.insertUserPrivilegeDimension(obj).then(function (rsp) {
                            $log.log('调用添加权限维度接口成功.');
                            if (rsp.data) {
                                swal("操作成功!", "添加权限维度成功！", "success");
                            } else {
                                swal("操作失败!", rsp.msg || "添加权限维度失败！", "error");
                            }
                        }, function () {
                            $log.log('调用添加权限维度接口失败.');
                        });
                    });
                }
                $rootScope.checkedDimension = []; //关闭维度选择弹框置空已选择维度项
                $uibModalInstance.close();
            };

            $ctrl.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        })
        .controller('ModalViewDimensionCtrl', function ($uibModalInstance, $scope, items) {
            var $ctrl = this;

            $ctrl.authorityDimensionItem = items;
            $ctrl.ok = function () {
                $uibModalInstance.close();
            };

            $ctrl.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        })
        // 添加角色弹框
        .controller('addRoleModalCtrl', function ($scope, $rootScope, $uibModal, $log) {
            var $ctrl = this;
            $scope.$on('openAddRoleModal', function (d, data) {
                $ctrl.open(data);
            });

            $ctrl.animationsEnabled = true;

            $ctrl.open = function () {
                var modalInstance = $uibModal.open({
                    animation: $ctrl.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'addRoleModal.html',
                    controller: 'ModalRoleCtrl',
                    controllerAs: '$ctrl',
                    size: 'lg'
                });
            };

            $ctrl.toggleAnimation = function () {
                $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
            };
        })
        .controller('ModalRoleCtrl', function ($uibModalInstance, $scope, $log, httpMethod) {
            var $ctrl = this;

            $ctrl.ok = function () {
                $uibModalInstance.close();
                $scope.$broadcast('submitAddRoleModal');
            };

            $ctrl.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        })
        // 查询控制器
        .controller('queryAuthorityFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            httpMethod.queryOperationSpecType().then(function (rsp) {
                $log.log('调用查询权限规格类型接口成功.');
                $rootScope.authorityTypeList = rsp.data.list;
            }, function () {
                $log.log('调用查询权限规格类型接口失败.');
            });

            // 查询结果分页信息
            $scope.requirePaging = true; // 是否需要分页
            $scope.currentPage = 1; // 当前页
            $scope.rowNumPerPage = 4; // 每页显示行数
            $scope.totalNum = 0; // 总条数

            $scope.queryAuthorityForm = {
                operationSpecCd: '',
                name: '',
                operationSpecTypeCd: ''
            };

            $scope.queryUserPrivilege = function (currentPage) {
                $rootScope.checkedBeforeOperationSpecList = []; // 已选择权限列表
                $rootScope.checkedAfterOperationSpecList = []; // 已选择权限列表(入参格式)

                var param = {
                    userId: $rootScope.staffManInformation.userId, //用户id
                    // operationSpecCd: '',//权限规格编码
                    // name: '',//权限规格名称
                    // operationSpecTypeCd: '',//权限规格类型编码
                    requirePaging: $scope.requirePaging, // 是否需要分页
                    currentPage: currentPage || $scope.currentPage, // 当前页
                    rowNumPerPage: $scope.rowNumPerPage // 每页显示行数
                };
                $scope.queryAuthorityForm.operationSpecCd ? param.operationSpecCd = $scope.queryAuthorityForm.operationSpecCd : '';
                $scope.queryAuthorityForm.name ? param.name = $scope.queryAuthorityForm.name : '';
                $scope.queryAuthorityForm.operationSpecTypeCd ? param.operationSpecTypeCd = $scope.queryAuthorityForm.operationSpecTypeCd : '';

                // 查询用户可选权限
                httpMethod.queryOperationSpec4Select(param).then(function (rsp) {
                    $log.log('调用查询用户可选权限接口成功.');
                    $rootScope.operationSpecList = rsp.data.list;
                    $scope.totalNum = rsp.data.totalNum;
                }, function () {
                    $log.log('调用查询用户可选权限接口失败.');
                });
            };
        }])
        // 查询结果控制器
        .controller('staffManResultCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {

            // 选中索引
            $scope.check = function (val, chk) {
                var valueOfIndex = '';
                $rootScope.checkedBeforeOperationSpecList.length && $rootScope.checkedBeforeOperationSpecList.map(function (item, index) {
                    if (item.operationSpecCd == val.operationSpecCd) {
                        valueOfIndex = index;
                    }
                });
                chk ? valueOfIndex === '' && $rootScope.checkedBeforeOperationSpecList.push(val) : $rootScope.checkedBeforeOperationSpecList.splice(valueOfIndex, 1);
            };

            $scope.$on('submitAddAuthorityModal', function (d, data) {
                $scope.selectStaffManFormSubmit(data);
            });
            $scope.selectStaffManFormSubmit = function (data) {
                $rootScope.checkedBeforeOperationSpecList.map(function (item) {
                    var obj = {
                        userId: '',//用户ID
                        operationSpecCd: '',//权限规格编码
                        operationSpecName: '' //权限规格名称
                    };
                    obj.userId = $rootScope.staffManInformation.userId; // 用户id
                    obj.operationSpecCd = item.operationSpecCd; // 权限规格编码
                    obj.operationSpecName = item.name; // 权限规格名称

                    $rootScope.checkedAfterOperationSpecList.push(obj);
                });

                var operationSpecName = [];
                $rootScope.checkedAfterOperationSpecList.map(function (item) {
                    operationSpecName.push(item.operationSpecName);
                });
                swal({
                    title: "添加权限",
                    text: "您确定要添加 " + operationSpecName.join() + " 权限吗？",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "确定",
                    confirmButtonColor: "#ffaa00",
                    cancelButtonText: "取消",
                    showLoaderOnConfirm: true
                }, function () {
                    httpMethod.appendUserPrivilegeBatch($rootScope.checkedAfterOperationSpecList).then(function (rsp) {
                        $log.log('调用添加用户权限接口成功.');
                        if (rsp.data) {
                            swal("操作成功!", "添加用户权限成功！", "success");
                        } else {
                            swal("操作失败!", rsp.msg || "添加用户权限失败！", "error");
                        }
                    }, function () {
                        $log.log('调用添加用户权限接口失败.');
                    });
                });
            }
        }])

        // 角色查询控制器
        .controller('queryRoleFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            $scope.isForbid = true;

            // 查询结果分页信息
            $scope.requirePaging = true; // 是否需要分页
            $scope.currentPage = 1; // 当前页
            $scope.rowNumPerPage = 4; // 每页显示行数
            $scope.totalNum = 0; // 总条数

            $scope.queryAuthorityForm = {
                postRoleId: '', // 角色ID
                name: '' // 角色名称
            };

            $scope.queryUserPrivilege = function (currentPage) {
                $rootScope.checkedAddRoleList = []; // 选中待添加的角色列表

                var param = {
                    userId: $rootScope.staffManInformation.userId,//用户id
                    requirePaging: $scope.requirePaging, // 是否需要分页
                    currentPage: currentPage || $scope.currentPage, // 当前页
                    rowNumPerPage: $scope.rowNumPerPage // 每页显示行数
                };
                $scope.queryAuthorityForm.name ? param.name = $scope.queryAuthorityForm.name : '';
                $scope.queryAuthorityForm.postRoleId ? param.postRoleId = $scope.queryAuthorityForm.postRoleId : '';

                // 查询可选的角色
                httpMethod.queryPostRole4Select(param).then(function (rsp) {
                    $log.log('调用查询可选的角色接口成功.');
                    $rootScope.roleResultList = rsp.data.list;
                    $scope.totalNum = rsp.data.totalNum;
                }, function () {
                    $log.log('调用查询可选的角色接口失败.');
                });
            };
            $scope.$watch('queryAuthorityForm', function (current, old, scope) {
                if (scope.queryAuthorityForm.authorityCode || scope.queryAuthorityForm.authorityName || scope.queryAuthorityForm.authorityType) {
                    scope.isForbid = false;
                } else {
                    scope.isForbid = true;
                }
            }, true);
        }])
        // 角色查询结果控制器
        .controller('roleResultCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            // 选中索引
            $scope.check = function (val, chk) {
                var valueOfIndex = '';
                $rootScope.checkedAddRoleList.length && $rootScope.checkedAddRoleList.map(function (item, index) {
                    if (item.postRoleId == val.postRoleId) {
                        valueOfIndex = index;
                    }
                });
                chk ? valueOfIndex === '' && $rootScope.checkedAddRoleList.push(val) : $rootScope.checkedAddRoleList.splice(valueOfIndex, 1);
            };

            $scope.$on('submitAddRoleModal', function (d, data) {
                $scope.appendUserPostRoleSubmit(data);
            });

            $scope.appendUserPostRoleSubmit = function (data) {
                var param = [];
                var postRoleName = [];
                $rootScope.checkedAddRoleList.map(function (item) {
                    var obj = {
                        userId: $rootScope.staffManInformation.userId, //用户id
                        postRoleId: item.postRoleId, //角色Id
                        postRoleName: item.name //角色名称
                    };
                    param.push(obj);
                    postRoleName.push(item.name);
                });

                swal({
                    title: "添加权限",
                    text: "您确定要添加 " + postRoleName.join() + " 权限吗？",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "确定",
                    confirmButtonColor: "#ffaa00",
                    cancelButtonText: "取消",
                    showLoaderOnConfirm: true
                }, function () {
                    httpMethod.appendUserPostRoleBatch(param).then(function (rsp) {
                        $log.log('调用添加用户角色接口成功.');
                        if (rsp.data) {
                            swal("操作成功!", "添加用户角色成功！", "success");
                        } else {
                            swal("操作失败!", rsp.msg || "添加用户角色失败！", "error");
                        }
                    }, function () {
                        $log.log('调用添加用户角色接口失败.');
                    });
                });
            }
        }])

        // 分页控制器
        .controller('paginationCtrl', ['$scope', '$rootScope', '$log', function ($scope, $rootScope, $log) {
            $scope.maxSize = 10;
            $scope.setPage = function (pageNo) {
                $scope.currentPage = pageNo;
            };

            $scope.pageChanged = function () {
                $scope.queryUserPrivilege($scope.currentPage);
                $log.log('Page changed to: ' + $scope.currentPage);
            };
        }])
});
