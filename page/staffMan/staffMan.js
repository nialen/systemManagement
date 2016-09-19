/**
 * Auth 丁少华
 * Date 2016-09-07
 */

angular
    .module('staffManModule', ['ui.bootstrap'])
    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpMethod = {};
        var httpConfig = {
            'siteUrl': 'http://192.168.16.161:80/psm',
            'requestHeader': {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        };
        // 获取地区列表
        httpMethod.queryArea = function() {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/staff/profile/queryArea.action',
                method: 'POST',
                headers: httpConfig.requestHeader
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

        // 查询员工信息
        httpMethod.queryStaffManager = function(obj) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/staff/profile/queryStaffManager.action',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(obj)
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
    // 状态码转换文本
    .filter('stateConversionText', function(){
	    return function(stateValue){
			switch(stateValue) {
				case '0':
					return '生效';
					break;
				case '1':
					return '失效';
					break;
			}
	    }
	})
	// 地区编码转换地区名称
	.filter('areaIdConversionName', function(){
	    return function(areaId, areaList){
	    	var output = '';
	    	if (areaList.length) {
	    		areaList.map(function(item, index) {
					if (item.areaId === areaId) {
						output = item.areaName;
					}
				})
	    	}
	    	return output;
	    }
	})
    .run(['$rootScope', function($rootScope) {
        $rootScope.staffManResultList = []; // 查询员工列表
        $rootScope.modifiedStaffMan = {}; // 待修改的员工信息
        $rootScope.isForbidSubmit = true; // 禁用编辑员工提交按钮
        $rootScope.areaList = [{
            'areaId': '1', //地区ID
            'areaName': '南京市', //地区名称
            'areaCode': '025', //地区编码
            'areaIdParent': null, //上级地区ID
            'areaTier': '3', //地区级别
            'areaDesc': '南京市', //地区描述
            'commonRegionId': null,
            'state': null, //地区状态
            'areaNameParent': null //上级地区名称
        }, {
            'areaId': '2',
            'areaName': '无锡市',
            'areaCode': '0510',
            'areaIdParent': null,
            'areaTier': '3',
            'areaDesc': '无锡市',
            'commonRegionId': null,
            'state': null,
            'areaNameParent': null
        }]; // 地区列表
    }])
    // 查询控制器
    .controller('queryStaffFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {

        // 获取地区列表
        httpMethod.queryArea().then(function(data) {
            console.log('获取地区接口成功..');
            $scope.areaList = data.object;
        }, function(data) {
            console.log('获取地区接口失败..');
        });

        $scope.isForbid = true;
        $scope.queryStaffForm = {
            name: '', // 员工姓名
            staffNumber: '', // 员工工号
            areaId: '', // 地区Id
            requirePaging: true, // 是否需要分页
            currentPage: 1, // 当前页
            rowNumPerPage: 5 // 每页显示行数
        };
        $scope.queryStaffFormSubmit = function() {

            // 查询员工信息
            httpMethod.queryStaffManager($scope.queryStaffForm).then(function(data) {
                console.log('查询员工信息接口成功..');
                $rootScope.staffManResultList = data.object;
            }, function(data) {
                console.log('查询员工信息接口失败..');
            });

            $rootScope.staffManResultList = [{
                'partyId': '1', // 参与人ID
                'name': '测试员A', // 中文正式名称
                'staffName': '大王', // 员工名称
                'areaId': '1', // 地区ID
                'areaName': null, // 地区名称
                'partyTypeCd': '1', // 参与人类型编码，取值范围：1－个人，2－组织'
                'staffStatusCd': '1002', // 员工状态1000 有效 1001 停用 1002 无效
                'identidiesTypeCd': '1', // 证件类型
                'primaryIdentifyNum': null, // '默认证件号码'
                'addressStr': null, // 所在地址
                'linkTeleNumber': null, // party参与人联系电话
                'createDt': 1427990400000, // 创建时间
                'creator': null, // 创建人
                'version': 1427990400000, // 最后修改时间
                'state': '0', // '状态，取值范围：0－生效，1－失效'
                'staffId': '1', // '员工ID，
                'staffNumber': 'test1', // '员工工号
                'fixedTel': null, // 固定电话
                'mobileTel': null, // 员工移动电话 默认与party参与人联系电话相同
                'email': null, // 电子邮箱地址
                'remarks': null, // 备注
                'linkNbr': null //员工电话
            }];
            $log.log($scope.queryStaffForm.staffNumber);
        }
        $scope.$watch('queryStaffForm', function(current, old, scope) {
            if (scope.queryStaffForm.staffNumber || scope.queryStaffForm.name || scope.queryStaffForm.areaId) {
                scope.isForbid = false;
            } else {
                scope.isForbid = true;
            }
        }, true);
    }])
    // 查询结果控制器
    .controller('staffManResultCtrl', ['$scope', '$rootScope', '$log', '$filter', function($scope, $rootScope, $log, $filter) {
        // 修改
        $scope.editStaffMan = function(title, index) {
            $rootScope.modifiedStaffMan = $rootScope.staffManResultList[index];
            $rootScope.modalTitle = title;
            $log.log($rootScope.modifiedStaffMan, '待修改员工信息 TODO 归属地区');
            $scope.$emit('openEditStaffManModal');
        }
        // 新建
        $scope.addStaffMan = function(title) {
            $rootScope.modifiedStaffMan = {};
            $rootScope.modalTitle = title;
            $scope.$emit('openEditStaffManModal');
        }

        $scope.afterFilter = $filter('stateConversionText')('newVal',2);

    }])
    // 弹出框控制器
    .controller('editStaffManModalCtrl', function($scope, $rootScope, $uibModal, $log) {
        var $ctrl = this;
        $scope.$on('openEditStaffManModal', function(d, data) {
            $ctrl.open(data);
        });

        $ctrl.animationsEnabled = true;

        $ctrl.open = function() {
            var modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl',
                size: 'lg'
            });
        };

        $ctrl.toggleAnimation = function() {
            $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
        };
    })
    .controller('ModalInstanceCtrl', function($uibModalInstance, $scope) {
        var $ctrl = this;

        $ctrl.ok = function() {
            $uibModalInstance.close();
            $scope.$broadcast('submitStaffManModal');
        };

        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    // 编辑员工信息控制器
    .controller('editStaffManFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.$on('submitStaffManModal', function(d, data) {
            $scope.editStaffManFormSubmit(data);
        });
        $scope.$watch('modifiedStaffMan', function(current, old, scope) {
            if (scope.modifiedStaffMan.staffJobId && scope.modifiedStaffMan.name && scope.modifiedStaffMan.areaId) {
                $rootScope.isForbidSubmit = false;
            } else {
                $rootScope.isForbidSubmit = true;
            }
        }, true);
        $scope.editStaffManFormSubmit = function(data) {
            // TODO 获取更改之后的员工信息$rootScope.modifiedStaffMan提交接口；
            $log.log('弹出框表单提交', data, $rootScope.modifiedStaffMan);
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
