DailyToolsApp.controller('HashController', function($scope,$location) {

    $scope.init = function () {
        if ($location.$$path === '/hash') {
            console.log('hash')
        }
    }

    $scope.init();
});
