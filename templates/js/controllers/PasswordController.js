DailyToolsApp.controller('PasswordController', function($scope,$location,$document) {

    $scope.init = () => {
        if ($location.$$path === '/') {
            console.log('/')
        } else if ($location.$$path === '/password') {
            console.log('password')
        }
    }

    $scope.password_params = { 'passwords': 1, 'letters': 8, 'digits': 4, 'symbols': 4, 'allowed_symbols': '!#$%&()+<=>?@' };
    $scope.passwords_list = '';

    $scope.generatePassword = () => {

        $scope.passwords_list = '';

        let letters = $scope.password_params.letters;
        let numbers = $scope.password_params.digits;
        let symbols = $scope.password_params.symbols;

        let chars = [
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", // letters
            "0123456789", // numbers
            $scope.password_params.allowed_symbols // either
            ];

        for (let i = 0; i < $scope.password_params.passwords; i++) {

            let password = [letters, numbers, symbols].map((len, i) => {
                return Array(len).fill(chars[i]).map((x) => {
                    return x[Math.floor(Math.random() * x.length)];
                }).join('');
            }).concat().join('').split('').sort(() => {
                return 0.5-Math.random();
            }).join('');
            console.log('password: ',password)

            $scope.passwords_list = $scope.passwords_list.concat(password, '\n');
        }

        let passwords_area = $document[0].getElementById('passwords_area');
        passwords_area.rows = $scope.password_params.passwords;
        passwords_area.cols = $scope.password_params.letters + $scope.password_params.digits + $scope.password_params.symbols + 16;

    }

    $scope.init();
});
