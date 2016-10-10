/**
 * requireJs
 * http://www.requirejs.cn/docs/api.html
 */

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
        'bootstrap': {
            'deps': ['jquery']
        },
        'ui-bootstrap-tpls': {
            'deps': ['angular']
        }
    }
});

require(['angular', 'modifiedSys'], function (angular) {
    angular.bootstrap(document, ['modifiedSysModule']);
});
