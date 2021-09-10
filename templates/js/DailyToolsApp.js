let DailyToolsApp = angular.module('DailyToolsApp', ["ngRoute"]);

DailyToolsApp.
config(['$routeProvider',
    function config($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl : "views/password.html",
            active:'password'
        })
        .when("/password", {
            templateUrl : "views/password.html",
            active:'password'
        })
        .when("/hash", {
            templateUrl : "views/hash.html",
            active:'hash'
        });
    }
]);
