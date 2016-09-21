/**
 * Auth 丁少华
 * Date 2016-09-06
 */

angular
    .module('indexModule', [])
    // 搜索
    .controller('searchCtrl', ['$scope', function($scope) {
        $scope.value = '';
        $scope.searchFn = function() {
            console.log($scope.value)
        };
    }])
    .directive('searchDirective', function() {
        return {
            restrict: 'EA',
            template: '<form ng-submit="searchFn()"><div class="input-group">' +
                '<input type="text" ng-model="value" placeholder="请输入关键字" class="search-input">' +
                '<i class="iconfont search-icon">&#xe600;</i>' +
                '</div></form>',
            link: function($scope, iElm, iAttrs, controller) {
                // element.text('this is the search directive');
            }
        };
    })
    // tabs标签
    .controller('tabsCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
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
        $scope.addTab = function(title, view, id, data) {
            var isHas = tabs.some(function(item, index) {
                return item.title === title
            })
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
                tabs.map(function(item, index) {
                    if (item.title == title) {
                        selectedIndex = index;
                    }
                })
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
        $scope.removeTab = function(index) {
            if (index <= $scope.selectedIndex) {
                $scope.changeTab($scope.selectedIndex ? $scope.selectedIndex - 1 : $scope.selectedIndex);
            }
            tabs.splice(index, 1);
        };
        /**
         * 切换展示的Tab索引
         * @index 切换后的索引值
         */
        $scope.changeTab = function(selectedIndex) {
            $scope.selectedIndex = selectedIndex;
        }
    }])
    // 左侧菜单
    // TODO factory 接口获取数据
    .controller('accordionCtrl', ['$scope', function($scope) {
        $scope.tabsTitle = {
            title: '菜单导航',
            icon: 'icon-602'
        };
        $scope.tabsList = [{
            'groupName': '基础配置',
            'groupIcon': 'icon-604',
            'groupList': [{
                id: 'privilegeType',
                title: '权限类型配置',
                url: '/page/privilegeType/privilegeType.html'
            }, {
                id: 'sysModular',
                title: '业务模块配置',
                url: '/page/sysModular/sysModular.html'
            }, {
                id: 'operateSpec',
                title: '权限规格配置',
                url: '/page/operateSpec/operateSpec.html'
            }, {
                id: 'postRole',
                title: '角色定义',
                url: '/page/postRole/postRole.html'
            }, {
                id: 'systemMenu',
                title: '系统菜单设置',
                url: '/page/systemMenu/systemMenu.html'
            }]
        }, {
            'groupName': '员工管理',
            'groupIcon': 'icon-603',
            'groupList': [{
                id: 'staffMan',
                title: '员工管理',
                url: '/page/staffMan/staffMan.html'
            }]
        }, {
            'groupName': '系统用户',
            'groupIcon': 'icon-606',
            'groupList': [{
                id: 'userMan',
                title: '用户管理',
                url: 'page/userMan/userMan.html'
            }, {
                id: 'userPrivilege',
                title: '用户授权管理',
                url: 'page/userPrivilege/userPrivilege.html'
            }]
        }];
    }])
    .directive('accordionListDirective', function() {
        return {
            template: '<p class="accordion-title"><i class="iconfont {{tabsTitle.icon}}"></i><span ng-bind="tabsTitle.title"></span></p>' +
                '<ul id="accordion-tabs">' +
                '<li class="accordion-tabs" ng-repeat="item in tabsList">' +
                '<input type="checkbox" name="group-{{$index}}" id="group-{{$index}}">' +
                '<label for="group-{{$index}}"><i class="iconfont {{item.groupIcon}}"></i><span ng-bind="item.groupName"></span></label>' +
                '<ul style="display:none">' +
                '<li class="accordion-tabs-list" ng-repeat="i in item.groupList" ng-click="addTab(i.title, i.url, i.id, i.data)">{{i.title}}</li>' +
                '</ul></li></ul>',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                var accordionsMenu = $('#accordion-tabs');
                if (accordionsMenu.length > 0) {
                    accordionsMenu.each(function() {
                        var accordion = $(this);
                        accordion.on('change', 'input[type="checkbox"]', function() {
                            var checkbox = $(this);
                            (checkbox.prop('checked')) ? checkbox.siblings('ul').attr('style', 'display:none;').slideDown(300): checkbox.siblings('ul').attr('style', 'display:block;').slideUp(300);
                        });
                    });
                }
            }
        };
    })
    .directive('tabsTitleDirective', function() {
        return {
            restrict: 'E',
            templateUrl: 'tabs-title.html',
            link: function($scope, iElm, iAttrs, controller) {
                // element.text('this is the tabs directive');
            }
        };
    })
    .directive('tabsContentDirective', function() {
        return {
            restrict: 'E',
            template: '<div class="tabs-content">' +
                '<div ng-show="$index==selectedIndex" ng-repeat="tab in tabs">' +
                '<iframe src="{{tab.url}}" id="{{tab.id}}" data="{{tab.data}}" class="iframe-box" frameborder="0"></iframe>' +
                '</div>' +
                '</div>',
            link: function($scope, iElm, iAttrs, controller) {
                // element.text('this is the tabs directive');
            }
        };
    });