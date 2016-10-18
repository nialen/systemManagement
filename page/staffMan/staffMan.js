/**
 * Auth 丁少华
 * Date 2016-09-07
 */
define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'ui-bootstrap-tpls', 'angular-animate'], function (angular, $, httpConfig, swal) {
    angular
        .module('staffManModule', ['ui.bootstrap'])
        .run(['$rootScope', function ($rootScope) {
            $rootScope.staffManResultList = []; // 查询员工列表
            $rootScope.modifiedStaffMan = {}; // 待修改的员工信息
            $rootScope.isForbidSubmit = true; // 禁用编辑员工提交按钮
            $rootScope.areaList = []; // 地区列表
        }])
        .factory('httpMethod', ['$http', '$q', function ($http, $q) {
            var httpMethod = {};
            // 获取地区列表
            httpMethod.queryArea = function () {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/staff/profile/queryArea.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader
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

            // 查询员工信息
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

            // 新建员工信息
            httpMethod.insertStaff = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/staff/profile/insertStaff.action',
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
            httpMethod.alertStaff = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/staff/profile/alertStaff.action',
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

            // 启用员工
            httpMethod.uLockStaffManagerBatch = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/staff/profile/uLockStaffManagerBatch.action',
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

            // 停用员工
            httpMethod.lockStaffManagerBatch = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/staff/profile/lockStaffManagerBatch.action',
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

            // 删除员工
            httpMethod.batchCancelStaff = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/staff/profile/BatchcancelStaff.action',
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
        // 地区编码转换地区名称
        .filter('areaIdConversionName', function () {
            return function (areaId, areaList) {
                var output = '';
                if (areaList.length) {
                    areaList.map(function (item, index) {
                        if (item.areaId == areaId) {
                            output = item.areaName;
                        }
                    })
                }
                return output;
            }
        })
        // 查询控制器
        .controller('queryStaffFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {

            // 查询结果分页信息
            $scope.requirePaging = true; // 是否需要分页
            $scope.currentPage = 1; // 当前页
            $scope.rowNumPerPage = 10; // 每页显示行数
            $scope.totalNum = 0; // 总条数

            // 获取地区列表
            httpMethod.queryArea().then(function (rsp) {
                $log.log('调用获取地区接口成功.');
                $rootScope.areaList = rsp.data;
            }, function () {
                $log.log('调用获取地区接口失败.');
            });

            $scope.checkedStaffMan = []; // 已经选中的员工信息

            $scope.isForbid = true;
            $scope.queryStaffForm = {
                name: '', // 员工姓名
                staffNumber: '', // 员工工号
                areaItem: '' // 地区
            };
            $scope.queryStaffFormSubmit = function (currentPage) {
                !currentPage && $scope.$broadcast('pageChange');
                $scope.checkedStaffMan = []; // 置空已选员工列表

                var param = {
                    // name: '', // 员工姓名
                    // staffNumber: '', // 员工工号
                    // areaId: '', // 地区Id
                    requirePaging: $scope.requirePaging, // 是否需要分页
                    currentPage: currentPage || $scope.currentPage, // 当前页
                    rowNumPerPage: $scope.rowNumPerPage // 每页显示行数
                };
                $scope.queryStaffForm.name ? param.name = $scope.queryStaffForm.name : '';
                $scope.queryStaffForm.staffNumber ? param.staffNumber = $scope.queryStaffForm.staffNumber : '';
                $scope.queryStaffForm.areaItem ? param.areaId = $scope.queryStaffForm.areaItem : '';

                // 查询员工信息
                httpMethod.queryStaffManager(param).then(function (rsp) {
                    $log.log('调用查询员工信息接口成功.');
                    $rootScope.staffManResultList = rsp.data.list;
                    $scope.totalNum = rsp.data.totalNum;
                }, function () {
                    $log.log('调用查询员工信息接口失败.');
                });
            };
            $scope.$watch('queryStaffForm', function (current, old, scope) {
                if (scope.queryStaffForm.staffNumber || scope.queryStaffForm.name || scope.queryStaffForm.areaItem) {
                    scope.isForbid = false;
                } else {
                    scope.isForbid = true;
                }
            }, true);
        }])
        // 查询结果控制器
        .controller('staffManResultCtrl', ['$scope', '$rootScope', '$log', '$filter', 'httpMethod', function ($scope, $rootScope, $log, $filter, httpMethod) {
            // 修改
            $scope.editStaffMan = function (title, index) {
                $rootScope.modifiedStaffMan = $rootScope.staffManResultList[index];
                $rootScope.areaList.map(function (item, index) {
                    if (item.areaId == $rootScope.modifiedStaffMan.areaId) {
                        $rootScope.modifiedStaffMan.areaItem = item.areaId;
                    }
                });

                $rootScope.modalTitle = title;
                $scope.$emit('openEditStaffManModal', 'alertStaff');
            };
            // 新建
            $scope.addStaffMan = function (title) {
                $rootScope.modifiedStaffMan = {};
                $rootScope.modalTitle = title;
                $scope.$emit('openEditStaffManModal', 'insertStaff');
            };

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

            // 启用
            $scope.uLockStaffManagerBatch = function () {
                if ($scope.checkedStaffMan.length) {
                    var param = [];
                    $scope.checkedStaffMan.map(function (item, index) {
                        param.push(item.staffId);
                    });
                    param = param.join();
                    swal({
                        title: "员工状态启用",
                        text: "您确定要把员工ID为" + param + "的员工状态启用吗？",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "确定",
                        confirmButtonColor: "#ffaa00",
                        cancelButtonText: "取消",
                        showLoaderOnConfirm: true
                    }, function () {
                        httpMethod.uLockStaffManagerBatch(param).then(function (rsp) {
                            $log.log('调用启用员工状态接口成功.');
                            if (rsp.data) {
                                swal("操作成功!", "员工状态启用成功！", "success");
                            } else {
                                swal("OMG", rsp.msg || "员工状态启用失败!", "error");
                            }
                        }, function () {
                            $log.log('调用启用员工状态接口失败.');
                            swal("OMG", "调用启用员工状态接口失败!", "error");
                        });
                    });
                } else {
                    swal("操作提醒", "您没有选中任何需要启用的员工！", "info");
                }
            };

            // 停用
            $scope.lockStaffManagerBatch = function () {
                if ($scope.checkedStaffMan.length) {
                    var param = [];
                    $scope.checkedStaffMan.map(function (item, index) {
                        param.push(item.staffId);
                    });
                    param = param.join();
                    swal({
                        title: "员工状态停用",
                        text: "您确定要把员工ID为" + param + "的员工状态停用吗？",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "确定",
                        confirmButtonColor: "#ffaa00",
                        cancelButtonText: "取消",
                        showLoaderOnConfirm: true
                    }, function () {
                        httpMethod.lockStaffManagerBatch(param).then(function (rsp) {
                            $log.log('调用停用员工状态接口成功.');
                            if (rsp.data) {
                                swal("操作成功!", "员工状态停用成功！", "success");
                            } else {
                                swal("OMG", rsp.msg || "员工状态停用失败!", "error");
                            }
                        }, function () {
                            $log.log('调用停用员工状态接口失败.');
                            swal("OMG", "调用停用员工状态接口失败!", "error");
                        });
                    });
                } else {
                    swal("操作提醒", "您没有选中任何需要停用的员工！", "info");
                }
            };

            // 删除
            $scope.batchCancelStaff = function () {
                if ($scope.checkedStaffMan.length) {
                    var param = [];
                    $scope.checkedStaffMan.map(function (item, index) {
                        param.push(item.staffId);
                    });
                    param = param.join();
                    swal({
                        title: "删除员工",
                        text: "您确定要把员工ID为" + param + "的员工删除吗？",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "确定",
                        confirmButtonColor: "#ffaa00",
                        cancelButtonText: "取消",
                        showLoaderOnConfirm: true
                    }, function () {
                        httpMethod.batchCancelStaff(param).then(function (rsp) {
                            $log.log('调用删除员工接口成功.');
                            if (rsp.data) {
                                swal("操作成功!", "删除员工成功！", "success");
                            } else {
                                swal("OMG", rsp.msg || "删除员工失败!", "error");
                            }
                        }, function () {
                            $log.log('调用删除员工接口失败.');
                            swal("OMG", "调用删除员工接口失败!", "error");
                        });
                    });
                } else {
                    swal("操作提醒", "您没有选中任何需要删除的员工！", "info");
                }
            }

        }])
        // 弹出框控制器
        .controller('editStaffManModalCtrl', function ($scope, $rootScope, $uibModal, $log) {
            var $ctrl = this;
            $scope.$on('openEditStaffManModal', function (d, data) {
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
                $scope.$broadcast('submitStaffManModal', items);
            };

            $ctrl.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        })
        // 编辑员工信息控制器
        .controller('editStaffManFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            $scope.$on('submitStaffManModal', function (d, data) {
                $scope.editStaffManFormSubmit(data);
            });
            $scope.$watch('modifiedStaffMan', function (current, old, scope) {
                if (scope.modifiedStaffMan.staffNumber && scope.modifiedStaffMan.name && scope.modifiedStaffMan.areaItem) {
                    $rootScope.isForbidSubmit = false;
                } else {
                    $rootScope.isForbidSubmit = true;
                }
            }, true);
            $scope.editStaffManFormSubmit = function (data) {
                if (data === 'insertStaff') {
                    var param = {
                        staffNumber: '', // 员工工号
                        name: '', // 名称
                        areaId: '' // 地区
                    };
                    param.staffNumber = $rootScope.modifiedStaffMan.staffNumber;
                    param.name = $rootScope.modifiedStaffMan.name;
                    param.areaId = $rootScope.modifiedStaffMan.areaItem;

                    // 新建员工信息
                    httpMethod.insertStaff(param).then(function (rsp) {
                        $log.log('调用新建员工信息接口成功.');
                        if (rsp.data) {
                            swal("操作成功!", "新建员工信息成功！", "success");
                        } else {
                            swal("OMG", rsp.msg || "新建员工信息失败!", "error");
                        }
                    }, function () {
                        $log.log('调用新建员工信息接口失败.');
                        swal("OMG", "调用新建员工信息接口失败!", "error");
                    });
                } else if (data === 'alertStaff') {
                    var param = {
                        staffId: '', //员工Id
                        staffNumber: '', // 员工工号
                        name: '', // 名称
                        areaId: '' // 地区
                    };
                    param.staffId = $rootScope.modifiedStaffMan.staffId;
                    param.staffNumber = $rootScope.modifiedStaffMan.staffNumber;
                    param.name = $rootScope.modifiedStaffMan.name;
                    param.areaId = $rootScope.modifiedStaffMan.areaItem;

                    // 修改员工信息
                    httpMethod.alertStaff(param).then(function (rsp) {
                        $log.log('调用修改员工信息接口成功.');
                        if (rsp.data) {
                            swal("操作成功!", "修改员工信息成功！", "success");
                        } else {
                            swal("OMG", rsp.msg || "修改员工信息失败!", "error");
                        }
                    }, function () {
                        $log.log('调用修改员工信息接口失败.');
                        swal("OMG", "调用修改员工信息接口失败!", "error");
                    });
                }
            }
        }])
        // 分页控制器
        .controller('paginationCtrl', ['$scope', '$rootScope', '$log', function ($scope, $rootScope, $log) {
            $scope.$on('pageChange', function () {
                $scope.currentPage = 1;
            });
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
