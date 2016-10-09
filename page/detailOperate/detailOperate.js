/**
 * Auth 丁少华
 * Date 2016-09-13
 */
define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'ui-bootstrap-tpls', 'angular-animate'], function (angular, $, httpConfig, swal) {
    angular
        .module('detailOperateModule', ['ui.bootstrap'])
        .run(['$rootScope', '$parse', '$log', function ($rootScope, $parse, $log) {
            var id = window.frameElement && window.frameElement.id || '',
                obj = parent.$('#' + id).attr('data');
            $rootScope.detailQueryOperate = obj ? JSON.parse(obj) : {}; // 待修改的权限规格信息
        }])
        .factory('httpMethod', ['$http', '$q', function ($http, $q) {
            var httpMethod = {};

            // 查询已选权限维度
            httpMethod.queryPrivilegeDimensionInOperationSpec = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/queryPrivilegeDimensionInOperationSpec.action',
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

            // 查询已选业务模块
            httpMethod.querySysModularInOperationSpec = function (param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/privilege/profile/querySysModularInOperationSpec.action',
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
            return httpMethod;
        }])
        // 控制器
        .controller('detailOperateFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            $scope.detailOperateForm = $.extend(true, {
                // operationSpecCd: '', //权限规格编码
                // name: '', //权限规格名称
                // operationSpecTypeCd: '', //数据类型
                // description: '', //地区描述
            }, $rootScope.detailQueryOperate);
        }])

        // 权限维度查询控制器
        .controller('preveligeDimensionFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            var param = {};
            param.operationSpecCd = $rootScope.detailQueryOperate.operationSpecCd;
            // 查询已选权限维度信息
            httpMethod.queryPrivilegeDimensionInOperationSpec(param).then(function (rsp) {
                $log.log('调用查询已选权限维度接口成功.');
                $scope.preveligeDimensionResultList = rsp.data;
            }, function () {
                $log.log('调用查询已选权限维度接口失败.');
            });
        }])

        // 权限可操作查询控制器
        .controller('preveligeDoneFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
            var param = {};
            param.operationSpecCd = $rootScope.detailQueryOperate.operationSpecCd;
            // 查询已选业务模块信息
            httpMethod.querySysModularInOperationSpec(param).then(function (rsp) {
                $log.log('调用查询已选业务模块接口成功.');
                $scope.preveligeDoneResultList = rsp.data;
                $scope.totalNum = rsp.data.totalNum;
            }, function () {
                $log.log('调用查询已选业务模块接口失败.');
            });
        }])
});
