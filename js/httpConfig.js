define(function () {
    var httpConfig = {
        // 'siteUrl': 'http://192.168.74.17/psm',
        'siteUrl': 'http://192.168.16.161:80/psm',
        // 'siteUrl': 'http://192.168.16.67:8080/psm',
        'requestHeader': {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        isProdEnvironment: true // true: 开发环境, false: 生产环境
    };
    return httpConfig;
});
