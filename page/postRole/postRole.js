/**
 * Auth heyue
 * Date 2016-09-12
 */

define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'ui-bootstrap-tpls', 'angular-animate'], function (angular, $, httpConfig, swal) {
    angular
        .module('postRoleModule', ['ui.bootstrap'])
        .run(['$rootScope', function ($rootScope) {
            $rootScope.modifiedRole = {}; // 待修改的角色信息
            $rootScope.isForbidSubmit = true; // 禁用编辑模块提交按钮
        }])
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

        // 查询控制器
        .controller('queryRoleFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {

            // 查询结果分页信息
            $scope.requirePaging = true; // 是否需要分页
            $scope.currentPage = 1; // 当前页
            $scope.rowNumPerPage = 10; // 每页显示行数
            $scope.totalNum = 0; // 总条数

            $scope.queryRoleFormSubmit = function (currentPage) {
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
                httpMethod.queryRole(param).then(function (rsp) {
                    $log.log('调用获取查询角色接口成功.');
                    $rootScope.RoleList = rsp.data.list;
                    $scope.totalNum = rsp.data.totalNum;
                }, function () {
                    $log.log('调用获取查询角色接口失败.');
                });
            };
            $scope.$watch('queryRoleForm', function (current, old, scope) {
                if (scope.queryRoleForm.roleId || scope.queryRoleForm.name) {
                    scope.isForbid = false;
                } else {
                    scope.isForbid = true;
                }
            }, true)
        }])
        // 查询结果控制器
        .controller('RoleResultCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            // 修改
            $scope.editRole = function (index, title) {
                $rootScope.modifiedRole = $rootScope.RoleList[index];
                parent.angular.element(parent.$('#tabs')).scope().addTab('角色修改', '/psm/page/addrole/addrole.html', 'modifiedRole', JSON.stringify($rootScope.modifiedRole));
            };
            //详情
            $scope.modifyRole = function (index, title) {
                $rootScope.modifiedRole = $rootScope.RoleList[index];
                // $rootScope.RoleTitle = title;
                // $scope.$emit('openEditRoleModal');
                parent.angular.element(parent.$('#tabs')).scope().addTab('角色详情', '/psm/page/detailRole/detailRole.html', 'modifiedRole', JSON.stringify($rootScope.modifiedRole));
            };

            // 新建
            $scope.addRole = function () {
                parent.angular.element(parent.$('#tabs')).scope().addTab('新建角色', '/psm/page/addrole/addrole.html', 'addNewrole');
            };

            $scope.check = function (val, chk) {
                var valueOfIndex = '';
                $scope.checkedRole.length && $scope.checkedRole.map(function (item, index) {
                    if (item.roleId == val.roleId) {
                        valueOfIndex = index;
                    }
                });
                chk ? valueOfIndex === '' && $scope.checkedRole.push(val) : $scope.checkedRole.splice(valueOfIndex, 1);
            };

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
                        httpMethod.deleteRoleBatch(param).then(function (rsp) {
                            $log.log('调用删除角色接口成功.');
                            if (rsp.data) {
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
            };

            // 子iframe调用父iframe控制器内方法；
            $scope.demo = function () {
                parent.angular.element(parent.$('#tabs')).scope().addTab('新建模块', '/psm/page/sysModular/sysModular.html');
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
});
