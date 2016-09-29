/**
 * Auth heyue
 * Date 2016-09-19
 */

define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'ui-bootstrap-tpls', 'angular-animate'], function (angular, $, httpConfig, swal) {
    angular
        .module('addRoleModule', ['ui.bootstrap'])
        .run(['$rootScope', '$parse', '$log', function ($rootScope, $parse, $log) {
            var id = window.frameElement && window.frameElement.id || '',
                obj = parent.$('#' + id).attr('data');

            $rootScope.modifiedRoleList = obj ? JSON.parse(obj) : {}; // 待修改的模块信息

            $rootScope.modifiedRole = {}; // 待修改的模块信息
            $rootScope.isForbidSubmit = true; // 禁用编辑模块提交按钮
            $rootScope.modularTypeName = []; // 业务模块类型

            $rootScope.isModifiedRoleList = !obj ? true : false;
            // 模块选择弹框内部信息
            $rootScope.PowerListResultList = []; // 查询模块列表
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
        /*传入数据*/

        // 修改用户控制器
        .controller('modifyRoleFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            /* 获取业务模块类型列表
             httpMethod.queryModularType().then(function(rsp) {
             $log.log('调用获取业务模块类型接口成功.');
             $rootScope.RoleType = rsp.data;
             }, function() {
             $log.log('调用获取业务模块类型接口失败.');
             });*/

            // 详情
            /*
             $scope.editRole = function(index, title) {
             $rootScope.modifiedRole = $rootScope.RoleResultList[index];
             $rootScope.RoleType.map(function(item, index) {
             if (item.modularTypeCd == $rootScope.modifiedRole.modularTypeCd) {
             $rootScope.modifiedRole.modularTypeCdItem = item;
             }
             })
             $rootScope.RoleTitle = title;
             $rootScope.RoletemList.map(function(item, index) {
             if (item.RoleId == $rootScope.modifiedRole.RoleId) {
             $rootScope.modifiedRole.RoleIdItem = item;
             }
             });
             };
             */

            $scope.isForbid = true;
            $scope.modifyRoleForm = $.extend(true, {
                name: '',//角色名称
                RoleId: '',//所属系统ID
                startDt: '',//生效日期
                endDt: '',//失效日期
                description: ''//描述
            }, $rootScope.modifiedRoleList);

            /*
             $scope.modifyRoleFormSubmit = function() {
             // TODO $http发送请求，获取数据$scope.modifyRoleForm;
             $log.log($scope.isForbid, $scope.modifyRoleForm);
             };
             */

            $scope.modifyRoleFormSubmit = function () {
                var param = {
                    roleId: '',//角色Id
                    name: '',//角色名称
                    startDt: '',//生效日期
                    endDt: '',//失效日期
                    description: ''//描述
                };
                $scope.modifyRoleForm.roleId ? param.roleId = $scope.modifyRoleForm.roleId : '';
                $scope.modifyRoleForm.name ? param.name = $scope.modifyRoleForm.name : '';
                $scope.modifyRoleForm.startDt ? param.startDt = $scope.modifyRoleForm.startDt : '';
                $scope.modifyRoleForm.endDt ? param.endDt = $scope.modifyRoleForm.endDt : '';
                $scope.modifyRoleForm.description ? param.description = $scope.modifyRoleForm.description : '';
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

            // 模块选择
            $scope.checkRolelist = function (index) {
                $scope.$broadcast('openCheckRoleListModal');
            }
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
        // TODO 删除冗余代码
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
                $uibModalInstance.close();
                $scope.$broadcast('submitRoleListModal');
            };

            $ctrl.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        })
        // 查询控制器
        .controller('queryPowerFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            $scope.isForbid = true;
            $scope.queryPowerForm = {
                manageCd: '',//角色Id
                operationSpecTypeName: '',//权限规格编码
                name: ''//权限规格名称

            };

            // 查询结果分页信息
            $scope.requirePaging = true; // 是否需要分页
            $scope.currentPage = 1; // 当前页
            $scope.rowNumPerPage = 5; // 每页显示行数
            $scope.totalNum = 0; // 总条数

            $scope.queryRoleFormSubmit = function (currentPage) {
                $scope.checkedRole = []; // 置空已选业务模型列表

                var param = {
                    // name: '', // 角色名称
                    // roleId: '', // 角色ID
                    // modularTypeCd: '', // 业务模块类型
                    requirePaging: $scope.requirePaging, // 是否需要分页
                    currentPage: currentPage || $scope.currentPage, // 当前页
                    rowNumPerPage: $scope.rowNumPerPage // 每页显示行数
                };
                $scope.queryPowerForm.manageCd ? param.manageCd = $scope.queryPowerForm.manageCd : '';
                $scope.queryPowerForm.name ? param.name = $scope.queryPowerForm.name : '';
                $scope.queryPowerForm.operationSpecTypeName ? param.operationSpecTypeName = $scope.queryPowerForm.operationSpecTypeName : '';
                // $scope.queryRoleForm.modularTypeCdItem ? param.operationSpecTypeCd = $scope.queryRoleForm.operationSpecTypeCdItem.modularTypeCd : '';

                // 获取业务模块类型列表
                httpMethod.queryOperateSpecForSelect(param).then(function (rsp) {
                    $log.log('调用获取查询权限规格接口成功.');
                    $rootScope.PowerListResultList = rsp.data.list;
                    $scope.totalNum = rsp.data.totalNum;
                }, function () {
                    $log.log('调用获取查询权限规格接口失败.');
                });

            }
            $scope.$watch('queryPowerForm', function (current, old, scope) {
                if (scope.queryPowerForm.roleId || scope.queryPowerForm.name ||
                    scope.queryPowerForm.modularTypeCdItem) {
                    scope.isForbid = false;
                } else {
                    scope.isForbid = true;
                }
            }, true)
        }])
        // 查询结果控制器
        .controller('PowerListResultCtrl', ['$scope', '$rootScope', '$log', function ($scope, $rootScope, $log) {

            // 选中索引
            $scope.selectRoleList = function (index) {
                $rootScope.checkedRoleList = $rootScope.PowerListResultList[index];
            }
            $scope.$on('submitRoleListModal', function (d, data) {
                $scope.selectRoleListFormSubmit(data);
            });
            $scope.selectRoleListFormSubmit = function (data) {
                // 更新数据为选择的模块信息
                $rootScope.modifiedRoleList.manageCd = $rootScope.checkedRoleList.manageCd;
                $rootScope.modifiedRoleList.name = $rootScope.checkedRoleList.name;
                $rootScope.modifiedRoleList.operationSpecTypeName = $rootScope.checkedRoleList.operationSpecTypeName;
                $rootScope.modifiedRoleList.description = $rootScope.checkedRoleList.description;
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
        }])
})
