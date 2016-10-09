/**
 * Auth 丁少华
 * Date 2016-09-07
 */
define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'ui-bootstrap-tpls', 'angular-animate'], function (angular, $, httpConfig, swal) {
    angular
        .module('userManModule', ['ui.bootstrap'])
        .run(['$rootScope', function ($rootScope) {
            $rootScope.staffManResultList = []; // 查询员工列表
            $rootScope.modifiedStaffMan = {}; // 待修改的员工信息
            $rootScope.isForbidSubmit = true; // 禁用编辑员工提交按钮
        }])
        .factory('httpMethod', ['$http', '$q', function ($http, $q) {
            var httpMethod = {};
            // 查询服务
            httpMethod.queryUserManager = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/userManager/profile/queryUserManager.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'param=' + JSON.stringify(param)
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

            // 查询员工
            httpMethod.queryStaffManager = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/staff/profile/queryStaffManager.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'param=' + JSON.stringify(param)
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

            // 新增用户
            httpMethod.insertUserByStaffManager = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/userManager/profile/insertUserByStaffManager.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'param=' + JSON.stringify(param)
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

            // 修改用户
            httpMethod.alterUser = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/userManager/profile/alterUser.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'param=' + JSON.stringify(param)
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

            // 冻结用户
            httpMethod.lockUserManagerBatch = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/userManager/profile/lockUserManagerBatch.action',
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

            // 解冻用户
            httpMethod.uLockUserManagerBatch = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/userManager/profile/uLockUserManagerBatch.action',
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

            // 注销用户
            httpMethod.deleteUserManagerBatch = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/userManager/profile/deleteUserManagerBatch.action',
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

            // 重置密码
            httpMethod.resetPwd = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/passwordManage/profile/resetPwd.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'loginCode=' + param
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
        // 员工状态码转换文本
        .filter('stateConversionText', function () {
            return function (stateValue) {
                switch (stateValue) {
                    case '1000':
                        return '有效';
                        break;
                    case '1001':
                        return '停用';
                        break;
                    case '1002':
                        return '无效';
                        break;
                }
            }
        })
        // 查询控制器
        .controller('queryStaffFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            // 查询结果分页信息
            $scope.requirePaging = true; // 是否需要分页
            $scope.currentPage = 1; // 当前页
            $scope.rowNumPerPage = 4; // 每页显示行数
            $scope.totalNum = 0; // 总条数

            $scope.queryStaffForm = {
                loginCode: '',
                staffNumber: '',
                name: '',
                mobileTel: ''
            };

            $scope.queryStaffFormSubmit = function (currentPage) {

                var param = {
                    // loginCode: '',//登录账号
                    // staffNumber: '',//员工工号
                    // name: '',//姓名
                    // mobileTel: '',//电话
                    requirePaging: $scope.requirePaging, // 是否需要分页
                    currentPage: currentPage || $scope.currentPage, // 当前页
                    rowNumPerPage: $scope.rowNumPerPage // 每页显示行数
                };
                $scope.queryStaffForm.loginCode ? param.loginCode = $scope.queryStaffForm.loginCode : '';
                $scope.queryStaffForm.staffNumber ? param.staffNumber = $scope.queryStaffForm.staffNumber : '';
                $scope.queryStaffForm.name ? param.name = $scope.queryStaffForm.name : '';
                $scope.queryStaffForm.mobileTel ? param.mobileTel = $scope.queryStaffForm.mobileTel : '';

                // 查询服务
                httpMethod.queryUserManager(param).then(function (rsp) {
                    $log.log('调用查询服务接口成功.');
                    $rootScope.staffManResultList = rsp.data.list;
                    $scope.totalNum = rsp.data.totalNum;
                }, function () {
                    $log.log('调用查询服务接口失败.');
                });
            };

        }])
        // 查询结果控制器
        .controller('staffManResultCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            // 新建
            $scope.addStaffMan = function () {
                parent.angular.element(parent.$('#tabs')).scope().addTab('新建用户', '/page/modifyStaff/modifyStaff.html', 'addNewStaff');
            };
            // 修改
            $scope.editStaffMan = function (index) {
                $rootScope.modifiedStaffMan = $rootScope.staffManResultList[index];
                parent.angular.element(parent.$('#tabs')).scope().addTab('修改用户', '/page/modifyStaff/modifyStaff.html', 'modifyStaff', JSON.stringify($rootScope.modifiedStaffMan));
            };
            // 密码重置
            $scope.resetPassword = function (index) {
                swal({
                    title: "密码重置",
                    text: "您确定要重置 " + $rootScope.staffManResultList[index].name + " 的密码为6个8吗？",
                    type: "warning",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "确定",
                    confirmButtonColor: "#ffaa00",
                    cancelButtonText: "取消",
                    showLoaderOnConfirm: true
                }, function () {
                    httpMethod.resetPwd($rootScope.staffManResultList[index].loginCode).then(function (rsp) {
                        $log.log('调用密码重置接口成功.');
                        if (rsp.success) {
                            swal("操作成功!", "密码重置成功！", "success");
                        } else {
                            swal("OMG", rsp.msg || "密码重置操作失败!", "error");
                        }
                    }, function () {
                        $log.log('调用密码重置接口失败.');
                        swal("OMG", "调用密码重置接口失败!", "error");
                    });
                });
            };

            $scope.checkedStaffMan = []; // 已经选中的员工信息

            /**
             * [check 复选框点击事件]
             * @param  {[type]} val [整行数据]
             * @param  {[boolean]} chk [是否选中]
             */
            $scope.check = function (val, chk) {
                var valueOfIndex = '';
                $scope.checkedStaffMan.length && $scope.checkedStaffMan.map(function (item, index) {
                    if (item.staffId == val.staffId) {
                        valueOfIndex = index;
                    }
                });
                chk ? valueOfIndex === '' && $scope.checkedStaffMan.push(val) : $scope.checkedStaffMan.splice(valueOfIndex, 1);
            };

            // 冻结
            $scope.lockUserManagerBatch = function () {
                if ($scope.checkedStaffMan.length) {
                    var param = [];
                    $scope.checkedStaffMan.map(function (item, index) {
                        param.push(item.staffId);
                    });
                    param = param.join();
                    swal({
                        title: "冻结员工",
                        text: "您确定要把员工ID为" + param + "的员工冻结吗？",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "确定",
                        confirmButtonColor: "#ffaa00",
                        cancelButtonText: "取消",
                        showLoaderOnConfirm: true
                    }, function () {
                        httpMethod.lockUserManagerBatch(param).then(function (rsp) {
                            $log.log('调用冻结员工接口成功.');
                            if (rsp.data) {
                                swal("操作成功!", "员工冻结成功！", "success");
                            } else {
                                swal("OMG", rsp.msg || "员工冻结失败!", "error");
                            }
                        }, function () {
                            $log.log('调用冻结员工接口失败.');
                            swal("OMG", "调用冻结员工接口失败!", "error");
                        });
                    });
                } else {
                    swal("操作提醒", "您没有选中任何需要冻结的员工！", "info");
                }
            };

            // 解冻
            $scope.uLockUserManagerBatch = function () {
                if ($scope.checkedStaffMan.length) {
                    var param = [];
                    $scope.checkedStaffMan.map(function (item, index) {
                        param.push(item.staffId);
                    });
                    param = param.join();
                    swal({
                        title: "解冻员工",
                        text: "您确定要把员工ID为" + param + "的员工解冻吗？",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "确定",
                        confirmButtonColor: "#ffaa00",
                        cancelButtonText: "取消",
                        showLoaderOnConfirm: true
                    }, function () {
                        httpMethod.uLockUserManagerBatch(param).then(function (rsp) {
                            $log.log('调用解冻员工接口成功.');
                            if (rsp.data) {
                                swal("操作成功!", "解冻员工成功！", "success");
                            } else {
                                swal("OMG", rsp.msg || "解冻员工失败!", "error");
                            }
                        }, function () {
                            $log.log('调用解冻员工接口失败.');
                            swal("OMG", "调用解冻员工接口失败!", "error");
                        });
                    });
                } else {
                    swal("操作提醒", "您没有选中任何需要解冻的员工！", "info");
                }
            };

            // 注销
            $scope.deleteUserManagerBatch = function () {
                if ($scope.checkedStaffMan.length) {
                    var param = [];
                    $scope.checkedStaffMan.map(function (item, index) {
                        param.push(item.staffId);
                    });
                    param = param.join();
                    swal({
                        title: "注销员工",
                        text: "您确定要把员工ID为" + param + "的员工注销吗？",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "确定",
                        confirmButtonColor: "#ffaa00",
                        cancelButtonText: "取消",
                        showLoaderOnConfirm: true
                    }, function () {
                        httpMethod.deleteUserManagerBatch(param).then(function (rsp) {
                            $log.log('调用注销员工接口成功.');
                            if (rsp.data) {
                                swal("操作成功!", "注销员工成功！", "success");
                            } else {
                                swal("OMG", rsp.msg || "注销员工失败!", "error");
                            }
                        }, function () {
                            $log.log('调用注销员工接口失败.');
                            swal("OMG", "调用注销员工接口失败!", "error");
                        });
                    });
                } else {
                    swal("操作提醒", "您没有选中任何需要注销的员工！", "info");
                }
            }
        }])
        // 分页控制器
        .controller('paginationCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            $scope.maxSize = 10;
            $scope.setPage = function (pageNo) {
                $scope.currentPage = pageNo;
            };

            $scope.pageChanged = function () {
                $scope.queryStaffFormSubmit($scope.currentPage);
                $log.log('Page changed to: ' + $scope.currentPage);
            };
        }])
})
