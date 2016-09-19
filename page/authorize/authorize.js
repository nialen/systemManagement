/**
 * Auth 丁少华
 * Date 2016-09-18
 */

angular
    .module('authorizeStaff', ['ui.bootstrap'])
    .factory('httpMethod', ['$http', function($http) {
        var httpMethod = {};
        var httpConfig = {
            'siteUrl': "http:// 192.168.16.161:80/psm/",
            'requestHeader': {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        };
        // 获取角色列表
        httpMethod.getRole = function(obj) {
            $http({
                url: httpConfig.siteUrl + "privilege/profile/queryOperationSpecType.action",
                method: "POST",
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(obj)
            }).success(function(data, header, config, status) {
                // 响应成功
                return data;
            }).error(function(data, header, config, status) {
                // 处理响应失败
                return data
            });
        };
        // 获取权限列表
        httpMethod.getJurisdiction = function(obj) {
            $http({
                url: httpConfig.siteUrl + "privilege/profile/queryOperationSpecType.action",
                method: "POST",
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(obj)
            }).success(function(data, header, config, status) {
                // 响应成功
                return data;
            }).error(function(data, header, config, status) {
                // 处理响应失败
                return data
            });
        };
        return httpMethod;
    }])
    .run(['$rootScope', '$log', function($rootScope, $log) {
        var id = window.frameElement && window.frameElement.id || '',
            obj = parent.$('#' + id).attr('data');
        $rootScope.staffManInformation = obj ? JSON.parse(obj) : {}; // 获取授权员工信息
        $log.log($rootScope.staffManInformation, '$rootScope.staffManInformation');
    }])
    .controller('assignedAuthorityListCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
    	// 入参
    	var obj = {
            'operationSpecTypeCd': '1', // 类型编码
            'operationSpecTypeName': '', // 权限类型名称
            'requirePaging': 'true', // 是否需要分页
            'currentPage': '1', // 当前页
            'rowNumPerPage': '10', // 每页展示行数
            'totalRowNum': '0' // 总行数
        };
        // 获取已有角色列表
        var roleList = httpMethod.getRole(obj);
        $log.log(roleList, 'roleList');

        // TODO 等待接口
        $scope.assignedAuthorityList = [{
            authorityId: '10101', //权限规格ID
            authorityName: '采购入库', //权限规格名称
            authorityCode: '70342', //权限规格编码
            authorityType: '进销存管理', //权限类型
            describe: '', //描述
            createDate: '2016-01-12', //分配时间
            authorityRole: '采购员', //权限管理角色
        }, {
            authorityId: '10211', //权限规格ID
            authorityName: '采购入库', //权限规格名称
            authorityCode: '70672', //权限规格编码
            authorityType: '进销存管理', //权限类型
            describe: '', //描述
            createDate: '2016-02-20', //分配时间
            authorityRole: '采购员', //权限管理角色
        }];

        // 添加新权限
        $scope.addAuthority = function() {
            $scope.$emit('openAddAuthorityModal');
        }
    }])
    // 弹出框控制器
    .controller('addAuthorityModalCtrl', function($scope, $rootScope, $uibModal, $log) {
        var $ctrl = this;
        $scope.$on('openAddAuthorityModal', function(d, data) {
            $ctrl.open(data);
        });
        $ctrl.items = ['item1', 'item2', 'item3'];

        $ctrl.animationsEnabled = true;

        $ctrl.open = function() {
            var modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return $ctrl.items;
                    }
                }
            });
            modalInstance.result.then(function(selectedItem) {
                $ctrl.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $ctrl.openComponentModal = function() {
            var modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                component: 'modalComponent',
                resolve: {
                    items: function() {
                        return $ctrl.items;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $ctrl.selected = selectedItem;
            }, function() {
                $log.info('modal-component dismissed at: ' + new Date());
            });
        };

        $ctrl.toggleAnimation = function() {
            $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
        };
    })
    .controller('ModalInstanceCtrl', function($uibModalInstance, $scope, items) {
        var $ctrl = this;
        $ctrl.items = items;
        $ctrl.selected = {
            item: $ctrl.items[0]
        };

        $ctrl.ok = function() {
            $uibModalInstance.close($ctrl.selected.item);
            $scope.$broadcast('submitAddAuthorityModal');
        };

        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .component('modalComponent', {
        templateUrl: 'myModalContent.html',
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: function() {
            var $ctrl = this;

            $ctrl.$onInit = function() {
                $ctrl.items = $ctrl.resolve.items;
                $ctrl.selected = {
                    item: $ctrl.items[0]
                };
            };

            $ctrl.ok = function() {
                $ctrl.close({
                    $value: $ctrl.selected.item
                });
            };

            $ctrl.cancel = function() {
                $ctrl.dismiss({
                    $value: 'cancel'
                });
            };
        }
    })
    // 查询控制器
    .controller('queryAuthorityFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.authorityTypeList = ['进销存管理'];
        $scope.isForbid = true;
        $scope.queryAuthorityForm = {
            authorityCode: '',
            authorityName: '',
            authorityType: null,
        };
        $scope.queryAuthorityFormSubmit = function() {
            // TODO $http发送请求，获取数据，写入$rootScope查询结果
            $rootScope.staffManResultList = [{
                authorityId: '10101', //权限规格ID
                authorityName: '采购入库', //权限规格名称
                authorityCode: '70342', //权限规格编码
                authorityType: '进销存管理', //权限类型
                describe: '采购出入库操作权限', //描述
                createDate: '2016-01-12', //分配时间
                authorityRole: '采购员', //权限管理角色
            }];
        }
        $scope.$watch('queryAuthorityForm', function(current, old, scope) {
            if (scope.queryAuthorityForm.authorityCode || scope.queryAuthorityForm.authorityName || scope.queryAuthorityForm.authorityType) {
                scope.isForbid = false;
            } else {
                scope.isForbid = true;
            }
        }, true);
    }])
    // 查询结果控制器
    .controller('staffManResultCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        // 选中索引
        $scope.selectStaffMan = function(index) {
            $rootScope.checkedStaffMan = $rootScope.staffManResultList[index];
        }
        $scope.$on('submitAddAuthorityModal', function(d, data) {
            $scope.selectStaffManFormSubmit(data);
        });
        $scope.selectStaffManFormSubmit = function(data) {
            // TODO 提交接口保存权限
            $log.log($rootScope.checkedStaffMan, '选中的表单数据');
        }
    }])
    // 分页控制器
    .controller('paginationCtrl', ['$scope', '$log', function($scope, $log) {
        $scope.totalItems = 64;
        $scope.currentPage = 4;

        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            $log.log('Page changed to: ' + $scope.currentPage);
        };

        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
    }]);
