/**
 * Auth 丁少华
 * Date 2016-09-06
 */

angular
    .module('tabsDemoDynamicTabs', [])
    // 搜索
    .controller('searchCtrl', function($scope) {
        $scope.value = '';
        $scope.searchFn = function() {
            console.log($scope.value)
        };
    })
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
    // tabs
    .controller('tabsCtrl', function($scope, $log) {
        var tabs = [],
            selected = null,
            previous = null;
        $scope.tabs = tabs;
        $scope.selectedIndex = 0;
        $scope.$watch('selectedIndex', function(current, old, scope) {
            // debugger
            // previous = selected;
            // selected = tabs[current];
        });
        $scope.addTab = function(title, view) {
            var isHas = tabs.some(function(item, index) {
                return item.title === title
            })
            if (!isHas) {
                view = view || title + "Content View";
                var index = tabs.push({
                    title: title,
                    url: view
                });
                $scope.changeTab(index - 1);
            } else {
                var selectedIndex;
                tabs.map(function(item, index) {
                    if (item.title == title) {
                        selectedIndex = index;
                    }
                })
                $scope.changeTab(selectedIndex);
            }
        };
        $scope.removeTab = function(index) {
            if (index <= $scope.selectedIndex) {
                $scope.changeTab($scope.selectedIndex - 1);
            }
            tabs.splice(index, 1);
        };
        $scope.changeTab = function(selectedIndex) {
            $scope.selectedIndex = selectedIndex;
        }
    })
    // 左侧菜单
    .controller('accordionCtrl', function($scope) {
        $scope.tabsTitle = {
            title: '菜单导航',
            icon: 'icon-602'
        };
        $scope.tabsList = [{
            'groupName': '基础配置',
            'groupIcon': 'icon-604',
            'groupList': [{
                title: '权限类型配置',
                url: '/page/privilegeType/privilegeType.html'
            }, {
                title: '业务模块配置',
                url: '/page/sysModular/sysModular.html'
            }, {
                title: '权限规格配置',
                url: '/page/operateSpec/operateSpec.html'
            }, {
                title: '角色定义',
                url: '/page/postRole/postRole.html'
            }, {
                title: '系统菜单设置',
                url: '/page/systemMenu/systemMenu.html'
            }]
        }, {
            'groupName': '员工管理',
            'groupIcon': 'icon-603',
            'groupList': [{
                title: '员工管理',
                url: '/page/staffMan/staffMan.html'
            }]
        }, {
            'groupName': '系统用户',
            'groupIcon': 'icon-606',
            'groupList': [{
                title: '用户管理',
                url: 'page/userMan/userMan.html'
            }, {
                title: '用户授权管理',
                url: 'page/userPrivilege/userPrivilege.html'
            }]
        }];
    })
    .directive('accordionListDirective', function() {
        return {
            template: '<p class="accordion-title"><i class="iconfont {{tabsTitle.icon}}"></i><span ng-bind="tabsTitle.title"></span></p>' +
                '<ul id="accordion-tabs">' +
                '<li class="accordion-tabs" ng-repeat="item in tabsList">' +
                '<input type="checkbox" name="group-{{$index}}" id="group-{{$index}}">' +
                '<label for="group-{{$index}}"><i class="iconfont {{item.groupIcon}}"></i><span ng-bind="item.groupName"></span></label>' +
                '<ul style="display:none">' +
                '<li class="accordion-tabs-list" ng-repeat="i in item.groupList" ng-click="addTab(i.title, i.url)">{{i.title}}</li>' +
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
                '<iframe src="{{tab.url}}" frameborder="0"></iframe>' +
                '</div>' +
                '</div>',
            link: function($scope, iElm, iAttrs, controller) {
                // element.text('this is the tabs directive');
            }
        };
    });