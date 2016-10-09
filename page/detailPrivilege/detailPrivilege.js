/**
 * Auth 丁少华
 * Date 2016-09-18
 */

define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'ui-bootstrap-tpls', 'angular-animate'], function (angular, $, httpConfig, swal) {
    angular
        .module('detailPrivilegeModule', ['ui.bootstrap'])
        .run(['$rootScope', '$log', function ($rootScope, $log) {
            var id = window.frameElement && window.frameElement.id || '',
                obj = parent.$('#' + id).attr('data');
            $rootScope.staffManInformation = obj ? JSON.parse(obj) : {}; // 获取授权员工信息
            $rootScope.queryUserPrivilegeDimensionDetail = function (item) {
                $rootScope.userPrivilegeId = item.userPrivilegeId;
            };
            $rootScope.authorityDimensionList = []; // 权限维度详情列表
        }])
        .factory('httpMethod', ['$http', '$q', function ($http, $q) {
            var httpMethod = {};

            // 查询用户已分配权限
            httpMethod.queryUserPrivilege = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + "/privilege/profile/queryUserPrivilege.action",
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
            // 查询用户已分配角色
            httpMethod.queryUserPostRole = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + "/role/profile/queryUserPostRole.action",
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
            // 查询权限维度
            httpMethod.queryUserPrivilegeDimension = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + "/privilege/profile/queryUserPrivilegeDimension.action",
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
            // 查询权限维度详情
            httpMethod.queryUserPrivilegeDimensionDetail = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + "/privilege/profile/queryUserPrivilegeDimensionDetail.action",
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
        .controller('assignedAuthorityListCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            // 查询结果分页信息
            $scope.requirePaging = true; // 是否需要分页
            $scope.currentPage = 1; // 当前页
            $scope.rowNumPerPage = 4; // 每页显示行数
            $scope.totalNum = 0; // 总条数

            $scope.queryUserPrivilege = function (currentPage) {
                $rootScope.checkedOperationSpecList = []; // 选中的待删除的权限列表
                var param = {
                    userId: $rootScope.staffManInformation.userId,//用户id
                    requirePaging: $scope.requirePaging, // 是否需要分页
                    currentPage: currentPage || $scope.currentPage, // 当前页
                    rowNumPerPage: $scope.rowNumPerPage // 每页显示行数
                };

                // 查询用户已分配权限
                httpMethod.queryUserPrivilege(param).then(function (rsp) {
                    $log.log('调用查询用户已分配权限接口成功.');
                    $rootScope.assignedAuthorityList = rsp.data.list;
                    $scope.totalNum = rsp.data.totalNum;
                }, function () {
                    $log.log('调用查询用户已分配权限接口失败.');
                });
            };

            $scope.queryUserPrivilege();

            // 查看权限维度
            $scope.viewUserPrivilegeDimension = function (item) {
                $rootScope.queryUserPrivilegeDimensionDetail(item);

                var param = {
                    userPrivilegeId: $rootScope.userPrivilegeId,//用户权限ID
                    // requirePaging: 'true',//是否需要分页
                    // currentPage: '1', // 当前页
                    // rowNumPerPage: '10'//每页条数
                };
                httpMethod.queryUserPrivilegeDimensionDetail(param).then(function (rsp) {
                    $log.log('调用查询权限维度详情接口成功.');
                    if (rsp.data) {
                        $rootScope.authorityDimensionList = rsp.data;
                    }
                }, function () {
                    $log.log('调用查询权限维度详情接口失败.');
                });
            };
        }])

        // 分配角色控制器
        .controller('assignedRoleListCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            $scope.queryUserPostRole = function (currentPage) {
                var param = {
                    userId: $rootScope.staffManInformation.userId,//用户id
                    requirePaging: $scope.requirePaging, // 是否需要分页
                    currentPage: currentPage || $scope.currentPage, // 当前页
                    rowNumPerPage: $scope.rowNumPerPage // 每页显示行数
                };

                // 查询用户已分配角色
                httpMethod.queryUserPostRole(param).then(function (rsp) {
                    $log.log('调用查询用户已分配权限接口成功.');
                    $rootScope.assignedRoleList = rsp.data.list;
                    $scope.totalNum = rsp.data.totalNum;
                }, function () {
                    $log.log('调用查询用户已分配权限接口失败.');
                });
            };

            $scope.queryUserPostRole();
        }])

        // 权限维度列表控制器
        .controller('authorityDimensionListCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {

        }])

        // 分页控制器
        .controller('paginationCtrl', ['$scope', '$rootScope', '$log', function ($scope, $rootScope, $log) {
            $scope.maxSize = 10;
            $scope.setPage = function (pageNo) {
                $scope.currentPage = pageNo;
            };

            $scope.pageChanged = function () {
                $scope.queryUserPrivilege($scope.currentPage);
                $log.log('Page changed to: ' + $scope.currentPage);
            };
        }])
});
