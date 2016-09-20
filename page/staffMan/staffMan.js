/**
 * Auth 丁少华
 * Date 2016-09-07
 */

angular
    .module('staffManModule', ['ui.bootstrap'])
    .run(['$rootScope', function($rootScope) {
    	$rootScope.isMock = false; // 是否MOCK数据
        $rootScope.staffManResultList = []; // 查询员工列表
        $rootScope.modifiedStaffMan = {}; // 待修改的员工信息
        $rootScope.isForbidSubmit = true; // 禁用编辑员工提交按钮
        $rootScope.areaList = []; // 地区列表
    }])
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
        httpMethod.queryStaffManager = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/staff/profile/queryStaffManager.action',
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

        // 新建员工信息
        httpMethod.insertStaff = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/staff/profile/insertStaff.action',
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

        // 编辑员工信息
        httpMethod.alertStaff = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/staff/profile/alertStaff.action',
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
					if (item.areaId == areaId) {
						output = item.areaName;
					}
				})
	    	}
	    	return output;
	    }
	})
    // 查询控制器
    .controller('queryStaffFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
    	
    	// 查询结果分页信息
    	$scope.requirePaging = true, // 是否需要分页
        $scope.currentPage = 1, // 当前页
        $scope.rowNumPerPage = 4, // 每页显示行数
        $scope.totalNum = 0 // 总条数

        // 获取地区列表
        httpMethod.queryArea().then(function(rsp) {
            $log.log('调用获取地区接口成功.');
            $rootScope.areaList = rsp.data;
        }, function() {
            $log.log('调用获取地区接口失败.');
        });

        if ($rootScope.isMock) {
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
	        }];
        }

        $scope.isForbid = true;
        $scope.queryStaffForm = {
            name: '', // 员工姓名
            staffNumber: '', // 员工工号
            areaItem: '', // 地区
        };
        $scope.queryStaffFormSubmit = function(currentPage) {
        	$log.log($scope.currentPage, '$scope.currentPage');
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
        	$scope.queryStaffForm.areaItem.areaId ? param.areaId = $scope.queryStaffForm.areaItem.areaId : '';

            // 查询员工信息
            httpMethod.queryStaffManager(param).then(function(rsp) {
                $log.log('调用查询员工信息接口成功.');
                $rootScope.staffManResultList = rsp.data.list;
                $scope.totalNum = rsp.data.totalNum;
                if ($rootScope.isMock) {
                	$scope.totalNum = 10;
                }
            }, function() {
                $log.log('调用查询员工信息接口失败.');
            });
            if ($rootScope.isMock) {
            	$rootScope.staffManResultList = [{
	                'partyId': '1', // 参与人ID
	                'name': '测试员A', // 中文正式名称
	                'staffName': '大王', // 员工名称
	                'areaId': '1', // 地区ID
	                'areaName': '南京市', // 地区名称
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
            }
        }
        $scope.$watch('queryStaffForm', function(current, old, scope) {
            if (scope.queryStaffForm.staffNumber || scope.queryStaffForm.name || scope.queryStaffForm.areaItem) {
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
    		$rootScope.areaList.map(function(item, index) {
				if (item.areaId == $rootScope.modifiedStaffMan.areaId) {
					$rootScope.modifiedStaffMan.areaItem = item;
				}
			})

            $rootScope.modalTitle = title;
            $scope.$emit('openEditStaffManModal', 'alertStaff');
        }
        // 新建
        $scope.addStaffMan = function(title) {
            $rootScope.modifiedStaffMan = {};
            $rootScope.modalTitle = title;
            $scope.$emit('openEditStaffManModal', 'insertStaff');
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

        $ctrl.open = function(data) {
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
						return data;
					}
				}
            });
        };

        $ctrl.toggleAnimation = function() {
            $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
        };
    })
    .controller('ModalInstanceCtrl', function($uibModalInstance, $scope, items) {
        var $ctrl = this;

        $ctrl.ok = function() {
            $uibModalInstance.close();
            $scope.$broadcast('submitStaffManModal', items);
        };

        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    // 编辑员工信息控制器
    .controller('editStaffManFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        $scope.$on('submitStaffManModal', function(d, data) {
            $scope.editStaffManFormSubmit(data);
        });
        $scope.$watch('modifiedStaffMan', function(current, old, scope) {
            if (scope.modifiedStaffMan.staffNumber && scope.modifiedStaffMan.name && scope.modifiedStaffMan.areaItem) {
                $rootScope.isForbidSubmit = false;
            } else {
                $rootScope.isForbidSubmit = true;
            }
        }, true);
        $scope.editStaffManFormSubmit = function(data) {
        	if (data === 'insertStaff') {
        		var param = {
	            	staffNumber: '', // 员工工号
					name: '', // 名称
					areaId: '' // 地区
	            };
	            param.staffNumber = $rootScope.modifiedStaffMan.staffNumber;
	            param.name = $rootScope.modifiedStaffMan.name;
	            param.areaId = $rootScope.modifiedStaffMan.areaItem.areaId;

	            // 新建员工信息
	            httpMethod.insertStaff(param).then(function(rsp) {
	                $log.log('调用新建员工信息接口成功.');
	                if (rsp.data) {
	                	$log.log('新建员工信息成功.');
	                } else {
	                	$log.log('新建员工信息失败.');
	                }
	            }, function() {
	                $log.log('调用新建员工信息接口失败.');
	            });
        	} else if (data === 'alertStaff') {
        		var param = {
        			staffId: '',//员工Id
	            	staffNumber: '', // 员工工号
					name: '', // 名称
					areaId: '' // 地区
	            };
	            param.staffId = $rootScope.modifiedStaffMan.staffId;
	            param.staffNumber = $rootScope.modifiedStaffMan.staffNumber;
	            param.name = $rootScope.modifiedStaffMan.name;
	            param.areaId = $rootScope.modifiedStaffMan.areaItem.areaId;

	            // 修改员工信息
	            httpMethod.alertStaff(param).then(function(rsp) {
	                $log.log('调用修改员工信息接口成功.');
	                if (rsp.data) {
	                	$log.log('修改员工信息成功.');
	                } else {
	                	$log.log('修改员工信息失败.');
	                }
	            }, function() {
	                $log.log('调用修改员工信息接口失败.');
	            });
        	}
        }
    }])
    // 分页控制器
    .controller('paginationCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
    	$scope.maxSize = 10;
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
        	$scope.queryStaffFormSubmit($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }]);
