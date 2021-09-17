DailyToolsApp.controller('HashController', function($scope,$location) {

    $scope.init = function () {
        if ($location.$$path === '/hash') {
            console.log('hash')
        }
    }

    $scope.hash_params = {
        'algorithm': 'MD5',
        'seperate_lines': true,
        'input': ''
    };
    $scope.hash_output = '';
    $scope.algorithms = ['MD5','SHA1','SHA256'];

    $scope.generateHash = () => {
        
        $scope.hash_output = '';
        let inputArr  = []

        if ($scope.hash_params.seperate_lines) {
            inputArr = $scope.hash_params.input.split("\n");
        } else {
            inputArr.push($scope.hash_params.input);
        }

        inputArr.forEach((val) => {
            switch($scope.hash_params.algorithm) {
                case 'MD5':
                    $scope.hash_output = $scope.hash_output.concat(CryptoJS.MD5(val).toString());
                    if ($scope.hash_params.seperate_lines) {
                        $scope.hash_output = $scope.hash_output.concat('\n')
                    }
                    break;
                case 'SHA1':
                    $scope.hash_output = $scope.hash_output.concat(CryptoJS.SHA1(val).toString());
                    if ($scope.hash_params.seperate_lines) {
                        $scope.hash_output = $scope.hash_output.concat('\n')
                    }
                    break;
                case 'SHA256':
                    $scope.hash_output = $scope.hash_output.concat(CryptoJS.SHA256(val).toString());
                    if ($scope.hash_params.seperate_lines) {
                        $scope.hash_output = $scope.hash_output.concat('\n')
                    }
                   break;
                default:
                    $scope.hash_output = $scope.hash_output.concat(CryptoJS.MD5(val).toString());
                    if ($scope.hash_params.seperate_lines) {
                        $scope.hash_output = $scope.hash_output.concat('\n')
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
