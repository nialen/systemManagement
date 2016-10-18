/**
 * requireJs
 * http://www.requirejs.cn/docs/api.html
 */

window.loading = {
    finish: function () {
        parent.$('.iframe-box').height(parent.$('.tabs-content').height());
    },
    load: function () {
        require.config({
            paths: {
                'angular': '../../lib/angular.min',
                'angular-touch': '../../lib/angular-touch.min',
                'angular-animate': '../../lib/angular-animate.min',
                'angular-aria': '../../lib/angular-aria.min',
                'jquery': '../../lib/jquery.min',
                'bootstrap': '../../lib/bootstrap.min',
                'ui-bootstrap': '../../lib/ui-bootstrap',
                'ui-bootstrap-tpls': '../../lib/ui-bootstrap-tpls-2.1.3',
                'sweetalert': '../../lib/sweetalert.min',
                'angular-md5': '../../lib/angular-md5',
                'httpConfig': '../../js/httpConfig'
            },
            shim: {
                'angular': {
                    'exports': 'angular'
                },
                'angular-touch': {
                    'deps': ['angular'],
                    'exports': 'ngTouch'
                },
                'angular-animate': {
                    'deps': ['angular'],
                    'exports': 'ngAnimate'
                },
                'angular-aria': {
                    'deps': ['angular'],
                    'exports': 'ngAria'
                },
                'angular-md5': {
                    'deps': ['angular'],
                    'exports': 'angular-md5'
                },
                'bootstrap': {
                    'deps': ['jquery']
                },
                'ui-bootstrap-tpls': {
                    'deps': ['angular']
                }
            }
        });
    }
};

window.loading.load();
require(['angular', 'detailOperate'], function (angular) {
    angular.bootstrap(document, ['detailOperateModule']);
    window.loading.finish();
});
