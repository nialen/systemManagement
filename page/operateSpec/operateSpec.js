/**
 * Auth 丁少华
 * Date 2016-09-07
 */
define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'ui-bootstrap-tpls', 'angular-animate'], function (angular, $, httpConfig, swal) {
    angular
        .module('operateSpecModule', ['ui.bootstrap'])
        .run(['$rootScope', function ($rootScope) {
            $rootScope.modifiedQueryOperate = {}; // 待修改的权限规格信息
            $rootScope.detailQueryOperate = []; // 权限规格详情
            $rootScope.operationType = []; // 权限类型列表
        }])
        .factory('httpMethod', ['$http', '$q', function ($http, $q) {
            var httpMethod = {};

            // 查询权限规格信息
            httpMethod.queryOperateSpec = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/queryOperationSpec.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
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

            // 查询权限类型
            httpMethod.queryOperationType = function (param) {
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

            // 新建权限规格信息
            httpMethod.insertOperateSpec = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/insertOperationSpec.action',
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

            // 编辑权限规格信息
            httpMethod.alertOperateSpec = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/alterOperationSpec.action',
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

            // 权限规格信息详情
            httpMethod.infoOperateSpec = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/alertOperationSpec.action',
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
            // 启用权限规格
            httpMethod.uLockOperateSpec = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/alertOperationSpecState.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'data=' + JSON.stringify(param)
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

            // 停用权限规格
            httpMethod.lockOperateSpec = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/alertOperationSpecState.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'data=' + JSON.stringify(param)
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

            // 删除权限规格
            httpMethod.batchCancelOperateSpec = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/deleteOperationSpecBatch.action',
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

        // 权限类型编码转换权限类型名称
        .filter('operationSpecTypeCdConversionName', function () {
            return function (operationSpecTypeCd, operationType) {
                var output = '';
                if (operationType.length) {
                    operationType.map(function (item, index) {
                        if (item.operationSpecTypeCd == operationSpecTypeCd) {
                            output = item.operationSpecTypeName;
                        }
                    })
                }
                return output;
            }
        })

        // 查询控制器
        .controller('queryOperateFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            // 查询结果分页信息
            $scope.requirePaging = true; // 是否需要分页
            $scope.currentPage = 1; // 当前页
            $scope.rowNumPerPage = 10; // 每页显示行数
            $scope.totalNum = 0; // 总条数

            // 获取权限类型列表
            httpMethod.queryOperationType().then(function (rsp) {
                $log.log('调用获取权限类型接口成功.');
                $rootScope.operationType = rsp.data.list;
            }, function () {
                $log.log('调用获取权限类型接口失败.');
            });

            $scope.checkedOperateSpec = []; // 已经选中

            $scope.queryOperateForm = {
                operationSpecCd: '',
                name: '',
                operationSpecItem: '',//权限类型
            };

            $scope.queryOperateFormSubmit = function (currentPage) {
                !currentPage && $scope.$broadcast('pageChange');
                $scope.checkedOperateSpec = []; // 置空已选员工列表
                var param = {
                    requirePaging: $scope.requirePaging, //是否需要分页
                    currentPage: currentPage || $scope.currentPage, //当前页
                    rowNumPerPage: $scope.rowNumPerPage, //每页展示行数
                };
                $scope.queryOperateForm.operationSpecCd ? param.operationSpecCd = $scope.queryOperateForm.operationSpecCd : '';
                $scope.queryOperateForm.name ? param.name = $scope.queryOperateForm.name : '';
                $scope.queryOperateForm.operationSpecItem ? param.operationSpecTypeCd = $scope.queryOperateForm.operationSpecItem : '';

                // 查询权限规格信息
                httpMethod.queryOperateSpec(param).then(function (rsp) {
                    $log.log('调用查询权限规格接口成功.');
                    $rootScope.queryOperateResultList = rsp.data.list;
                    $scope.totalNum = rsp.data.totalNum;
                }, function () {
                    $log.log('调用查询权限规格接口失败.');
                });
            }

        }])
        // 查询结果控制器
        .controller('queryOperateResultCtrl', ['$scope', '$rootScope', '$log', '$filter', 'httpMethod', function ($scope, $rootScope, $log, $filter, httpMethod) {
            // 修改
            $scope.editQueryOperate = function (index) {
                $rootScope.modifiedQueryOperate = $rootScope.queryOperateResultList[index];
                parent.angular.element(parent.$('#tabs')).scope().addTab('修改权限规格', '/psm/page/modifyOperate/modifyOperate.html', 'modifyOperate', JSON.stringify($rootScope.modifiedQueryOperate));
            }
            // 新建
            $scope.addQueryOperate = function (title) {
                parent.angular.element(parent.$('#tabs')).scope().addTab('新建权限规格', '/psm/page/modifyOperate/modifyOperate.html', 'addOperate');

            }
            // 详情
            $scope.infoQueryOperate = function (index) {
                $rootScope.detailQueryOperate = $rootScope.queryOperateResultList[index];
                parent.angular.element(parent.$('#tabs')).scope().addTab('权限规格详情', '/psm/page/detailOperate/detailOperate.html', 'detailOperate', JSON.stringify($rootScope.detailQueryOperate));
            }
            /**
             * [check 复选框点击事件]
             * @param  {[type]} val [整行数据]
             * @param  {[boolean]} chk [是否选中]
             */
            $scope.check = function (val, chk) {
                var valueOfIndex = '';
                $scope.checkedOperateSpec.length && $scope.checkedOperateSpec.map(function (item, index) {
                    if (item.operationSpecCd == val.operationSpecCd) {
                        valueOfIndex = index;
                    }
                })
                chk ? valueOfIndex === '' && $scope.checkedOperateSpec.push(val) : $scope.checkedOperateSpec.splice(valueOfIndex, 1);
            }

            // 启用
            $scope.uLockOperateSpec = function (state) {
                if ($scope.checkedOperateSpec.length) {
                    var param = {
                        operationSpecCd: [],
                        state: 0
                    };
                    $scope.checkedOperateSpec.map(function (item, index) {
                        param.operationSpecCd.push(item.operationSpecCd);
                    });
                    param.operationSpecCd = param.operationSpecCd.join();
                    swal({
                        title: "权限规格启用",
                        text: "您确定要把权限规格编码为" + param.operationSpecCd + "的配置启用吗？",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "确定",
                        confirmButtonColor: "#ffaa00",
                        cancelButtonText: "取消",
                        showLoaderOnConfirm: true
                    }, function () {
                        httpMethod.uLockOperateSpec(param).then(function (rsp) {
                            $log.log('调用启用权限规格配置接口成功.');
                            if (rsp.data) {
                                swal("操作成功!", "权限规格配置启用成功！", "success");
                            } else {
                                swal("OMG", "权限规格配置启用失败!", "error");
                            }
                        }, function () {
                            $log.log('调用启用权限规格配置接口失败.');
                            swal("OMG", "调用启用权限规格配置接口失败!", "error");
                        });
                    });
                } else {
                    swal("操作提醒", "您没有选中任何需要启用的权限规格！", "info");
                }
            }
            // 停用
            $scope.lockOperateSpec = function (state) {
                if ($scope.checkedOperateSpec.length) {
                    var param = {
                        operationSpecCd: [],
                        state: 1
                    };
                    $scope.checkedOperateSpec.map(function (item, index) {
                        param.operationSpecCd.push(item.operationSpecCd);
                    });
                    param.operationSpecCd = param.operationSpecCd.join();
                    swal({
                        title: "权限规格配置停用",
                        text: "您确定要把权限规格编码为" + param.operationSpecCd + "的配置停用吗？",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "确定",
                        confirmButtonColor: "#ffaa00",
                        cancelButtonText: "取消",
                        showLoaderOnConfirm: true
                    }, function () {
                        httpMethod.lockOperateSpec(param).then(function (rsp) {
                            $log.log('调用停用权限规格配置接口成功.');
                            if (rsp.data) {
                                swal("操作成功!", "权限规格配置停用成功！", "success");
                            } else {
                                swal("OMG", "权限规格配置停用失败!", "error");
                            }
                        }, function () {
                            $log.log('调用停用权限规格配置接口失败.');
                            swal("OMG", "调用停用权限规格配置接口失败!", "error");
                        });
                    });
                } else {
                    swal("操作提醒", "您没有选中任何需要停用的权限规格！", "info");
                }
            }

            // 删除
            $scope.batchCancelOperateSpec = function () {
                if ($scope.checkedOperateSpec.length) {
                    var param = [];
                    $scope.checkedOperateSpec.map(function (item, index) {
                        param.push(item.operationSpecCd);
                    });
                    param = param.join();
                    swal({
                        title: "删除权限规格",
                        text: "您确定要把权限规格编码为" + param + "的配置删除吗？",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "确定",
                        confirmButtonColor: "#ffaa00",
                        cancelButtonText: "取消",
                        showLoaderOnConfirm: true
                    }, function () {
                        httpMethod.batchCancelOperateSpec(param).then(function (rsp) {
                            $log.log('调用删除权限规格配置接口成功.');
                            if (rsp.data) {
                                swal("操作成功!", "删除权限规格配置成功！", "success");
                            } else {
                                swal("OMG", "删除权限规格配置失败!", "error");
                            }
                        }, function () {
                            $log.log('调用删除权限规格配置接口失败.');
                            swal("OMG", "调用删除权限规格配置接口失败!", "error");
                        });
                    });
                } else {
                    swal("操作提醒", "您没有选中任何需要删除的权限规格！", "info");
                }
            }
        }])
        // 分页控制器
        .controller('paginationCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            $scope.$on('pageChange', function () {
                $scope.currentPage = 1;
            });
            $scope.maxSize = 10;
            $scope.setPage = function (pageNo) {
                $scope.currentPage = pageNo;
            };
            $scope.pageChanged = function () {
                $scope.queryOperateFormSubmit($scope.currentPage);
                $log.log('Page changed to: ' + $scope.currentPage);
            };
        }])
})
