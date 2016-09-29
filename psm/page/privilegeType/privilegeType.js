/**
 * Auth
 * Date 2016-09-07
 */

define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'ui-bootstrap-tpls', 'angular-animate'], function (angular, $, httpConfig, swal) {
    angular
        .module('privilegeTypeModule', ['ui.bootstrap'])
        .run(['$rootScope', function ($rootScope) {
            // $rootScope.isMock = false; // 是否MOCK数据
            $rootScope.queryTypeResultList = []; // 查询
            $rootScope.modifiedQueryType = {}; // 待修改
        }])
        .factory('httpMethod', ['$http', '$q', function ($http, $q) {
            var httpMethod = {};

            // 查询权限类型信息
            httpMethod.queryTypeManager = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/queryOperationSpecType.action',
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

            // 新建员工信息
            httpMethod.insertType = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/insertOperationSpecType.action',
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

            // 编辑员工信息
            httpMethod.alertType = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/alterOperationSpecType.action',
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

            // 删除员工
            httpMethod.batchCancelType = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/deleteOperationSpecTypeBatch.action',
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
        .controller('queryTypeFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            // 查询结果分页信息
            $scope.requirePaging = true, // 是否需要分页
            $scope.currentPage = 1, // 当前页
            $scope.rowNumPerPage = 4, // 每页显示行数
            $scope.totalNum = 0 // 总条数
            $scope.checkedPrivilegeType = []; // 已经选中的权限类型信息

            $scope.isForbid = true;
            $scope.queryTypeForm = {
                operationSpecTypeCd: '',
                name: '',
            };
            $scope.queryTypeFormSubmit = function (currentPage) {
                $scope.checkedPrivilegeType = []; // 置空已选权限类型列表

                var param = {
                    // operationSpecTypeCd: '1', //类型编码
                    // operationSpecTypeName: '', //权限类型名称
                    requirePaging: $scope.requirePaging, //是否需要分页
                    currentPage: currentPage || $scope.currentPage, //当前页
                    rowNumPerPage: $scope.rowNumPerPage, //每页展示行数
                    totalRowNum: $scope.totalRowNum //总行数
                };
                $scope.queryTypeForm.operationSpecTypeCd ? param.operationSpecTypeCd = $scope.queryTypeForm.operationSpecTypeCd : '';
                $scope.queryTypeForm.operationSpecTypeName ? param.operationSpecTypeName = $scope.queryTypeForm.operationSpecTypeName : '';

                // 查询权限类型配置
                httpMethod.queryTypeManager(param).then(function (rsp) {
                    $log.log('调用查询员工信息接口成功.');
                    $rootScope.queryTypeResultList = rsp.data.list;
                    // if ($rootScope.isMock) {
                    //     $scope.totalNum = 3;
                    // }
                    $scope.totalNum = rsp.data.totalNum;
                }, function () {
                    $log.log('调用查询员工信息接口失败.');
                });
            }
            $scope.$watch('queryTypeForm', function (current, old, scope) {
                if (scope.queryTypeForm.operationSpecTypeCd || scope.queryTypeForm.operationSpecTypeName) {
                    scope.isForbid = false;
                } else {
                    scope.isForbid = true;
                }
            }, true);
        }])
        // 查询结果控制器
        .controller('privilegeTypeResultCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {

            // 修改
            $scope.editQueryType = function (title, index) {
                $rootScope.modifiedQueryType = $rootScope.queryTypeResultList[index];
                $rootScope.modalTitle = title;
                $scope.$emit('openEditQueryTypeModal', 'alertType');
            }
            // 新建
            $scope.addQueryType = function (title) {
                $rootScope.modifiedQueryType = {};
                $rootScope.modalTitle = title;
                $scope.$emit('openEditQueryTypeModal', 'insertType');
            }

            /**
             * [check 复选框点击事件]
             * @param  {[type]} val [整行数据]
             * @param  {[boolean]} chk [是否选中]
             */
            $scope.check = function (val, chk) {
                var valueOfIndex = '';
                $scope.checkedPrivilegeType.length && $scope.checkedPrivilegeType.map(function (item, index) {
                    if (item.operationSpecTypeCd == val.operationSpecTypeCd) {
                        valueOfIndex = index;
                    }
                })
                chk ? valueOfIndex === '' && $scope.checkedPrivilegeType.push(val) : $scope.checkedPrivilegeType.splice(valueOfIndex, 1);
            }

            // 删除
            $scope.batchCancelType = function () {
                if ($scope.checkedPrivilegeType.length) {
                    var param = [];
                    $scope.checkedPrivilegeType.map(function (item, index) {
                        param.push(item.operationSpecTypeCd);
                    });
                    param = param.join();
                    swal({
                        title: "删除权限类型配置",
                        text: "您确定要把权限类型编码为" + param + "的配置删除吗？",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "确定",
                        confirmButtonColor: "#ffaa00",
                        cancelButtonText: "取消",
                        showLoaderOnConfirm: true
                    }, function () {
                        httpMethod.batchCancelType(param).then(function (rsp) {
                            $log.log('调用删除权限类型配置接口成功.');
                            if (rsp.data) {
                                swal("操作成功!", "删除权限类型配置成功！", "success");
                            } else {
                                swal("OMG", "删除权限类型配置失败!", "error");
                            }
                        }, function () {
                            $log.log('调用删除权限类型配置接口失败.');
                            swal("OMG", "调用删除权限类型配置接口失败!", "error");
                        });
                    });
                } else {
                    swal("操作提醒", "您没有选中任何需要删除的权限类型配置！", "info");
                }
            }
        }])

        // 弹出框控制器
        // TODO 删除冗余代码
        // TODO 弹出样式调整；弹出框的OK按钮绑定提交表单操作；
        .controller('editQueryTypeModalCtrl', function ($scope, $rootScope, $uibModal, $log) {
            var $ctrl = this;
            $scope.$on('openEditQueryTypeModal', function (d, data) {
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
                            return data;
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
                $scope.$broadcast('submitQueryTypeModal', items);
            };

            $ctrl.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        })

        // 编辑控制器
        .controller('editQueryTypeFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {

            $scope.$on('submitQueryTypeModal', function (d, data) {
                $scope.editQueryTypeFormSubmit(data);
            });
            $scope.$watch('modifiedQueryType', function (current, old, scope) {
                if (scope.modifiedQueryType.operationSpecTypeCd && scope.modifiedQueryType.operationSpecTypeName) {
                    $rootScope.isForbidSubmit = false;
                } else {
                    $rootScope.isForbidSubmit = true;
                }
            }, true);
            $scope.editQueryTypeFormSubmit = function (data) {
                // TODO 获取更改之后的信息$rootScope.modifiedQueryType提交接口；
                if (data === 'insertType') {
                    var param = {
                        operationSpecTypeCd: '', //类型编码
                        operationSpecTypeName: '',//权限类型名称
                        operationSpecCdPrefix: '',//权限规格编码前缀
                        operationSpecTypeDesc: ''//描述
                    };
                    param.operationSpecTypeCd = $rootScope.modifiedQueryType.operationSpecTypeCd;
                    param.operationSpecTypeName = $rootScope.modifiedQueryType.operationSpecTypeName;
                    param.operationSpecCdPrefix = $rootScope.modifiedQueryType.operationSpecCdPrefix;
                    param.operationSpecTypeDesc = $rootScope.modifiedQueryType.description;

                    // 新建权限类型配置
                    httpMethod.insertType(param).then(function (rsp) {
                        $log.log('调用新建权限类型配置接口成功.');
                        if (rsp.data) {
                            $log.log('新建权限类型配置成功.');
                        } else {
                            $log.log('新建权限类型配置失败.');
                        }
                    }, function () {
                        $log.log('调用新建权限类型配置接口失败.');
                    });
                } else if (data === 'alertType') {
                    var param = {
                        operationSpecTypeCd: '',
                        operationSpecTypeName: '',
                        operationSpecCdPrefix: '',
                        operationSpecTypeDesc: ''
                    };
                    param.operationSpecTypeCd = $rootScope.modifiedQueryType.operationSpecTypeCd;
                    param.operationSpecTypeName = $rootScope.modifiedQueryType.operationSpecTypeName;
                    param.operationSpecCdPrefix = $rootScope.modifiedQueryType.operationSpecCdPrefix;
                    param.operationSpecTypeDesc = $rootScope.modifiedQueryType.description;

                    // 修改权限类型配置
                    httpMethod.alertType(param).then(function (rsp) {
                        $log.log('调用修改权限类型配置接口成功.');
                        if (rsp.data) {
                            $log.log('修改权限类型配置成功.');
                        } else {
                            $log.log('修改权限类型配置失败.');
                        }
                    }, function () {
                        $log.log('调用修改权限类型配置接口失败.');
                    });
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
                $scope.queryTypeFormSubmit($scope.currentPage);
                $log.log('Page changed to: ' + $scope.currentPage);
            };
        }])
})
