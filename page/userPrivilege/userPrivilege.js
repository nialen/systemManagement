/**
 * Auth 丁少华
 * Date 2016-09-18
 */

define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'ui-bootstrap-tpls', 'angular-animate'], function (angular, $, httpConfig, swal) {
    angular
        .module('userPrivilegeModule', ['ui.bootstrap'])
        .run(['$rootScope', function ($rootScope) {
            $rootScope.staffManResultList = []; // 查询员工列表
            $rootScope.modifiedStaffMan = {}; // 待授权的员工
            $rootScope.detailStaffMan = {}; // 待查看的权限
            $rootScope.isForbidSubmit = true; // 禁用编辑员工提交按钮
        }])
        .factory('httpMethod', ['$http', '$q', function ($http, $q) {
            var httpMethod = {};

            // 查询服务
            httpMethod.queryUserManager = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + "/userManager/profile/queryUserManager.action",
                    method: "POST",
                    headers: httpConfig.requestHeader,
                    data: 'param=' + JSON.stringify(param)
                }).success(function (data, header, config, status) {
                    if (status != 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function (data, header, config, status) {
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
            $scope.isForbid = true;

            // 查询结果分页信息
            $scope.requirePaging = true; // 是否需要分页
            $scope.currentPage = 1; // 当前页
            $scope.rowNumPerPage = 10; // 每页显示行数
            $scope.totalNum = 0; // 总条数

            $scope.queryStaffForm = {
                loginCode: '',
                staffNumber: '',
                name: '',
                namobileTelme: ''
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
            $scope.$watch('queryStaffForm', function (current, old, scope) {
                if (scope.queryStaffForm.loginCode || scope.queryStaffForm.staffNumber || scope.queryStaffForm.name || scope.queryStaffForm.mobileTel) {
                    scope.isForbid = false;
                } else {
                    scope.isForbid = true;
                }
            }, true);
        }])
        // 查询结果控制器
        .controller('staffManResultCtrl', ['$scope', '$rootScope', '$log', function ($scope, $rootScope, $log) {
            // 授权
            $scope.authorize = function (index) {
                $rootScope.modifiedStaffMan = $rootScope.staffManResultList[index];
                parent.angular.element(parent.$('#tabs')).scope().addTab('员工授权', '/page/authorize/authorize.html', 'authorize', JSON.stringify($rootScope.modifiedStaffMan));
            };
            // 权限详情
            $scope.detailPrivilege = function (index) {
                $rootScope.detailStaffMan = $rootScope.staffManResultList[index];
                parent.angular.element(parent.$('#tabs')).scope().addTab('权限详情', '/page/detailPrivilege/detailPrivilege.html', 'detailPrivilege', JSON.stringify($rootScope.detailStaffMan));
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
