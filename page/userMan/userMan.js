/**
 * Auth 丁少华
 * Date 2016-09-07
 */

angular
	.module('staffManModule', ['ui.bootstrap'])
	.run(['$rootScope', '$http', function($rootScope, $http) {
		// $http请求样例
		var obj = {
			'operationSpecTypeCd': '1', //类型编码
			'operationSpecTypeName': '', //权限类型名称
			'requirePaging': 'true', //是否需要分页
			'currentPage': '1', //当前页
			'rowNumPerPage': '10', //每页展示行数
			'totalRowNum': '0' //总行数
		};
		$http({
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;'
			},
			url: 'http://192.168.16.161:80/psm/privilege/profile/queryOperationSpecType.action',
			data: 'param=' + JSON.stringify(obj)
		}).then(function successCallback(response) {
			// TODO 设置$rootScope
		}, function errorCallback(response) {
			// 获取数据接口出错
		});
		$rootScope.staffManResultList = []; // 查询员工列表
		$rootScope.modifiedStaffMan = {}; // 待修改的员工信息
		$rootScope.isForbidSubmit = true; // 禁用编辑员工提交按钮
		$rootScope.areaList = ['南京', '镇江', '丹阳']; // 地区列表
	}])
	// 查询控制器
	.controller('queryStaffFormCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
		$scope.isForbid = true;
		$scope.queryStaffForm = {
			staffId: '',
			staffName: '',
			staffArea: null,
		};
		$scope.queryStaffFormSubmit = function() {
			// TODO $http发送请求，获取数据，写入$rootScope；
			// TODO查询结果
			$rootScope.staffManResultList = [{
				userId: '10101', //用户ID
				userAccount: '35353', //用户账户
				staffJobId: '70342', //员工工号
				staffName: '李明浩', //员工姓名
				staffPhoneNum: '15651236999', //手机号码
				status: '在用', //状态
				createPerson: '', //创建人
				createDate: '2016-01-12', //创建时间
				lastModifiedDate: '2016-01-30', //最后修改时间
				remark: '', //备注
			}];
			$log.log($scope.queryStaffForm.staffId);
		}
		$scope.$watch('queryStaffForm', function(current, old, scope) {
			if (scope.queryStaffForm.systemAccount || scope.queryStaffForm.staffJobId || scope.queryStaffForm.staffName || scope.queryStaffForm.staffPhoneNum) {
				scope.isForbid = false;
			} else {
				scope.isForbid = true;
			}
		}, true);
	}])
	// 查询结果控制器
	.controller('staffManResultCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
		// 新建
		$scope.addStaffMan = function() {
				parent.angular.element(parent.$('#tabs')).scope().addTab('新建用户', '/page/modifyStaff/modifyStaff.html', 'addNewStaff');
			}
			// 修改
		$scope.editStaffMan = function(index) {
				$rootScope.modifiedStaffMan = $rootScope.staffManResultList[index];
				parent.angular.element(parent.$('#tabs')).scope().addTab('修改用户', '/page/modifyStaff/modifyStaff.html', 'modifyStaff', JSON.stringify($rootScope.modifiedStaffMan));
			}
			// 密码重置
		$scope.resetPassword = function(index) {

			swal({
				title: "密码重置",
				text: "您确定要重置 " + $rootScope.staffManResultList[index].staffName + " 的密码为6个8吗？",
				type: "warning",
				showCancelButton: true,
				closeOnConfirm: false,
				confirmButtonText: "确定",
				confirmButtonColor: "#ffaa00",
				cancelButtonText: "取消",

			}, function() {
				$.ajax({
					url: "",
					type: "DELETE"
				}).done(function(data) {
					swal("操作成功!", "密码重置成功！", "success");
				}).error(function(data) {
					swal("OMG", "密码重置操作失败!", "error");
				});
			});
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