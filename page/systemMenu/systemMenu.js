/**
 * Auth 丁少华
 * Date 2016-09-22
 */

define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'ui-bootstrap-tpls', 'angular-animate'], function (angular, $, httpConfig, swal) {
    angular
        .module('systemMenuModule', ['ui.bootstrap'])
        .run(['$rootScope', function ($rootScope) {
            $rootScope.checkedSysModular = {}; // 选中的业务模块ID
            $rootScope.choiceMenu = {
                // sysModularId: '' // 选中的业务模块ID
            }; // 待编辑的菜单项
            $rootScope.isDisableSysModular = true; // 是否禁用业务模块选择
            $rootScope.isDisableIcon = false; // 是否禁用菜单Icon设置
            $rootScope.isAddNewMenu = true; // 是否是添加新菜单
        }])
        .factory('httpMethod', ['$http', '$q', function ($http, $q) {
            var httpMethod = {};

            // 查询已配置系统菜单列表
            httpMethod.getMenuTree = function () {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/sysMenu/profile/getMenuTree.action',
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

            // 查询业务模块
            httpMethod.querySysModular = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/querySysModular.action',
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

            // 新增菜单
            httpMethod.addNewMenu = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/sysMenu/profile/addNewMenu.action',
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

            // 查询业务系统平台
            httpMethod.queryBusinessSystem = function () {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/queryBusinessSystem.action',
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

            // 查询业务模块类型
            httpMethod.queryModularType = function () {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/queryModularType.action',
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

            // 修改菜单
            httpMethod.editMenu = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/sysMenu/profile/editMenu.action',
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

            // 删除菜单
            httpMethod.delMenu = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/sysMenu/profile/delMenu.action',
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
        // 过滤器
        .filter('stateConversionText', function () {
            return function (stateValue) {

            }
        })
        .controller('configurationMenu', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            httpMethod.getMenuTree().then(function (rsp) {
                $log.log('调用查询已配置系统菜单列表接口成功.');
                if (rsp.data) {
                    $log.log('查询已配置系统菜单列表成功.');
                    $scope.menuTree = rsp.data;
                } else {
                    $log.log('查询已配置系统菜单列表失败.');
                }
            }, function () {
                $log.log('调用查询已配置系统菜单列表接口失败.');
            });

            $scope.addMenu = function (parentIndex) {
                $rootScope.isAddNewMenu = true;
                $rootScope.isDisableSysModular = false;
                $rootScope.isDisableIcon = true;
                $rootScope.choiceMenu = {};
                $rootScope.supSysMenuId = $scope.menuTree[parentIndex].menu_id; // 上层模块ID
            };

            $scope.editMenu = function (index, parentIndex) {
                $rootScope.isAddNewMenu = false;
                if (parentIndex !== undefined) {
                    $rootScope.isDisableSysModular = false;
                    $rootScope.isDisableIcon = true;
                    $rootScope.choiceMenu = $scope.menuTree[parentIndex].childMenu[index];
                } else {
                    $rootScope.isDisableSysModular = true;
                    $rootScope.isDisableIcon = false;
                    $rootScope.choiceMenu = $scope.menuTree[index];
                }
                $log.log($rootScope.choiceMenu, '$rootScope.choiceMenu');
            };

            $scope.delMenu = function (index, parentIndex) {
                var param;
                if (parentIndex !== undefined) {
                    param = $scope.menuTree[parentIndex].childMenu[index].menu_id;
                } else {
                    param = $scope.menuTree[index].menu_id;
                }

                swal({
                    title: "您确定要删除吗？",
                    text: "您确定要删除这条数据？",
                    type: "warning",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "确定",
                    confirmButtonColor: "#ffaa00",
                    cancelButtonText: "取消",
                    showLoaderOnConfirm: true
                }, function () {
                    httpMethod.delMenu(param).then(function (rsp) {
                        $log.log('调用删除菜单接口成功.');
                        if (rsp.data) {
                            swal({
                                title: '操作成功!',
                                text: '删除菜单成功！',
                                type: 'success'
                            }, function () {
                                location.reload();
                            });
                        } else {
                            swal("OMG", "删除菜单失败!", "error");
                        }
                    }, function () {
                        $log.log('调用删除菜单接口失败.');
                    });
                });

                $log.log($rootScope.choiceMenu, '$rootScope.choiceMenu');
            }
        }])
        .directive('accordionListDirective', function () {
            return {
                templateUrl: 'configuration-menu.html',
                restrict: 'E',
                link: function postLink(scope, element, attrs) {
                    var accordionsMenu = $('#accordion-tabs');
                    if (accordionsMenu.length > 0) {
                        accordionsMenu.each(function () {
                            var accordion = $(this);
                            accordion.on('change', 'input[type="checkbox"]', function () {
                                var checkbox = $(this);
                                (checkbox.prop('checked')) ? checkbox.parent().siblings('ul').attr('style', 'display:none;').slideDown(300) : checkbox.parent().siblings('ul').attr('style', 'display:block;').slideUp(300);
                            });
                        });
                    }
                }
            };
        })
        .controller('configurationEditFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            // 确定
            $scope.configurationEditFormSubmit = function () {
                if ($rootScope.isAddNewMenu) {
                    var param = {
                        sysMenuName: '',//菜单名称
                        supSysMenuId: '',//上级菜单Id
                        orderSeq: '',//展示顺序
                        sysModularId: '',//业务模块ID
                        iconNew: ''//展示图标路径
                    };
                    param.supSysMenuId = $rootScope.supSysMenuId;
                    param.sysMenuName = $rootScope.choiceMenu.menu_name;
                    param.orderSeq = $rootScope.choiceMenu.orderSeq;
                    param.sysModularId = $rootScope.choiceMenu.sysModularId;
                    param.iconNew = $rootScope.choiceMenu.iconNew;

                    httpMethod.addNewMenu(param).then(function (rsp) {
                        $log.log('调用添加菜单接口成功.');
                        if (rsp.data) {
                            swal({
                                title: '操作成功!',
                                text: '添加菜单成功！',
                                type: 'success'
                            }, function () {
                                location.reload();
                            });
                        } else {
                            swal("OMG", "添加菜单失败!", "error");
                        }
                    }, function () {
                        $log.log('调用添加菜单接口失败.');
                    });
                } else {
                    var data = {
                        sysMenuId: '', // 菜单ID
                        sysMenuName: '', // 菜单名称
                        orderSeq: '', // 展示顺序
                        sysModularId: '', // 业务模块ID
                        iconNew: '' // 展示图标路径
                    };
                    data.sysMenuId = $rootScope.choiceMenu.menu_id;
                    data.sysMenuName = $rootScope.choiceMenu.menu_name;
                    data.orderSeq = $rootScope.choiceMenu.orderSeq;
                    data.sysModularId = $rootScope.choiceMenu.sysModularId;
                    data.iconNew = $rootScope.choiceMenu.iconNew;
                    httpMethod.editMenu(data).then(function (rsp) {
                        $log.log('调用修改菜单接口成功.');
                        if (rsp.data) {
                            swal({
                                title: '操作成功!',
                                text: '修改菜单成功！',
                                type: 'success'
                            }, function () {
                                location.reload();
                            });
                        } else {
                            swal("OMG", "修改菜单失败!", "error");
                        }
                    }, function () {
                        $log.log('调用修改菜单接口失败.');
                        swal("OMG", "调用修改菜单接口失败!", "error");
                    });
                }
            };

            // 选择业务模块ID
            $scope.checkSysModularId = function (index) {
                $scope.$broadcast('openCheckSysModularIdModal');
            }

        }])
        // 查询控制器
        .controller('queryStaffFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {

            // 获取业务系统列表
            httpMethod.queryBusinessSystem().then(function (rsp) {
                $log.log('调用查询业务系统平台接口成功.', rsp.data);
                $scope.businessSystem = rsp.data;
            }, function () {
                $log.log('调用查询业务系统平台接口失败.');
            });

            // 获取业务模块列表
            httpMethod.queryModularType().then(function (rsp) {
                $log.log('调用查询业务模块类型接口成功.', rsp.data);
                $scope.modularType = rsp.data;
            }, function () {
                $log.log('调用查询业务模块类型接口失败.');
            });

            // 查询结果分页信息
            $scope.requirePaging = true; // 是否需要分页
            $scope.currentPage = 1; // 当前页
            $scope.rowNumPerPage = 4; // 每页显示行数
            $scope.totalNum = 0; // 总条数

            $scope.isForbid = true;

            $scope.querySysForm = {
                'sysModularId': '',  // 业务模块Id
                'name': '', // 业务模块名称
                'modularTypeItem ': '', // 业务模块类型
                'sysSystemItem': '' // 所属系统
            };

            $scope.querySysFormSubmit = function (currentPage) {
                var param = {
                    // sysModularId: '', // 业务模块Id
                    // name: '', // 业务模块名称
                    // sysId: '', // 所属系统
                    // modularTypeCd: '', // 业务模块类型
                    requirePaging: $scope.requirePaging, // 是否需要分页
                    currentPage: currentPage || $scope.currentPage, // 当前页
                    rowNumPerPage: $scope.rowNumPerPage // 每页展示行数
                };
                $scope.querySysForm.name ? param.name = $scope.querySysForm.name : '';
                $scope.querySysForm.sysModularId ? param.sysModularId = $scope.querySysForm.sysModularId : '';
                $scope.querySysForm.modularTypeItem ? param.modularTypeCd = $scope.querySysForm.modularTypeItem.modularTypeCd : '';
                $scope.querySysForm.sysSystemItem ? param.sysId = $scope.querySysForm.sysSystemItem.sysId : '';

                httpMethod.querySysModular(param).then(function (rsp) {
                    $log.log('调用查询业务系统平台接口成功.', rsp.data);
                    $scope.sysResultList = rsp.data.list;
                    $scope.totalNum = rsp.data.totalNum;
                }, function () {
                    $log.log('调用查询业务系统平台接口失败.');
                });
            };
            $scope.$watch('querySysForm', function (current, old, scope) {
                if (scope.querySysForm.sysModularId || scope.querySysForm.name || scope.querySysForm.modularTypeItem || scope.querySysForm.sysSystemItem) {
                    scope.isForbid = false;
                } else {
                    scope.isForbid = true;
                }
            }, true);
        }])
        // 查询结果控制器
        .controller('sysResultListCtrl', ['$scope', '$rootScope', '$log', function ($scope, $rootScope, $log) {
            // 选中索引
            $scope.selectSysModular = function (index) {
                $rootScope.checkedSysModular = $scope.sysResultList[index];
            };
            $scope.$on('submitSysModularIdModal', function (d, data) {
                $scope.sysModularIdFormSubmit();
            });
            $scope.sysModularIdFormSubmit = function () {
                $rootScope.choiceMenu.sysModularId = $rootScope.checkedSysModular.sysModularId;
                $rootScope.choiceMenu.sysModularName = $rootScope.checkedSysModular.name;
            }
        }])
        // 弹出框控制器
        .controller('selectSysModularIdModalCtrl', function ($scope, $rootScope, $uibModal, $log) {
            var $ctrl = this;
            $scope.$on('openCheckSysModularIdModal', function (d, data) {
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
        .controller('ModalInstanceCtrl', function ($uibModalInstance, $scope) {
            var $ctrl = this;

            $ctrl.ok = function () {
                $uibModalInstance.close();
                $scope.$broadcast('submitSysModularIdModal');
            };

            $ctrl.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        })
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
