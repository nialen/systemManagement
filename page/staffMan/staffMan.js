/**
 * Auth 丁少华
 * Date 2016-09-07
 */

angular
	.module('staffManModule', ['ui.bootstrap'])
	.controller('queryStaffFormCtrl', ['$scope', function($scope) {
		$scope.isForbid = true;
		$scope.queryStaffForm = {
			staffId: '',
			staffName: '',
			staffArea: '',
		};
		$scope.queryStaffFormSubmit = function() {
			console.log($scope.queryStaffForm.staffId);
		}
		$scope.$watch('queryStaffForm', function(current, old, scope) {
			if (queryStaffForm.staffId.value || queryStaffForm.staffName.value || queryStaffForm.staffArea.value) {
				scope.isForbid = false;
			} else {
				scope.isForbid = true;
			}
		}, true)
	}])
	.controller('staffManResultCtrl', ['$scope', function($scope) {
		// TODO查询结果
		$scope.staffManResultList = [{
			staffId: '10101', //员工ID
			staffJobId: '35352', //员工工号
			staffName: '李明浩', //员工姓名
			staffArea: '南京', //归属地区
			status: '在用', //状态
			creatDate: '2016-01-12', //创建时间
			lastModifiedDate: '2016-01-30', //最后修改时间
		}, {
			staffId: '20306', //员工ID
			staffJobId: '64201', //员工工号
			staffName: '张晓东', //员工姓名
			staffArea: '南京', //归属地区
			status: '在用', //状态
			creatDate: '2016-02-22', //创建时间
			lastModifiedDate: '2016-02-28', //最后修改时间
		}, {
			staffId: '10101', //员工ID
			staffJobId: '35352', //员工工号
			staffName: '李明浩', //员工姓名
			staffArea: '南京', //归属地区
			status: '在用', //状态
			creatDate: '2016-01-12', //创建时间
			lastModifiedDate: '2016-01-30', //最后修改时间
		}, {
			staffId: '20306', //员工ID
			staffJobId: '64201', //员工工号
			staffName: '张晓东', //员工姓名
			staffArea: '南京', //归属地区
			status: '在用', //状态
			creatDate: '2016-02-22', //创建时间
			lastModifiedDate: '2016-02-28', //最后修改时间
		}];
	}])
	.controller('PaginationDemoCtrl', function($scope, $log) {
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
	});