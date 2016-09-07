// Include app dependency on ngMaterial 
angular
    .module('tabsDemoDynamicTabs', ['ngMaterial'])
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
            view = view || title + "Content View";
            tabs.push({
                title: title,
                url: view,
                disabled: false
            });
        };
        $scope.removeTab = function(index) {
            tabs.splice(index, 1);
        };
        $scope.changeTab = function(index) {
            $scope.selectedIndex = index;
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
                url: '1.html'
            }, {
                title: '业务模块配置',
                url: '2.html'
            }, {
                title: '权限规格配置',
                url: '3.html'
            }, {
                title: '角色定义',
                url: '4.html'
            }, {
                title: '系统菜单设置',
                url: '5.html'
            }]
        }, {
            'groupName': '员工管理',
            'groupIcon': 'icon-603',
            'groupList': [{
                title: '员工管理',
                url: '6.html'
            }]
        }, {
            'groupName': '系统用户',
            'groupIcon': 'icon-606',
            'groupList': [{
                title: '用户管理',
                url: '7.html'
            }, {
                title: '用户授权管理',
                url: '8.html'
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
    /**
     * TODO 打开Tab窗口过多，展示BUG；
     * 解决方案：1、设定打开最多tabs窗口数目；2、左右箭头切换；
     * TODO 每一个tab标签只能容许存在一个，其后必须关闭才能再点击打开；
     */
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
            template: '<div class="tabs-content">'+
                '<div ng-show="$index==selectedIndex" ng-repeat="tab in tabs">{{tab.url}}</div>'+
                '</div>',
            link: function($scope, iElm, iAttrs, controller) {
                // element.text('this is the tabs directive');
            }
        };
    })