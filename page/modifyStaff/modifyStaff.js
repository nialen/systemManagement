/**
 * Auth 丁少华
 * Date 2016-09-13
 */

define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'angular-md5', 'ui-bootstrap-tpls', 'angular-animate'], function (angular, $, httpConfig, swal) {
    angular
        .module('modifyStaffModule', ['ui.bootstrap', 'angular-md5'])
        .run(['$rootScope', '$parse', '$log', function ($rootScope, $parse, $log) {
            var id = window.frameElement && window.frameElement.id || '',
                obj = parent.$('#' + id).attr('data');
            $rootScope.modifiedStaffMan = obj ? JSON.parse(obj) : {}; // 待修改的员工信息
            $rootScope.isEnableEditPassword = !obj ? true : false; // 新增用户模式下给添加密码、修改模式下密码不给操作

            // 员工选择弹框内部信息
            $rootScope.staffManResultList = []; // 查询员工列表
            $rootScope.checkedStaffMan = {}; // 选中的员工信息
            $rootScope.checkedIndex = ''; // 选中的索引
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

            // 修改用户
            httpMethod.alterUser = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/userManager/profile/alterUser.action',
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
        // 修改用户控制器
        .controller('modifyStaffFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'md5', function ($scope, $rootScope, $log, httpMethod, md5) {
            $scope.isForbid = true;
            $scope.modifyStaffForm = $.extend(true, {
                userId: '', //用户ID
                loginCode: '', //用户账户
                staffNumber: '', //员工工号
                staffId: '', //员工ID
                name: '', //员工姓名
                mobileTel: '', //手机号码
                systemPassword: '888888', //系统密码
                confirmPassword: '888888', //确认密码
                remaeks: '', //备注
                checkDefault: true //默认密码
            }, $rootScope.modifiedStaffMan);

            $scope.modifyStaffFormSubmit = function () {

                var param = {
                    userId: '',//用户ID
                    staffId: '',//员工ID
                    loginPwd: '',//账号密码（MD5加密）
                    loginCode: '',//登录账号
                    mobileTel: '',//电话
                    remaeks: ''//备注
                };

                $scope.modifyStaffForm.staffId ? param.staffId = $scope.modifyStaffForm.staffId : '';
                $scope.modifyStaffForm.loginCode ? param.loginCode = $scope.modifyStaffForm.loginCode : '';
                $scope.modifyStaffForm.mobileTel ? param.mobileTel = $scope.modifyStaffForm.mobileTel : '';
                $scope.modifyStaffForm.remaeks ? param.remaeks = $scope.modifyStaffForm.remaeks : '';

                if ($rootScope.isEnableEditPassword) {
                    $scope.modifyStaffForm.systemPassword ? param.loginPwd = md5.createHash($scope.modifyStaffForm.systemPassword) : '';
                    httpMethod.insertUserByStaffManager(param).then(function (rsp) {
                        $log.log('调用新建用户接口成功.');
                        if (rsp.success) {
                            swal({
                                title: '操作成功!',
                                text: '新建用户成功！',
                                type: 'success'
                            }, function () {
                                location.reload();
                            });
                        } else {
                            swal("OMG", rsp.msg || "新建用户失败!", "error");
                        }
                    })
                } else {
                    $scope.modifyStaffForm.userId ? param.userId = $scope.modifyStaffForm.userId : '';
                    httpMethod.alterUser(param).then(function (rsp) {
                        $log.log('调用修改用户接口成功.');
                        if (rsp.success) {
                            swal("操作成功", "修改用户成功!", "success");
                            // TODO 关闭TABS
                        } else {
                            swal("OMG", rsp.msg || "新建用户失败!", "error");
                        }
                    })
                }

            };
            // 员工选择
            $scope.checkStaffMan = function (index) {
                $scope.$emit('openCheckStaffManModal');
            };
            $scope.$watch('modifyStaffForm', function (current, old, scope) {
                if (scope.modifyStaffForm.staffNumber && scope.modifyStaffForm.loginCode && scope.modifyStaffForm.name && scope.modifyStaffForm.mobileTel) {
                    scope.isForbid = false;
                } else {
                    scope.isForbid = true;
                }
            }, true);
            // 监听响应变化
            $scope.$watch('modifiedStaffMan', function (current, old, scope) {
                if (current.staffNumber !== old.staffNumber || current.name !== old.name) {
                    scope.modifyStaffForm.staffNumber = $rootScope.modifiedStaffMan.staffNumber;
                    scope.modifyStaffForm.name = $rootScope.modifiedStaffMan.name;
                    scope.modifyStaffForm.staffId = $rootScope.modifiedStaffMan.staffId;
                }
            }, true);
        }])
        // 弹出框控制器
        .controller('selectStaffManModalCtrl', function ($scope, $rootScope, $uibModal, $log) {
            var $ctrl = this;
            $scope.$on('openCheckStaffManModal', function (d, data) {
                $ctrl.open(data);
            });

            $ctrl.animationsEnabled = true;

            $ctrl.open = function () {
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
        .controller('ModalInstanceCtrl', function ($uibModalInstance, $scope) {
            var $ctrl = this;

            $ctrl.ok = function () {
                $uibModalInstance.close();
                $scope.$broadcast('submitStaffManModal');
            };

            $ctrl.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        })
        // 查询控制器
        .controller('queryStaffFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            // 查询结果分页信息
            $scope.requirePaging = true; // 是否需要分页
            $scope.currentPage = 1; // 当前页
            $scope.rowNumPerPage = 4; // 每页显示行数
            $scope.totalNum = 0; // 总条数

            // 获取地区列表
            httpMethod.queryArea().then(function (rsp) {
                $log.log('调用获取地区接口成功.');
                $rootScope.areaList = rsp.data;
            }, function () {
                $log.log('调用获取地区接口失败.');
            });

            $scope.queryStaffForm = {
                name: '', // 员工姓名
                staffNumber: '', // 员工工号
                areaItem: '', // 地区
            };

            $scope.queryStaffFormSubmit = function (currentPage) {
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
        }])
        // 查询结果控制器
        .controller('staffManResultCtrl', ['$scope', '$rootScope', '$log', function ($scope, $rootScope, $log) {
            // 选中索引
            $scope.selectStaffMan = function (index) {
                $rootScope.checkedStaffMan = $rootScope.staffManResultList[index];
            };
            $scope.$on('submitStaffManModal', function (d, data) {
                $scope.selectStaffManFormSubmit(data);
            });
            $scope.selectStaffManFormSubmit = function (data) {
                // 更新数据为选择的员工信息
                $rootScope.modifiedStaffMan.staffNumber = $rootScope.checkedStaffMan.staffNumber;
                $rootScope.modifiedStaffMan.name = $rootScope.checkedStaffMan.name;
                $rootScope.modifiedStaffMan.staffId = $rootScope.checkedStaffMan.staffId;
            }
        }])

        // 分页控制器
        .controller('paginationCtrl', ['$scope', '$rootScope', '$log', function ($scope, $rootScope, $log) {
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
