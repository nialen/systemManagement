/**
 * Auth 丁少华
 * Date 2016-09-06
 */

define(['angular', 'jquery', 'httpConfig', 'angular-animate'], function (angular, $, httpConfig) {
    angular.module('indexModule', ['ngAnimate'])
        .factory('httpMethod', ['$http', '$q', function ($http, $q) {
            var httpMethod = {};
            // 获取用户信息,菜单列表
            httpMethod.getUserInformation = function () {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/main/profile/index.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader
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
        .controller('indexCtrl', ['$scope', '$log', 'httpMethod', function ($scope, $log, httpMethod) {
            httpMethod.getUserInformation().then(function (rsp) {
                $log.log('调用获取用户信息接口成功.');
                if (rsp.success) {
                    $scope.userInfo = rsp.data.userInfo;
                    var menuInfo = rsp.data.menuInfo.sort(function (a, b) {
                        return a.orderSeq - b.orderSeq;
                    });
                    $scope.menuInfo = menuInfo;
                }
            }, function () {
                $log.log('调用获取用户信息接口失败.');
            });
        }])
        // 搜索
        .controller('searchCtrl', ['$scope', function ($scope) {
            $scope.value = '';
            $scope.searchFn = function () {
                console.log($scope.value)
            };
        }])
        .directive('searchDirective', function () {
            return {
                restrict: 'EA',
                template: '<form ng-submit="searchFn()"><div class="input-group">' +
                '<input type="text" ng-model="value" placeholder="请输入关键字" class="search-input">' +
                '<i class="iconfont search-icon">&#xe600;</i>' +
                '</div></form>',
                link: function ($scope, iElm, iAttrs, controller) {
                    // element.text('this is the search directive');
                }
            };
        })
        // tabs标签
        .controller('tabsCtrl', ['$scope', '$rootScope', '$log', function ($scope, $rootScope, $log) {
            var tabs = [];
            $scope.tabs = tabs;
            $scope.selectedIndex = 0;
            /**
             * 添加Tab标签
             * @title 标签名称
             * @view URL
             * @id DOM的ID
             * @data 传递给DOM的数据
             */
            $scope.addTab = function (title, view, id, data) {
                if (httpConfig.isProdEnvironment) {
                    view = view.slice(4);
                }
                var isHas = tabs.some(function (item, index) {
                    return item.title === title
                });
                if (!isHas) {
                    view = view || title + "Content View";
                    var index = tabs.push({
                        title: title,
                        url: view,
                        id: id || '',
                        data: data || ''
                    });
                    $scope.changeTab(index - 1);
                } else {
                    var selectedIndex;
                    tabs.map(function (item, index) {
                        if (item.title == title) {
                            selectedIndex = index;
                        }
                    });
                    tabs[selectedIndex] = {
                        title: title,
                        url: view,
                        id: id || '',
                        data: data || ''
                    };
                    $scope.changeTab(selectedIndex);
                }
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            };
            /**
             * 删除Tab标签
             * @index 需要删除的索引
             */
            $scope.removeTab = function (index) {
                if (index <= $scope.selectedIndex) {
                    $scope.changeTab($scope.selectedIndex ? $scope.selectedIndex - 1 : $scope.selectedIndex);
                }
                tabs.splice(index, 1);
            };
            /**
             * 切换展示的Tab索引
             * @index 切换后的索引值
             */
            $scope.changeTab = function (selectedIndex) {
                $scope.selectedIndex = selectedIndex;
            }
        }])
        // 左侧菜单
        .controller('accordionCtrl', ['$scope', 'httpMethod', function ($scope, httpMethod) {
            $scope.tabsTitle = {
                title: '菜单导航',
                icon: 'icon-602'
            };
        }])
        .directive('accordionListDirective', function () {
            return {
                templateUrl: 'accordion-list.html',
                restrict: 'E',
                link: function ($scope, iElm, iAttrs, controller) {
                    if ($('#accordion-tabs').length > 0) {
                        $('#accordion-tabs').each(function () {
                            var accordion = $(this);
                            accordion.on('change', 'input[type="checkbox"]', function () {
                                var checkbox = $(this);
                                (checkbox.prop('checked')) ? checkbox.siblings('ul').attr('style', 'display:none;').slideDown(300) : checkbox.siblings('ul').attr('style', 'display:block;').slideUp(300);
                            });
                        });
                    }

                }
            };
        })
        .directive('tabsTitleDirective', function () {
            return {
                restrict: 'E',
                templateUrl: 'tabs-title.html',
                link: function ($scope, iElm, iAttrs, controller) {
                }
            };
        })
        .directive('tabsContentDirective', function () {
            return {
                restrict: 'E',
                templateUrl: 'tabs-content.html',
                link: function ($scope, iElm, iAttrs, controller) {
                    $('.tab-container').height(document.documentElement.clientHeight - 45);
                    $('.tabs-content').height(document.documentElement.clientHeight - 77);
                    $('.accordion-list').height(document.documentElement.clientHeight - 45);
                }
            };
        })
        .directive('iconDirective', function () {
            return {
                restrict: 'E',
                link: function ($scope, iElm, iAttrs, controller) {
                    var img = new Image();
                    img.className = 'icon';
                    img.src = iAttrs.url == 'null' ? 'images/icon-01.png' : imgSrc;
                    $(iElm).append(img);
                }
            }
        })
});
