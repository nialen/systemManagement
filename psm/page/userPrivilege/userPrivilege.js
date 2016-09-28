/**
 * Auth 丁少华
 * Date 2016-09-18
 */

define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'ui-bootstrap-tpls', 'angular-animate'], function (angular, $, httpConfig, swal) {
    angular
        .module('userPrivilegeModule', ['ui.bootstrap'])
        .factory('name', ['', function () {
            return function name() {

            };
        }])
        .run(['$rootScope', function ($rootScope) {
            $rootScope.staffManResultList = []; // 查询员工列表
            $rootScope.modifiedStaffMan = {}; // 待修改的员工信息
            $rootScope.isForbidSubmit = true; // 禁用编辑员工提交按钮
        }])
        // 查询控制器
        .controller('queryStaffFormCtrl', ['$scope', '$rootScope', '$log', function ($scope, $rootScope, $log) {
            $scope.isForbid = true;
            $scope.queryStaffForm = {
                staffId: '',
                staffName: '',
                staffArea: null,
            };
            $scope.queryStaffFormSubmit = function () {
                // TODO $http发送请求，获取数据，写入$rootScope；
                // TODO查询结果
                $rootScope.staffManResultList = [{
                    userId: '10101', //用户ID
                    systemAccount: '35353', //系统账号
                    staffJobId: '70342', //员工工号
                    staffName: '李明浩', //员工姓名
                    staffPhoneNum: '15651236999', //手机号码
                    remark: '', //备注
                }, {
                    userId: '10102', //用户ID
                    systemAccount: '35355', //系统账号
                    staffJobId: '70542', //员工工号
                    staffName: '张晓松', //员工姓名
                    staffPhoneNum: '15651236888', //手机号码
                    remark: '', //备注
                }];
                $log.log($scope.queryStaffForm.staffId);
            }
            $scope.$watch('queryStaffForm', function (current, old, scope) {
                if (scope.queryStaffForm.systemAccount || scope.queryStaffForm.staffJobId || scope.queryStaffForm.staffName || scope.queryStaffForm.staffPhoneNum) {
                    scope.isForbid = false;
                } else {
                    scope.isForbid = true;
                }
            }, true);
        }])
        // 查询结果控制器
        .controller('staffManResultCtrl', ['$scope', '$rootScope', '$log', function ($scope, $rootScope, $log) {
            // 授权
            $scope.authorizeStaffMan = function (index) {
                $rootScope.modifiedStaffMan = $rootScope.staffManResultList[index];
                parent.angular.element(parent.$('#tabs')).scope().addTab('员工授权', '/psm/page/authorize/authorize.html', 'authorize', JSON.stringify($rootScope.modifiedStaffMan));
            }
        }])
        // 分页控制器
        .controller('paginationCtrl', ['$scope', '$log', function ($scope, $log) {
            $scope.totalItems = 64;
            $scope.currentPage = 4;

            $scope.setPage = function (pageNo) {
                $scope.currentPage = pageNo;
            };

            $scope.pageChanged = function () {
                $log.log('Page changed to: ' + $scope.currentPage);
            };

            $scope.maxSize = 5;
            $scope.bigTotalItems = 175;
            $scope.bigCurrentPage = 1;
        }])
})
