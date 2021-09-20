DailyToolsApp.controller('KeyGeneratorController',
    function($scope,$location,Upload) {

    $scope.init = function () {
        if ($location.$$path === '/key_generator') {
            console.log('key generator')
        }
    }

    $scope.types = ['ecc','rsa'];
    $scope.curves = ['curve25519','ed25519','p256','p384','p521',
        'brainpoolP256r1','brainpoolP384r1','brainpoolP512r1','secp256k1'];
    $scope.newUser = function(name,email) { 
        this.name = name;
        this.email = email;
    };
    $scope.rsaBits = [1024,2048,4096];
    $scope.keyParams = { 'type': 'rsa','curve': 'curve25519','passphrase': '',
        'expires': 730, 'rsaBits': 4096,
        'users': [ new $scope.newUser('','') ]};
    $scope.privateKeyFilename = '';
    $scope.publicKeyFilename = '';
    $scope.generating = false;

    $scope.addNetUser = () => {
        $scope.keyParams.users.push(new $scope.newUser('',''));
    }
    $scope.removeNetUser = (index) => {
        if ($scope.keyParams.users.length > 1) {
            $scope.keyParams.users.splice(index, 1)
        } else {
            return;
        }
    }

    $scope.generateKey = async () => {
        $scope.generating = true;
        $scope.error = '';
        let expires = 60 * 60 * 24 * $scope.keyParams.expires;
        try {
            const key = await openpgp.generateKey({
                userIDs: $scope.keyParams.users,
                rsaBits: $scope.keyParams.rsaBits,
                passphrase: $scope.keyParams.passphrase
            });

            let keySummary = await openpgp.readKey(
                { armoredKey: key.privateKey });
            let keyObj = { id: keySummary.keyPacket.keyID.toHex()}

            $scope.privateKey = key.privateKey;
            let privateKeyBlob = new Blob([ $scope.privateKey ],
                { type: 'text/plain' });
            $scope.privateKeyFilename = `${keyObj.id}-priv.asc`;
            $scope.privateKeyUrl = (window.URL || window.webkitURL)
                .createObjectURL( privateKeyBlob );

            $scope.publicKey = key.publicKey;
            let publicKeyBlob = new Blob([ $scope.publicKey ],
                { type: 'text/plain' });
            $scope.publicKeyFilename = `${keyObj.id}-pub.asc`;
            $scope.publicKeyUrl = (window.URL || window.webkitURL)
                .createObjectURL( publicKeyBlob );

            $scope.generating = false;

            $scope.$apply();

        } catch (error) {
            $scope.error = error;
            $scope.$apply();
            return
        }
    }

    $scope.copyKey = (fieldID) => {
        let copyText = document.getElementById(fieldID);
        copyText.select();
        document.execCommand('copy');
    }

    $scope.init();
});
