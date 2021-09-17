let DailyToolsApp = angular.module('DailyToolsApp', ["ngRoute","ngFileUpload"]);

DailyToolsApp.
config(['$routeProvider',
    function config($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl : "views/home.html",
            active:'password'
        })
        .when("/password", {
            templateUrl : "views/password.html",
            active:'password'
        })
        .when("/hash", {
            templateUrl : "views/hash.html",
            active:'hash'
        })
        .when("/audio_converter", {
            templateUrl : "views/audio_converter.html",
            active:'audio_converter'
        })
        .when("/key_generator", {
            templateUrl : "views/key_generator.html",
            active:'key_generator'
        })
        .when("/audio_decrypter", {
            templateUrl : "views/audio_decrypter.html",
            active:'audio_decrypter'
        });
    }
]);

DailyToolsApp.
config(['$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
}]);