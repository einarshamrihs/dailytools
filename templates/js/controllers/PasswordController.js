DailyToolsApp.controller('PasswordController',
    function($scope,$location,$document) {

    $scope.init = () => {
        if ($location.$$path === '/password') {
            console.log('/')
        }
    }

    $scope.passwordParams = { 'passwords': 1, 'letters': 8,
        'digits': 4, 'symbols': 4, 'allowedSymbols': '!#$%&()+<=>?@' };
    $scope.passwordsList = '';

    $scope.generatePassword = () => {

        $scope.passwordsList = '';

        let letters = $scope.passwordParams.letters;
        let numbers = $scope.passwordParams.digits;
        let symbols = $scope.passwordParams.symbols;

        let chars = [
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
            "0123456789",
            $scope.passwordParams.allowedSymbols
            ];

        for (let i = 0; i < $scope.passwordParams.passwords; i++) {

            let password = [letters, numbers, symbols].map((len, i) => {
                return Array(len).fill(chars[i]).map((x) => {
                    return x[Math.floor(Math.random() * x.length)];
                }).join('');
            }).concat().join('').split('').sort(() => {
                return 0.5-Math.random();
            }).join('');

            $scope.passwordsList = $scope.passwordsList.concat(password, '\n');
        }

        let passwordsArea = $document[0].getElementById('passwords_area');
        passwordsArea.rows = $scope.passwordParams.passwords;
        passwordsArea.cols = $scope.passwordParams.letters
             + $scope.passwordParams.digits
             + $scope.passwordParams.symbols
             + 16;

    }

    $scope.copyPassword = (fieldID) => {
        let copyText = document.getElementById(fieldID);
        copyText.select();
        document.execCommand('copy');
    }

    $scope.init();
});
