/**
 * Auth heyue
 * Date 2016-09-19
 */

angular
	.module('modifySys', ['ui.bootstrap'])
	.run(['$rootScope', '$parse', '$log', function($rootScope, $parse, $log) {
		var id = window.frameElement && window.frameElement.id || '',
			obj = parent.$('#' + id).attr('data');
            
		$rootScope.modifiedSysList = obj ? JSON.parse(obj) : {}; // 待修改的模块信息
        $rootScope.modifiedSys = {}; // 待修改的模块信息
		$rootScope.isForbidSubmit = true; // 禁用编辑模块提交按钮
		$rootScope.modularTypeName = []; // 业务模块类型
        $rootScope.sysType = []; // 业务模块类型列表
		$rootScope.systemList = []; // 所属系统

        $rootScope.isModifiedSysList = !obj ? true : false;
		// 模块选择弹框内部信息
		$rootScope.sysListResultList = []; // 查询模块列表
		$rootScope.checkedSysList = {}; // 选中的模块信息
		$rootScope.checkedIndex = ''; // 选中的索引
	}])

/*传入数据*/
    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpMethod = {};
        var httpConfig = {
             'siteUrl': 'http://192.168.74.17/psm',
            // 'siteUrl': 'http://192.168.16.161:80/psm',
            //'siteUrl': 'http://192.168.16.67:8080/psm',
            'requestHeader': {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
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
        httpMethod.queryModularType = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/privilege/profile/queryModularType.action',
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

        // 查询上级业务模块
        httpMethod.querySysModularAsParent = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/privilege/profile/querySysModularAsParent.action',
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

        // 查询业务模块
        httpMethod.querySysModular = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/privilege/profile/querySysModular.action',
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

        // 新建服务
        httpMethod.insertSysModular = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/privilege/profile/insertSysModular.action',
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

        // 修改服务
        httpMethod.alterSysModular = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/privilege/profile/alterSysModular.action',
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

        // 删除服务
        httpMethod.batchCancelStaff = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/staff/profile/BatchcancelStaff.action',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'data=' + param
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
/*传入数据*/

	// 修改用户控制器
	.controller('modifySysFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
         // 获取业务模块类型列表
        httpMethod.queryModularType().then(function(rsp) {
            $log.log('调用获取业务模块类型接口成功.');
            $rootScope.sysType = rsp.data;
        }, function() {
            $log.log('调用获取业务模块类型接口失败.');
        });

        // 获取业务系统平台列表
        httpMethod.queryBusinessSystem().then(function(rsp) {
            $log.log('调用获取业务系统平台接口成功.');
            $rootScope.systemList = rsp.data;
        }, function() {
            $log.log('调用获取业务系统平台接口失败.');
        });

         // 详情
        $scope.editSys = function(index, title) {
            $rootScope.modifiedSys = $rootScope.SysResultList[index];
            $rootScope.sysType.map(function(item, index) {
                if (item.modularTypeCd == $rootScope.modifiedSys.modularTypeCd) {
                    $rootScope.modifiedSys.modularTypeCdItem = item;
                }
            })
            $rootScope.sysTitle = title;
            $rootScope.systemList.map(function(item, index) {
                if (item.sysId == $rootScope.modifiedSys.sysId) {
                    $rootScope.modifiedSys.sysIdItem = item;
                }
            });
        };

        $scope.isForbid = true;
		$scope.modifySysForm = $.extend(true, {
            name:'',//业务模块名称
            modularTypeCd:'',//模块类型   
            sysId:'',//所属系统ID
            upSysModularId:'',//上级业务模块Id
            url:'',//模块标示url
            intfFunc:'',//接口方法
            description:''//描述
		}, $rootScope.modifiedSysList);
    
    /*
		$scope.modifySysFormSubmit = function() {
			// TODO $http发送请求，获取数据$scope.modifySysForm;
			$log.log($scope.isForbid, $scope.modifySysForm);
		};
    */

        $scope.modifySysFormSubmit = function() {
            var param = {
                sysModularId:'',//业务模块Id
                name:'',//业务模块名称
                modularTypeCd:'',//模块类型   
                sysId:'',//所属系统ID
                upSysModularId:'',//上级业务模块Id
                url:'',//模块标示url
                intfFunc:'',//接口方法
                description:''//描述
            };
            $scope.modifySysForm.sysModularId ? param.sysModularId = $scope.modifySysForm.sysModularId : '';
            $scope.modifySysForm.name ? param.name = $scope.modifySysForm.name : '';
            $scope.modifySysForm.modularTypeCdItem ? param.modularTypeCd = $scope.modifySysForm.modularTypeCdItem :'';
            $scope.modifySysForm.sysIdItem ? param.sysId = $scope.modifySysForm.sysIdItem : '';
            $scope.modifySysForm.upSysModularId ? param.upSysModularId = $scope.modifySysForm.upSysModularId :'';
            $scope.modifySysForm.url ? param.url = $scope.modifySysForm.url :'';
            $scope.modifySysForm.intfFunc ? param.intfFunc = $scope.modifySysForm.intfFunc :'';
            $scope.modifySysForm.description? param.description = $scope.modifySysForm.description :'';
            if ($rootScope.isModifiedSysList) {
                httpMethod.insertSysModular(param).then(function (rsp) {
                    $log.log('调用新建模块接口成功.');
                    if (rsp.data) {
                        swal({
                            title: '操作成功!',
                            text: '新建模块成功！',
                            type: 'success'
                        }, function () {
                            location.reload();
                        });
                    } else {
                        swal("OMG", rsp.msg || "新建模块失败!", "error");
                    }
                })
            } else {
                httpMethod.alterSysModular(param).then(function (rsp) {
                    $log.log('调用修改模块接口成功.');
                    if (rsp.success) {
                        swal("操作成功", "修改模块成功!", "success");
                        // TODO 关闭TABS
                    } else {
                        swal("OMG", rsp.msg || "修改模块失败!", "error");
                    }
                })
            }
        };

		// 模块选择
		$scope.checkSyslist = function(index) {
			$scope.$emit('openCheckSysListModal');
		}
		$scope.$watch('modifySysForm', function(current, old, scope) {
			if ( scope.modifySysForm.sysModularId || scope.modifySysForm.name 
				|| scope.modifySysForm.modularTypeName || scope.modifySysForm.sysName) {
				scope.isForbid = false;
			} else {
				scope.isForbid = true;
			}
		}, true);
		// 监听响应变化
		$scope.$watch('modifiedSysList', function(current, old, scope) {
			if ( current.upSysModularId !== old.upSysModularId || current.upSysModularName !== old.upSysModularName
				) {
				scope.modifySysForm.upSysModularId = $rootScope.modifiedSysList.upSysModularId;
				scope.modifySysForm.upSysModularName = $rootScope.modifiedSysList.upSysModularName;
			}
		}, true);
	}])
	// 弹出框控制器
	// TODO 删除冗余代码
	.controller('selectSysModalCtrl', function($scope, $rootScope, $uibModal, $log) {
		var $ctrl = this;
		$scope.$on('openCheckSysListModal', function(d, data) {
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
	.controller('ModalInstanceCtrl', function($uibModalInstance, $scope, items) {
		var $ctrl = this;

		$ctrl.ok = function() {
			$uibModalInstance.close();
			$scope.$broadcast('submitSysListModal');
		};

		$ctrl.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	})
	// 查询控制器
	.controller('querySysFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
		$scope.isForbid = true;
        $scope.querySysForm = {
            sysModularId: '', //业务模块ID
            upSysModularName: '', //上级业务模块
            name: '', //业务模块名称
            modularTypeName: '', //业务模块类型
            sysName: '', //所属系统
            intfFunc: '', //接口方法
            url: ''//模块URL
        };

        // 查询结果分页信息
        $scope.requirePaging = true; // 是否需要分页
            $scope.currentPage = 1; // 当前页
            $scope.rowNumPerPage = 5; // 每页显示行数
            $scope.totalNum = 0; // 总条数

        $scope.querySysFormSubmit = function(currentPage) {
            $scope.checkedSys = []; // 置空已选业务模型列表

            var param = {
                // name: '', // 业务模块名称
                // sysModularId: '', // 业务模块Id
                // modularTypeCd: '', // 业务模块类型
                requirePaging: $scope.requirePaging, // 是否需要分页
                currentPage: currentPage || $scope.currentPage, // 当前页
                rowNumPerPage: $scope.rowNumPerPage // 每页显示行数
            };
            $scope.querySysForm.sysModularId ? param.sysModularId = $scope.querySysForm.sysModularId : '';
            $scope.querySysForm.name ? param.name = $scope.querySysForm.name : '';
            $scope.querySysForm.modularTypeCdItem ? param.modularTypeCd = $scope.querySysForm.modularTypeCdItem.modularTypeCd : '';
            $scope.querySysForm.sysIdItem ? param.sysId = $scope.querySysForm.sysIdItem.sysId : '';
            
            // 查询模块信息
            httpMethod.querySysModular(param).then(function(rsp){
                $log.log('调用查询模块信息接口成功.');
                $rootScope.sysListResultList = rsp.data.list;
                $scope.totalNum = rsp.data.totalNum;
            }, function() {
                $log.log('调用查询模块信息接口失败.');
            });
        }
        $scope.$watch('querySysForm', function(current, old, scope) {
            if (scope.querySysForm.sysModularId || scope.querySysForm.name || 
                scope.querySysForm.modularTypeCdItem) {
                scope.isForbid = false;
            } else {
                scope.isForbid = true;
            }
        }, true)
    }])
	// 查询结果控制器
	.controller('sysListResultCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        
        // 选中索引
        $scope.selectSysList = function(index) {
            $rootScope.checkedSysList = $rootScope.sysListResultList[index];
        }
        $scope.$on('submitSysListModal', function(d, data) {
            $scope.selectSysListFormSubmit(data);
        });
        $scope.selectSysListFormSubmit = function(data) {
            // 更新数据为选择的模块信息
            $rootScope.modifiedSysList.upSysModularId = $rootScope.checkedSysList.upSysModularId;
            $rootScope.modifiedSysList.upSysModularName = $rootScope.checkedSysList.upSysModularName;
        }
    }])
    

    // 分页控制器
    .controller('paginationCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        $scope.maxSize = 10;
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            $scope.querySysFormSubmit($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }]);
