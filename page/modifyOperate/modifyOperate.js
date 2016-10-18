/**
 * Auth
 * Date 2016-09-13
 */

define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'ui-bootstrap-tpls', 'angular-animate'], function(angular, $, httpConfig, swal) {
    angular
        .module('modifyOperateModule', ['ui.bootstrap'])
        .run(['$rootScope', '$parse', '$log', function ($rootScope, $parse, $log) {
            var id = window.frameElement && window.frameElement.id || '',
                obj = parent.$('#' + id).attr('data');
            $rootScope.modifiedOperateSpec = obj ? JSON.parse(obj) : {}; // 待修改的权限规格信息
            $rootScope.operationType = []; // 权限类型列表
            $rootScope.isModifiedOperateList = !obj ? true : false;

            $rootScope.systemList = []; //所属系统
            $rootScope.sysType = []; //业务模块类型

        }])
        .factory('httpMethod', ['$http', '$q', function($http, $q) {
            var httpMethod = {};

            // 获取权限类型
            httpMethod.queryOperationType = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/queryOperationSpecType.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
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

            // 查询已选权限维度
            httpMethod.queryPrivilegeDimensionInOperationSpec = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/queryPrivilegeDimensionInOperationSpec.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'param=' + JSON.stringify(param)
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

            // 查询已选业务模块
            httpMethod.querySysModularInOperationSpec = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/querySysModularInOperationSpec.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'param=' + JSON.stringify(param)
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

            // 查询可选权限维度
            httpMethod.queryPrivilegeDimension4Pick = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/queryPrivilegeDimension4Pick.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'param=' + JSON.stringify(param)
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

            // 查询可选业务模块
            httpMethod.querySysModular4Pick = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/querySysModular4Pick.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'param=' + JSON.stringify(param)
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

            // 查询业务系统平台
            httpMethod.queryBusinessSystem = function() {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/queryBusinessSystem.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
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

            // 新建权限规格信息
            httpMethod.insertOperateSpec = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/insertOperationSpec.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'data=' + JSON.stringify(param)
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

            // 编辑权限规格信息
            httpMethod.alertOperateSpec = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/alterOperationSpec.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'data=' + JSON.stringify(param)
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

    // 修改权限规格基本信息控制器
    .controller('modifyOperateFormCtrl', ['$scope', '$rootScope', '$log', '$timeout','httpMethod', function($scope, $rootScope, $log, $timeout, httpMethod) {
        // 获取权限类型列表
        httpMethod.queryOperationType().then(function(rsp) {
            $log.log('调用获取权限类型接口成功.');
            $rootScope.operationType = rsp.data.list;
        }, function() {
            $log.log('调用获取权限类型接口失败.');
        });

        $scope.modifyOperateForm = $.extend(true, {
            operationSpecCd: '', //权限规格编码
            name: '', //权限规格名称
            operationSpecTypeCd: '', //数据类型
            description: '', //地区描述
        }, $rootScope.modifiedOperateSpec);

        $scope.modifyOperateFormSubmit = function() {

            var param = {
                operationSpecCd: '', //权限规格编码
                name: '', //权限规格名称
                operationSpecTypeCd: '', //权限规格类型
                manageCd: '', //管理编码
                state: '', //状态（0－启用，1－未启用，2－注销）
                specLevel: '', //权限规格级别
                description: '', //描述
                modularList: [{
                    sysModularId: '' //业务模块Id
                }],
                dimensionList: [{
                    privilegeDimensionCd: '' //权限维度编码
                }]
            };
            $scope.modifyOperateForm.operationSpecCd ? param.operationSpecCd = $scope.modifyOperateForm.operationSpecCd : '';
            $scope.modifyOperateForm.name ? param.name = $scope.modifyOperateForm.name : '';
            $scope.modifyOperateForm.modularTypeCdItem ? param.modularTypeCd = $scope.modifyOperateForm.modularTypeCdItem : '';
            $scope.modifyOperateForm.operationSpecTypeCd ? param.operationSpecTypeCd = $scope.modifyOperateForm.operationSpecTypeCd : '';
            $scope.modifyOperateForm.manageCd ? param.manageCd = $scope.modifyOperateForm.manageCd : '';
            $scope.modifyOperateForm.state ? param.state = $scope.modifyOperateForm.state : '';
            $scope.modifyOperateForm.specLevel ? param.specLevel = $scope.modifyOperateForm.specLevel : '';
            $scope.modifyOperateForm.description ? param.description = $scope.modifyOperateForm.description : '';
            $scope.modifyOperateForm.modularList ? param.modularList.sysModularId = $scope.modifyOperateForm.modularList : '';
            $scope.modifyOperateForm.dimensionList ? param.dimensionList.privilegeDimensionCd = $scope.modifyOperateForm.dimensionList : '';
            param.modularList = $rootScope.preveligeDoneResultList;
            param.dimensionList = $rootScope.preveligeDimensionResultList;
            if ($rootScope.isModifiedOperateList) {
                httpMethod.insertOperateSpec(param).then(function(rsp) {
                    $log.log('调用新建权限规格接口成功.');
                    if (rsp.data) {
                        swal({
                            title: '操作成功!',
                            text: '新建权限规格成功！',
                            type: 'success'
                        }, function() {
                            $timeout(function () {
                                parent.angular.element(parent.$('#tabs')).scope().removeTab();
                            });
                        });
                    } else {
                        swal("OMG", rsp.msg || "新建权限规格失败!", "error");
                    }
                })
            } else {
                httpMethod.alertOperateSpec(param).then(function(rsp) {
                    $log.log('调用修改权限规格接口成功.');
                   if (rsp.data) {
                        swal({
                            title: '操作成功!',
                            text: '修改权限规格成功！',
                            type: 'success'
                        }, function () {
                            $timeout(function () {
                                parent.angular.element(parent.$('#tabs')).scope().removeTab();
                            });
                        });
                    } else {
                        swal("OMG", rsp.msg || "修改权限规格失败!", "error");
                    }
                })
            }
        };
        // 监听响应变化
        $scope.$watch('modifiedOperateSpec', function(current, old, scope) {
            if (current.operationSpecCd !== old.operationSpecCd || current.name !== old.name) {
                scope.modifyOperateForm.operationSpecCd = $rootScope.modifiedOperateSpec.operationSpecCd;
                scope.modifyOperateForm.name = $rootScope.modifiedOperateSpec.name;
            }
        }, true);
    }])


    // 权限维度查询控制器
    .controller('preveligeDimensionFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        var param = {};
        param.operationSpecCd = $rootScope.modifiedOperateSpec.operationSpecCd;
        // 权限维度删除列表
        $scope.deleteDimensionList = [];

        $rootScope.preveligeDimensionResultList = [];

        // 查询已选权限维度信息
        httpMethod.queryPrivilegeDimensionInOperationSpec(param).then(function(rsp) {
            $log.log('调用查询已选权限维度接口成功.');
            $rootScope.preveligeDimensionResultList = rsp.data;
            $scope.totalNum = rsp.data.totalNum;
        }, function() {
            $log.log('调用查询已选权限维度接口失败.');
        });

        /**
         * [check 复选框点击事件]
         * @param  {[type]} val [整行数据]
         * @param  {[boolean]} chk [是否选中]
         */
        $scope.check = function (val, chk) {
            var valueOfIndex = '';
            $scope.deleteDimensionList.length && $scope.deleteDimensionList.map(function (item, index) {
                if (item.privilegeDimensionCd == val.privilegeDimensionCd) {
                    valueOfIndex = index;
                }
            })
            chk ? valueOfIndex === '' && $scope.deleteDimensionList.push(val) : $scope.deleteDimensionList.splice(valueOfIndex, 1);
        }
        $scope.deleteDimension = function () {
            if ($scope.deleteDimensionList.length) {
                swal({
                    title: "删除权限维度",
                    text: "您确定要把权限维度编码为移除吗？",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "确定",
                    confirmButtonColor: "#ffaa00",
                    cancelButtonText: "取消",
                }, function () {
                    for (var i = $rootScope.preveligeDimensionResultList.length - 1; i >= 0; i--) {
                        var preveligeDimension = $rootScope.preveligeDimensionResultList[i];
                        for (var j = $scope.deleteDimensionList.length - 1; j >= 0; j--) {
                            var deleteObj = $scope.deleteDimensionList[j];
                            if(deleteObj.privilegeDimensionCd == preveligeDimension.privilegeDimensionCd){
                                $rootScope.preveligeDimensionResultList.splice(i,1);
                            }
                        }
                    }
                    // angular.forEach($scope.preveligeDimensionResultList, function(preveligeDimension,i){
                    //     angular.forEach($scope.deleteDimensionList, function(deleteDimension,j){
                    //         if()
                    //     }
                    // }
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    swal("操作成功!", "移除权限维度成功！", "success");
                });
            } else {
                swal("操作提醒", "您没有选中任何需要移除的权限维度！", "info");
            }
        }

        // 新建权限维度
        $scope.addDimension = function() {
            $scope.$emit('openAddDimensionModal');
        }
        // 权限维度详情
        $scope.dimensionInfo = function(index) {
            $rootScope.dimensionInfo = $rootScope.preveligeDimensionResultList[index];
            $scope.$emit('openDimensionInfoModal');
        }
    }])

    // 业务模块查询控制器
    .controller('preveligeDoneFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 4; // 每页显示行数
        $scope.totalNum = 0; // 总条数

        // 业务模块删除列表
        $scope.deleteSysModularList = [];

        $rootScope.preveligeDoneResultList = [];

        var param = {};

        param.operationSpecCd = $rootScope.modifiedOperateSpec.operationSpecCd;

        // 查询已选业务模块信息
        httpMethod.querySysModularInOperationSpec(param).then(function(rsp) {
            $log.log('调用查询已选业务模块接口成功.');
            $rootScope.preveligeDoneResultList = rsp.data;
            $scope.totalNum = rsp.data.totalNum;
        }, function() {
            $log.log('调用查询已选业务模块接口失败.');
        });

         /**
         * [check 复选框点击事件]
         * @param  {[type]} val [整行数据]
         * @param  {[boolean]} chk [是否选中]
         */
        $scope.check = function (val, chk) {
            var valueOfIndex = '';
            $scope.deleteSysModularList.length && $scope.deleteSysModularList.map(function (item, index) {
                if (item.sysModularId == val.sysModularId) {
                    valueOfIndex = index;
                }
            })
            chk ? valueOfIndex === '' && $scope.deleteSysModularList.push(val) : $scope.deleteSysModularList.splice(valueOfIndex, 1);
        }
        $scope.deleteSysModular = function () {
            if ($scope.deleteSysModularList.length) {
                swal({
                    title: "删除业务模块",
                    text: "您确定要把该业务模块移除吗？",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "确定",
                    confirmButtonColor: "#ffaa00",
                    cancelButtonText: "取消",
                }, function () {
                    for (var i = $rootScope.preveligeDoneResultList.length - 1; i >= 0; i--) {
                        var preveligeDone = $rootScope.preveligeDoneResultList[i];
                        for (var j = $scope.deleteSysModularList.length - 1; j >= 0; j--) {
                            var deleteObj = $scope.deleteSysModularList[j];
                            if(deleteObj.sysModularId == preveligeDone.sysModularId){
                                $rootScope.preveligeDoneResultList.splice(i,1);
                            }
                        }
                    }
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    swal("操作成功!", "移除业务模块成功！", "success");
                });
            } else {
                swal("操作提醒", "您没有选中任何需要移除的业务模块！", "info");
            }
        }

        // 新建业务模块
        $scope.addPreveligeDone = function() {
            $scope.$emit('openAddPreveligeDoneModal');
        }
        // 业务模块详情
        $scope.businessModuleInfo = function(index) {
            $rootScope.businessModuleInfo = $rootScope.preveligeDoneResultList[index];
            $scope.$emit('openBusinessModuleInfoModal');
        }
    }])

    // 权限维度弹出框控制器
    .controller('preveligeDimensionModalCtrl', function($scope, $rootScope, $uibModal, $log) {
        var $ctrl = this;
        $scope.$on('openAddDimensionModal', function(d, data) {
            $ctrl.addDimensionModal(data);
        });

        $scope.$on('openDimensionInfoModal', function(d, data) {
            $ctrl.dimensionInfoModal(data);
        });

        $ctrl.animationsEnabled = true;

        $ctrl.addDimensionModal = function() {
            var modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'addDimensionModal.html',
                controller: 'ModalAddDimensionCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return $ctrl.items;
                    }
                }
            });
        };
        $ctrl.dimensionInfoModal = function() {
            var modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'dimensionInfoModal.html',
                controller: 'ModalDimensionInfoCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return $ctrl.items;
                    }
                }
            });
        };

        $ctrl.toggleAnimation = function() {
            $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
        };
    })
    .controller('ModalAddDimensionCtrl', function($uibModalInstance, $scope, items) {
        var $ctrl = this;

        $ctrl.ok = function() {
            $uibModalInstance.close();
            $scope.$broadcast('submitPreveligeDimensionModal');
        };

        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('ModalDimensionInfoCtrl', function($uibModalInstance, $scope, items) {
        var $ctrl = this;
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    // 维度可选查询控制器queryPrivilegeDimension4Pick
    .controller('queryDimensionFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        $scope.requirePaging = true, // 是否需要分页
        $scope.currentPage = 1, // 当前页
        $scope.rowNumPerPage = 4, // 每页显示行数
        $scope.totalNum = 0 // 总条数

        $scope.queryDimensionForm = {};

        $rootScope.queryDimensionResultList = [];

        $scope.queryDimensionFormSubmit = function(currentPage) {
            $scope.checkedPrivilegeDimension4Pick = []; // 置空已选权限类型列表
            var param = {
                requirePaging: $scope.requirePaging, //是否需要分页
                currentPage: currentPage || $scope.currentPage, //当前页
                rowNumPerPage: $scope.rowNumPerPage, //每页展示行数
            };

            $scope.queryDimensionForm.privilegeDimensionCd ? param.privilegeDimensionCd = $scope.queryDimensionForm.privilegeDimensionCd : '';
            $scope.queryDimensionForm.name ? param.name = $scope.queryDimensionForm.name : '';
            param.operationSpecCd = $rootScope.modifiedOperateSpec.operationSpecCd;

            // 查询权限类型配置
            httpMethod.queryPrivilegeDimension4Pick(param).then(function(rsp) {
                $log.log('调用查询可选权限维度接口成功.');
                $rootScope.queryDimensionResultList = rsp.data.list;
                $scope.totalNum = rsp.data.totalNum;
            }, function() {
                $log.log('调用查询可选权限维度接口失败.');
            });
        }
    }])
    // 权限维度查询结果控制器
    .controller('queryDimensionResultCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.$on('submitPreveligeDimensionModal', function(d, data) {
            $scope.addQueryDimensionFormSubmit(data);
        });
        // 添加维度列表
        $scope.addDimensionList = [];

        $scope.check = function (val, chk) {
            var valueOfIndex = '';
            var existFlag = false;
            // 判断已有的维度列表是否存在
            angular.forEach($rootScope.preveligeDimensionResultList, function(data){
                if(!existFlag){
                    if(val.privilegeDimensionCd==data.privilegeDimensionCd){
                        existFlag = true;
                    }
                }

            });
            $scope.addDimensionList.length && $scope.addDimensionList.map(function (item, index) {
                if (item.privilegeDimensionCd == val.privilegeDimensionCd) {
                    valueOfIndex = index;
                }
            })
            chk ? valueOfIndex === ''&& !existFlag && $scope.addDimensionList.push(val) : $scope.addDimensionList.splice(valueOfIndex, 1);
        }
        $scope.addQueryDimensionFormSubmit = function() {
            // TODO 获取更改之后的信息$rootScope.modifiedQueryType提交接口；

            $rootScope.preveligeDimensionResultList = $rootScope.preveligeDimensionResultList.concat($scope.addDimensionList);
        }
    }])


    // 业务模块弹出框控制器
    .controller('preveligeDoneModalCtrl', function($scope, $rootScope, $uibModal, $log) {
        var $ctrl = this;
        $scope.$on('openAddPreveligeDoneModal', function(d, data) {
            $ctrl.addPreveligeDoneModal(data);
        });

        $scope.$on('openBusinessModuleInfoModal', function(d, data) {
            $ctrl.businessModuleInfoModal(data);
        });

        $ctrl.animationsEnabled = true;

        $ctrl.addPreveligeDoneModal = function() {
            var modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'doneModalContent.html',
                controller: 'ModalAddPreveligeDoneCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return $ctrl.items;
                    }
                }
            });
        };
        $ctrl.businessModuleInfoModal = function() {
            var modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'businessModuleInfoModal.html',
                controller: 'ModalBusinessModuleInfoCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return $ctrl.items;
                    }
                }
            });
        };

        $ctrl.toggleAnimation = function() {
            $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
        };
    })
    .controller('ModalAddPreveligeDoneCtrl', function($uibModalInstance, $scope, items) {
        var $ctrl = this;
        $ctrl.ok = function() {
            $uibModalInstance.close();
            $scope.$broadcast('submitQueryDoneModal');
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('ModalBusinessModuleInfoCtrl', function($uibModalInstance, $scope, items) {
        var $ctrl = this;
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    // 业务模块可选查询控制器querySysModular4Pick
    .controller('queryDoneFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod',function($scope, $rootScope, $log,httpMethod) {
        // 获取业务系统
        httpMethod.queryBusinessSystem().then(function(rsp) {
            $log.log('调用获取业务系统接口成功.');
            $rootScope.systemList = rsp.data;
        }, function() {
            $log.log('调用获取业务系统接口失败.');
        });

        // 获取业务模块类型
        httpMethod.queryModularType().then(function(rsp) {
            $log.log('调用获取业务模块类型接口成功.');
            $rootScope.sysType = rsp.data;
        }, function() {
            $log.log('调用获取业务模块类型接口失败.');
        });

        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 4; // 每页显示行数
        $scope.totalNum = 0; // 总条数

        $scope.queryDoneForm = {};

        $rootScope.queryDoneResultList = [];

        $scope.queryDoneFormSubmit = function(currentPage) {
            $scope.checkedSysModular4Pick = []; // 置空已选权限类型列表
            var param = {
                requirePaging: $scope.requirePaging, //是否需要分页
                currentPage: currentPage || $scope.currentPage, //当前页
                rowNumPerPage: $scope.rowNumPerPage, //每页展示行数
            };

            $scope.queryDoneForm.sysModularId ? param.sysModularId = $scope.queryDoneForm.sysModularId : '';
            $scope.queryDoneForm.name ? param.name = $scope.queryDoneForm.name : '';
            $scope.queryDoneForm.sysItem ? param.sysId = $scope.queryDoneForm.sysItem : '';
            $scope.queryDoneForm.modularTypeCd ? param.modularTypeCd = $scope.queryDoneForm.modularTypeCd : '';

            param.operationSpecCd = $rootScope.modifiedOperateSpec.operationSpecCd;

            // 查询权限类型配置
            httpMethod.querySysModular4Pick(param).then(function(rsp) {
                $log.log('调用查询可选权限维度接口成功.');
                $rootScope.queryDoneResultList = rsp.data.list;
                $scope.totalNum = rsp.data.totalNum;
            }, function() {
                $log.log('调用查询可选权限维度接口失败.');
            });
        }
    }])
    // 查询结果控制器
    .controller('queryDoneResultCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.$on('submitQueryDoneModal', function() {
            $scope.addQueryDoneFormSubmit();
        });

         // 添加维度列表
        $scope.addSysModularList = [];

        $scope.check = function (val, chk) {
            var valueOfIndex = '';
            var existFlag = false;
            // 判断已有的业务模块列表是否存在
            angular.forEach($rootScope.preveligeDoneResultList, function(data){
                if(!existFlag){
                    if(val.sysModularId==data.sysModularId){
                        existFlag = true;
                    }
                }
            });
            $scope.addSysModularList.length && $scope.addSysModularList.map(function (item, index) {
                if (item.sysModularId == val.sysModularId) {
                    valueOfIndex = index;
                }
            })
            chk ? valueOfIndex === ''&& !existFlag && $scope.addSysModularList.push(val) : $scope.addSysModularList.splice(valueOfIndex, 1);
        }
        $scope.addQueryDoneFormSubmit = function() {

            $rootScope.preveligeDoneResultList = $rootScope.preveligeDoneResultList.concat($scope.addSysModularList);
        }
    }])

    // 分页控制器
    .controller('paginationDimensionCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        $scope.maxSize = 10;
        $scope.pageChanged = function() {
            $scope.queryDimensionFormSubmit($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }])

    .controller('paginationSysModularCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        $scope.maxSize = 10;
        $scope.pageChanged = function() {
            $scope.queryDoneFormSubmit($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }]);
})
