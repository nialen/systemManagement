/**
 * Auth heyue
 * Date 2016-09-19
 */

define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'lodash', 'ui-bootstrap-tpls', 'angular-animate'], function (angular, $, httpConfig, swal, _) {
    angular
        .module('addRoleModule', ['ui.bootstrap'])
        .run(['$rootScope', '$parse', '$log', function ($rootScope, $parse, $log) {
            var id = window.frameElement && window.frameElement.id || '',
                obj = parent.$('#' + id).attr('data');

            $rootScope.modifiedRoleList = obj ? JSON.parse(obj) : {}; // 待修改的模块信息

            $rootScope.modifiedRole = {}; // 待修改的模块信息
            $rootScope.isForbidSubmit = true; // 禁用编辑模块提交按钮

            $rootScope.SpecList = []; // 权限类型列表
            $rootScope.PowerList = {}; // 待修改权限类型列表

            $rootScope.OperateSpecList = []; // 查询角色已选权限规格
            $rootScope.checkedPowerList = []; // 添加选中的权限规格

            $rootScope.isModifiedRoleList = !obj ? true : false;
            // 模块选择弹框内部信息
            $rootScope.checkedRoleList = {}; // 选中的模块信息
            $rootScope.checkedIndex = ''; // 选中的索引
        }])

        /*传入数据*/
        .factory('httpMethod', ['$http', '$q', function ($http, $q) {
            var httpMethod = {};
            // 查询角色
            httpMethod.queryRole = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/role/profile/queryRole.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    // data: 'param=' + param
                    data: 'param=' + encodeURI(JSON.stringify(param))
                }).success(function (data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    defer.reject(data);
                });
                return defer.promise;
            };

            // 查询角色已选权限规格
            httpMethod.queryOperateSpecByRoleId = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/role/profile/queryOperateSpecByRoleId.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    // data: 'param=' + param
                    data: 'roleId=' + param
                }).success(function (data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    defer.reject(data);
                });
                return defer.promise;
            };

            // 查询权限类型
            httpMethod.queryOperationSpecType = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/queryOperationSpecType.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                }).success(function (data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    defer.reject(data);
                });
                return defer.promise;
            };

            // 新建服务
            httpMethod.insertRole = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/role/profile/insertRole.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'data=' + encodeURI(JSON.stringify(param))
                }).success(function (data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    defer.reject(data);
                });
                return defer.promise;
            };

            // 查询权限规格
            httpMethod.queryOperateSpecForSelect = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/role/profile/queryOperateSpecForSelect.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'data=' + encodeURI(JSON.stringify(param))
                }).success(function (data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    defer.reject(data);
                });
                return defer.promise;
            };

            // 修改服务
            httpMethod.alterRole = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/role/profile/alterRole.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'data=' + encodeURI(JSON.stringify(param))
                }).success(function (data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    defer.reject(data);
                });
                return defer.promise;
            };

            // 删除服务
            httpMethod.deleteRoleBatch = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/role/profile/deleteRoleBatch.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'data=' + param
                }).success(function (data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    defer.reject(data);
                });
                return defer.promise;
            };

            return httpMethod;
        }])

        // 修改用户控制器
        .controller('modifyRoleFormCtrl', ['$scope', '$rootScope', '$log', '$timeout', 'httpMethod', function ($scope, $rootScope, $log, $timeout, httpMethod) {

            $scope.isForbid = true;
            $scope.modifyRoleForm = $.extend(true, {
                name: '',//角色名称
                RoleId: '',//所属系统ID
                startDt: '',//生效日期
                endDt: '',//失效日期
                description: ''//描述
            }, $rootScope.modifiedRoleList);

            // 时间控件
            $scope.startDateOptions = {
                formatYear: 'yy',
                maxDate: $scope.modifyRoleForm.endTime,
                startingDay: 1
            };
            $scope.endDateOptions = {
                formatYear: 'yy',
                minDate: $scope.modifyRoleForm.startTime,
                // maxDate: new Date(),
                startingDay: 1
            };

            $scope.$watch('modifyRoleForm.startDt', function (newValue) {
                $scope.endDateOptions.minDate = newValue;
            });
            $scope.$watch('modifyRoleForm.endDt', function (newValue) {
                $scope.startDateOptions.maxDate = newValue;
            });

            $scope.startOpen = function () {
                $timeout(function () {
                    $scope.startPopupOpened = true;
                });
            };
            $scope.endOpen = function () {
                $timeout(function () {
                    $scope.endPopupOpened = true;
                });
            };
            $scope.startPopupOpened = false;
            $scope.endPopupOpened = false;


            $scope.modifyRoleFormSubmit = function () {
                var param = {
                    roleId: '',//角色Id
                    name: '',//角色名称
                    startDt: '',//生效日期
                    endDt: '',//失效日期
                    description: '',//描述
                    privilegeList: [
                        {
                            operationSpecCd: ''//权限规格编码
                        }
                    ]
                };

                $scope.modifyRoleForm.roleId ? param.roleId = $scope.modifyRoleForm.roleId : '';
                $scope.modifyRoleForm.name ? param.name = $scope.modifyRoleForm.name : '';
                $scope.modifyRoleForm.startDt ? param.startDt = $scope.modifyRoleForm.startDt : '';
                $scope.modifyRoleForm.endDt ? param.endDt = $scope.modifyRoleForm.endDt : '';
                $scope.modifyRoleForm.description ? param.description = $scope.modifyRoleForm.description : '';
                $rootScope.OperateSpecList ? param.privilegeList = $rootScope.OperateSpecList : '';

                if ($rootScope.isModifiedRoleList) {
                    httpMethod.insertRole(param).then(function (rsp) {
                        $log.log('调用新建角色接口成功.');
                        if (rsp.data) {
                            swal({
                                title: '操作成功!',
                                text: '新建角色成功！',
                                type: 'success'
                            }, function () {
                                location.reload();
                            });
                        } else {
                            swal("OMG", rsp.msg || "新建角色失败!", "error");
                        }
                    })
                } else {
                    httpMethod.alterRole(param).then(function (rsp) {
                        $log.log('调用修改角色接口成功.');
                        if (rsp.success) {
                            swal("操作成功", "修改角色成功!", "success");
                            // TODO 关闭TABS
                        } else {
                            swal("OMG", rsp.msg || "修改角色失败!", "error");
                        }
                    })
                }
            };

            // 获取业务模块类型列表
            httpMethod.queryOperateSpecByRoleId($scope.modifyRoleForm.roleId).then(function (rsp) {
                $log.log('调用获取业务模块类型接口成功.');
                if (rsp.data) {
                    $rootScope.OperateSpecList = rsp.data;
                }
            }, function () {
                $log.log('调用获取业务模块类型接口失败.');
            });

            // 添加
            $scope.addRolePermission = function () {
                $rootScope.PowerListResultList = null;
                $scope.$broadcast('openCheckRoleListModal');
            };

            // 删除
            $scope.removeRolePermission = function () {
                $rootScope.OperateSpecList = _.differenceWith($rootScope.OperateSpecList, $rootScope.checkedDelRolePermission, _.isEqual);
                $rootScope.checkedDelRolePermission = []; // 重置为空
            };

            $rootScope.checkedDelRolePermission = [];
            // 选中索引
            $scope.check = function (val, chk) {
                var valueOfIndex = '';
                $rootScope.checkedDelRolePermission.length && $rootScope.checkedDelRolePermission.map(function (item, index) {
                    if (item.operationSpecCd == val.operationSpecCd) {
                        valueOfIndex = index;
                    }
                });
                chk ? valueOfIndex === '' && $rootScope.checkedDelRolePermission.push(val) : $rootScope.checkedDelRolePermission.splice(valueOfIndex, 1);
            };

            $scope.$watch('modifyRoleForm', function (current, old, scope) {
                if (scope.modifyRoleForm.roleId || scope.modifyRoleForm.name) {
                    scope.isForbid = false;
                } else {
                    scope.isForbid = true;
                }
            }, true);

            // 监听响应变化
            $scope.$watch('modifiedRoleList', function (current, old, scope) {
                if (current.uproleId !== old.uproleId || current.upRoleModularName !== old.upRoleModularName
                ) {
                    scope.modifyRoleForm.uproleId = $rootScope.modifiedRoleList.uproleId;
                    scope.modifyRoleForm.upRoleModularName = $rootScope.modifiedRoleList.upRoleModularName;
                }
            }, true);
        }])
        // 弹出框控制器
        .controller('selectRoleModalCtrl', function ($scope, $rootScope, $uibModal, $log) {
            var $ctrl = this;
            $scope.$on('openCheckRoleListModal', function (d, data) {
                $ctrl.open(data);
            });

            $ctrl.animationsEnabled = true;

            $ctrl.open = function (data) {
                var modalInstance = $uibModal.open({
                    animation: $ctrl.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    controllerAs: '$ctrl',
                    size: 'lg',
                    resolve: {
                        items: function () {
                            return $ctrl.items;
                        }
                    }
                });
            };

            $ctrl.toggleAnimation = function () {
                $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
            };
        })
        .controller('ModalInstanceCtrl', function ($uibModalInstance, $scope, items) {
            var $ctrl = this;

            $ctrl.ok = function () {
                $scope.$broadcast('submitPowerListModal');
                $uibModalInstance.close();
            };

            $ctrl.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        })
        // 查询控制器
        .controller('queryPowerFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            // 获取业务模块类型列表
            httpMethod.queryOperationSpecType().then(function (rsp) {
                $log.log('调用获取业务模块类型接口成功.');
                $rootScope.SpecList = rsp.data.list;
            }, function () {
                $log.log('调用获取业务模块类型接口失败.');
            });

            $scope.editPower = function (index, title) {
                $rootScope.PowerList = $rootScope.SpecList[index];
                $rootScope.PowerList.map(function (item, index) {
                    if (item.operationSpecTypeCd == $rootScope.PowerList.operationSpecTypeCd) {
                        $rootScope.PowerList.SpecItem = item;
                    }
                });
                $rootScope.PowerTitle = title;
            };

            $scope.isForbid = true;
            $scope.queryPowerForm = {
                operationSpecCd: '',//权限规格编码
                name: '',//权限规格名称
                SpecItem: '',//权限类型列表
                operationSpecTypeCd: ''//规格类型
            };
            // 查询结果分页信息
            $scope.requirePaging = true; // 是否需要分页
            $scope.currentPage = 1; // 当前页
            $scope.rowNumPerPage = 5; // 每页显示行数
            $scope.totalNum = 0; // 总条数

            $scope.queryPowerFormSubmit = function (currentPage) {
                var param = {
                    // operationSpecCd: '',//权限规格编码
                    // name: '',//权限规格名称
                    // operationSpecTypeCd: ''//规格类型
                    requirePaging: $scope.requirePaging, // 是否需要分页
                    currentPage: currentPage || $scope.currentPage, // 当前页
                    rowNumPerPage: $scope.rowNumPerPage // 每页显示行数
                };
                $scope.queryPowerForm.operationSpecCd ? param.operationSpecCd = $scope.queryPowerForm.operationSpecCd : '';
                $scope.queryPowerForm.name ? param.name = $scope.queryPowerForm.name : '';
                $scope.queryPowerForm.SpecItem ? param.operationSpecTypeCd = $scope.queryPowerForm.SpecItem : '';
                // $scope.queryRoleForm.modularTypeCdItem ? param.operationSpecTypeCd = $scope.queryRoleForm.operationSpecTypeCdItem.modularTypeCd : '';
                // 获取业务模块类型列表
                httpMethod.queryOperateSpecForSelect(param).then(function (rsp) {
                    $log.log('调用获取查询权限规格接口成功.');
                    $rootScope.PowerListResultList = rsp.data.list;
                    $scope.totalNum = rsp.data.totalNum;
                }, function () {
                    $log.log('调用获取查询权限规格接口失败.');
                });

            };
            $scope.$watch('queryPowerForm', function (current, old, scope) {
                if (scope.queryPowerForm.manageCd || scope.queryPowerForm.name ||
                    scope.queryPowerForm.operationSpecTypeName) {
                    scope.isForbid = false;
                } else {
                    scope.isForbid = true;
                }
            }, true);

            $scope.check = function (val, chk) {
                var valueOfIndex = '';
                var isHasRolePermission = $rootScope.OperateSpecList.some(function (item, index) {
                    return item.operationSpecCd == val.operationSpecCd;
                });

                if (chk) {
                    !isHasRolePermission && $rootScope.checkedPowerList.push(val);
                } else {
                    $rootScope.checkedPowerList.length && $rootScope.checkedPowerList.map(function (item, index) {
                        if (item.operationSpecCd == val.operationSpecCd) {
                            valueOfIndex = index;
                        }
                    });
                    valueOfIndex !== '' && $rootScope.checkedPowerList.splice(valueOfIndex, 1);
                }
            };

            $scope.$on('submitPowerListModal', function (d, data) {
                $scope.selectPowerListFormSubmit(data);
            });

            $scope.selectPowerListFormSubmit = function (data) {
                $rootScope.OperateSpecList = $rootScope.OperateSpecList.concat($rootScope.checkedPowerList);
                $rootScope.checkedPowerList = []; // 置空弹框中已选权限列表
            }

        }])

        // 分页控制器
        .controller('paginationCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            $scope.maxSize = 8;
            $scope.setPage = function (pageNo) {
                $scope.currentPage = pageNo;
            };
            $scope.pageChanged = function () {
                $scope.queryPowerFormSubmit($scope.currentPage);
                $log.log('Page changed to: ' + $scope.currentPage);
            };
        }])


});
