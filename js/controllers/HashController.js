DailyToolsApp.controller('HashController',
    function($scope,$location) {

    $scope.init = function () {
        if ($location.$$path === '/hash') {
            console.log('hash')
        }
    }

    $scope.hashParams = {
        'algorithm': 'MD5',
        'seperateLines': true,
        'input': ''
    };
    $scope.hashOutput = '';
    $scope.algorithms = ['MD5','SHA1','SHA256'];

    $scope.generateHash = () => {
        
        $scope.hashOutput = '';
        let inputArr  = []

        if ($scope.hashParams.seperateLines) {
            inputArr = $scope.hashParams.input.split("\n");
        } else {
            inputArr.push($scope.hashParams.input);
        }

        inputArr.forEach((val) => {
            switch($scope.hashParams.algorithm) {
                case 'MD5':
                    $scope.hashOutput = $scope.hashOutput
                        .concat(CryptoJS.MD5(val).toString());
                    if ($scope.hashParams.seperateLines) {
                        $scope.hashOutput = $scope.hashOutput.concat('\n');
                    }
                    break;
                case 'SHA1':
                    $scope.hashOutput = $scope.hashOutput
                        .concat(CryptoJS.SHA1(val).toString());
                    if ($scope.hashParams.seperateLines) {
                        $scope.hashOutput = $scope.hashOutput.concat('\n');
                    }
                    break;
                case 'SHA256':
                    $scope.hashOutput = $scope.hashOutput
                        .concat(CryptoJS.SHA256(val).toString());
                    if ($scope.hashParams.seperateLines) {
                        $scope.hashOutput = $scope.hashOutput.concat('\n');
                    }
                   break;
                default:
                    $scope.hashOutput = $scope.hashOutput
                        .concat(CryptoJS.MD5(val).toString());
                    if ($scope.hashParams.seperateLines) {
                        $scope.hashOutput = $scope.hashOutput.concat('\n');
                    }
           }
        })
    }

    $scope.copyHash = (fieldID) => {
        let copyText = document.getElementById(fieldID);
        copyText.select();
        document.execCommand('copy');
    }

    $scope.init();
});
