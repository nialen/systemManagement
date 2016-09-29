/**
 * Auth heyue
 * Date 2016-09-12
 */

define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'ui-bootstrap-tpls', 'angular-animate'], function (angular, $, httpConfig, swal) {
    angular
        .module('sysModularModule', ['ui.bootstrap'])
        .run(['$rootScope', function ($rootScope) {
            $rootScope.isMock = false; // 是否MOCK数据
            $rootScope.SysResultList = []; // 查询模块列表
            $rootScope.modifiedSys = {}; // 待修改的模块信息
            $rootScope.isForbidSubmit = true; // 禁用编辑模块提交按钮
            $rootScope.sysType = []; // 业务模块类型列表
            $rootScope.systemList = []; // 所属系统
        }])

        /*传入数据*/
        .factory('httpMethod', ['$http', '$q', function ($http, $q) {
            var httpMethod = {};
            // 查询业务系统平台
            httpMethod.queryBusinessSystem = function () {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/queryBusinessSystem.action',
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

            // 查询业务模块类型
            httpMethod.queryModularType = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/queryModularType.action',
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

            // 查询上级业务模块
            httpMethod.querySysModularAsParent = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/querySysModularAsParent.action',
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

            // 查询业务模块
            httpMethod.querySysModular = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/querySysModular.action',
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

            // 新建服务
            httpMethod.insertSysModular = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/insertSysModular.action',
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
            httpMethod.alterSysModular = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/alterSysModular.action',
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
            httpMethod.deleteSysModularBatch = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/deleteSysModularBatch.action',
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



        // 查询控制器
        .controller('querySysFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {

            // 查询结果分页信息
            $scope.requirePaging = true; // 是否需要分页
            $scope.currentPage = 1; // 当前页
            $scope.rowNumPerPage = 5; // 每页显示行数
            $scope.totalNum = 0; // 总条数

            // 获取业务模块类型列表
            httpMethod.queryModularType().then(function (rsp) {
                $log.log('调用获取业务模块类型接口成功.');
                $rootScope.sysType = rsp.data;
            }, function () {
                $log.log('调用获取业务模块类型接口失败.');
            });

            // 获取业务系统平台列表
            httpMethod.queryBusinessSystem().then(function (rsp) {
                $log.log('调用获取业务系统平台接口成功.');
                $rootScope.systemList = rsp.data;
            }, function () {
                $log.log('调用获取业务系统平台接口失败.');
            });


            $scope.querySysFormSubmit = function (currentPage) {
                $scope.checkedSys = []; // 置空已选业务模型列表

                var param = {
                    // name: '', // 业务模块名称
                    // sysModularId: '', // 业务模块Id
                    // modularTypeCd: '', // 业务模块类型
                    requirePaging: $scope.requirePaging, // 是否需要分页
                    currentPage: currentPage || $scope.currentPage, // 当前页
                    rowNumPerPage: $scope.rowNumPerPage // 每页显示行数
                };
                $scope.querySysForm.sysModularId ? param.sysModularId = $scope.querySysForm.sysModularId : '';
                $scope.querySysForm.name ? param.name = $scope.querySysForm.name : '';
                $scope.querySysForm.modularTypeCdItem ? param.modularTypeCd = $scope.querySysForm.modularTypeCdItem.modularTypeCd : '';
                $scope.querySysForm.sysName ? param.sysName = $scope.querySysForm.sysName : '';
                $scope.querySysForm.sysIdItem ? param.sysId = $scope.querySysForm.sysIdItem.sysId : '';

                // 查询模块信息
                httpMethod.querySysModular(param).then(function (rsp) {
                    $log.log('调用查询模块信息接口成功.');
                    $rootScope.SysResultList = rsp.data.list;
                    $scope.totalNum = rsp.data.totalNum;
                }, function () {
                    $log.log('调用查询模块信息接口失败.');
                });
            }
            $scope.$watch('querySysForm', function (current, old, scope) {
                if (scope.querySysForm.sysModularId || scope.querySysForm.name ||
                    scope.querySysForm.modularTypeCdItem) {
                    scope.isForbid = false;
                } else {
                    scope.isForbid = true;
                }
            }, true)
        }])
        // 查询结果控制器
        .controller('SysResultCtrl', ['$scope', '$rootScope', '$log', '$filter', 'httpMethod', function ($scope, $rootScope, $log, $filter, httpMethod) {

            // 详情
            $scope.editSys = function (index, title) {
                $rootScope.modifiedSys = $rootScope.SysResultList[index];
                $rootScope.sysType.map(function (item, index) {
                    if (item.modularTypeCd == $rootScope.modifiedSys.modularTypeCd) {
                        $rootScope.modifiedSys.modularTypeCdItem = item;
                    }
                })
                $rootScope.sysTitle = title;
                $rootScope.systemList.map(function (item, index) {
                    if (item.sysId == $rootScope.modifiedSys.sysId) {
                        $rootScope.modifiedSys.sysIdItem = item;
                    }
                });
                $scope.$emit('openEditSysModal', 'alertSys');
            }
            // 修改
            $scope.modifySys = function (index, title) {
                $rootScope.modifiedSys = $rootScope.SysResultList[index];
                $rootScope.sysType.map(function (item, index) {
                    if (item.modularTypeCd == $rootScope.modifiedSys.modularTypeCd) {
                        $rootScope.modifiedSys.modularTypeCdItem = item;
                    }
                })
                $rootScope.sysTitle = title;
                $rootScope.systemList.map(function (item, index) {
                    if (item.sysId == $rootScope.modifiedSys.sysId) {
                        $rootScope.modifiedSys.sysIdItem = item;
                    }
                });
                parent.angular.element(parent.$('#tabs')).scope().addTab('模块修改', '/psm/page/modifiedSys/modifiedSys.html', 'modifySys', JSON.stringify($rootScope.modifiedSys));
            }
            // 新建
            $scope.addSys = function (title) {
                /*
                 $rootScope.modifiedSys = {};
                 $rootScope.sysTitle = '新建模块';
                 $scope.$emit('openEditSysModal');
                 */
                parent.angular.element(parent.$('#tabs')).scope().addTab('新建模块', '/psm/page/modifiedSys/modifiedSys.html', 'addNewSys');
            }
            /**
             * [check 复选框点击事件]
             * @param  {[type]} val [整行数据]
             * @param  {[boolean]} chk [是否选中]
             */
            $scope.check = function (val, chk) {
                var valueOfIndex = '';
                $scope.checkedSys.length && $scope.checkedSys.map(function (item, index) {
                    if (item.sysModularId == val.sysModularId) {
                        valueOfIndex = index;
                    }
                })
                chk ? valueOfIndex === '' && $scope.checkedSys.push(val) : $scope.checkedSys.splice(valueOfIndex, 1);
            }
            // 删除
            $scope.deleteSysModularBatch = function () {
                if ($scope.checkedSys.length) {
                    var param = [];
                    $scope.checkedSys.map(function (item, index) {
                        param.push(item.sysModularId);
                    });
                    param = param.join();
                    swal({
                        title: "删除模块",
                        text: "您确定要把业务模块ID为" + param + "的模块删除吗？",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "确定",
                        confirmButtonColor: "#ffaa00",
                        cancelButtonText: "取消",
                        showLoaderOnConfirm: true
                    }, function () {
                        httpMethod.deleteSysModularBatch(param).then(function (rsp) {
                            $log.log('调用删除业务模块接口成功.');
                            if (rsp.data) {
                                swal("操作成功!", "删除业务模块成功！", "success");
                            } else {
                                swal("OMG", "删除业务模块失败!", "error");
                            }
                        }, function () {
                            $log.log('调用删除业务模块接口失败.');
                            swal("OMG", "调用删除业务模块接口失败!", "error");
                        });
                    });
                } else {
                    swal("操作提醒", "您没有选中任何需要删除的业务模块！", "info");
                }
            }

            // 子iframe调用父iframe控制器内方法；
            $scope.demo = function () {
                parent.angular.element(parent.$('#tabs')).scope().addTab('新建模块', '/psm/page/sysModular/sysModular.html');
                // $log.log(parent.angular.element($('#tabs')).abbTabs, '父层iframe');
            }
        }])
        // 弹出框控制器
        // TODO 删除冗余代码
        // TODO 弹出样式调整；弹出框的OK按钮绑定提交表单操作；
        .controller('editSysModalCtrl', function ($scope, $rootScope, $uibModal, $log) {
            var $ctrl = this;
            $scope.$on('openEditSysModal', function (d, data) {
                $ctrl.open(data);
            });

            $ctrl.animationsEnabled = true;

            $ctrl.open = function (data) {
                var modalInstance = $uibModal.open({
                    animation: $ctrl.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'myModularContent.html',
                    controller: 'ModalInstanceCtrl',
                    controllerAs: '$ctrl',
                    size: 'lg',
                    resolve: {
                        items: function () {
                            return data;
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    $ctrl.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };

            $ctrl.openComponentModal = function () {
                var modalInstance = $uibModal.open({
                    animation: $ctrl.animationsEnabled,
                    component: 'modalComponent',
                    resolve: {
                        items: function () {
                            return $ctrl.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $ctrl.selected = selectedItem;
                }, function () {
                    $log.info('modal-component dismissed at: ' + new Date());
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
                $scope.$broadcast('submitSysModal', items);
            };

            $ctrl.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        })

        // 编辑模块信息控制器
        .controller('editSysFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            $scope.$on('submitSysModal', function (d, data) {
                $scope.editSysFormSubmit(data);
            });
            $scope.$watch('modifiedSys', function (current, old, scope) {
                if (scope.modifiedSys.sysModularId && scope.modifiedSys.name &&
                    scope.modifiedSys.modularTypeCdItem) {
                    $rootScope.isForbidSubmit = false;
                } else {
                    $rootScope.isForbidSubmit = true;
                }
            }, true);
            $scope.editSysFormSubmit = function (data) {
                if (data === 'insertSysModular') {
                    var param = {
                        name: '', // 业务模块名称
                        sysModularId: '', // 业务模块Id
                        modularTypeCd: '', // 业务模块类型
                        sysId: '',// 所属系统Id
                        sysName: '', //所属系统名称

                    };
                    param.name = $rootScope.modifiedSys.name;
                    param.sysModularId = $rootScope.modifiedSys.sysModularId;
                    param.modularTypeCd = $rootScope.modifiedSys.modularTypeCdItem.modularTypeCd;
                    param.sysId = $rootScope.modifiedSys.sysIdItem.sysId;
                    param.sysName = $rootScope.modifiedSys.sysName;

                    // 新建模块信息
                    httpMethod.insertSysModular(param).then(function (rsp) {
                        $log.log('调用新建模块接口成功.');
                        if (rsp.data) {
                            $log.log('新建模块成功.');
                        } else {
                            $log.log('新建模块失败.');
                        }
                    }, function () {
                        $log.log('调用新建模块接口失败.');
                    });
                } else if (data === 'alertStaff') {
                    var param = {
                        name: '', // 业务模块名称
                        sysModularId: '', // 业务模块Id
                        modularTypeCd: '', // 业务模块类型
                        sysId: '',// 所属系统
                        sysName: '', //所属系统名称
                    };
                    param.name = $rootScope.modifiedSys.name;
                    param.sysModularId = $rootScope.modifiedSys.sysModularId;
                    param.modularTypeCd = $rootScope.modifiedSys.modularTypeCdItem.modularTypeCd;
                    param.sysId = $rootScope.modifiedSys.sysIdItem.sysId;
                    param.sysName = $rootScope.modifiedSys.sysName;

                    // 修改模块信息
                    httpMethod.alterSysModular(param).then(function (rsp) {
                        $log.log('调用修改模块接口成功.');
                        if (rsp.data) {
                            $log.log('修改模块成功.');
                        } else {
                            $log.log('修改模块失败.');
                        }
                    }, function () {
                        $log.log('调用修改模块接口失败.');
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
                $scope.querySysFormSubmit($scope.currentPage);
                $log.log('Page changed to: ' + $scope.currentPage);
            };
        }])
})
