DailyToolsApp.controller('AudioDecrypterController', function($scope,$location,Upload) {

    $scope.init = function () {
        if ($location.$$path === '/audio_decrypter') {
            console.log('audio decrypter')
        }
    }

    $scope.decryptAudio = async () => {

        $scope.error = '';

        $scope.audioSrc = '';
        let readFile = (event) => {
            $scope.record = event.target.result;
        }

        let reader = new FileReader();
        reader.addEventListener('load', readFile);
        reader.readAsText($scope.audioFile);

        const privateKeyArmored = $scope.key_params.key;
        const passphrase = $scope.key_params.passphrase;

        try {
            const privateKey = await openpgp.decryptKey({
                privateKey: await openpgp.readPrivateKey({ armoredKey: $scope.key_params.key }),
                passphrase: $scope.key_params.passphrase
            }) 

            const message = await openpgp.readMessage({
                armoredMessage: $scope.record // parse armored message
            });

            let validKeys = [];
            for (let packet of message.packets) {
                if (packet.publicKeyID) {
                    validKeys.push(packet.publicKeyID.toHex());
                }
            }

            $scope.validKeys = validKeys.join(', ');

            const { data: decrypted, signatures } = await openpgp.decrypt({
                message,
                decryptionKeys: privateKey, format: 'binary'
            });

            blobAudio = new Blob([decrypted], {type : 'audio/mpeg'});
            $scope.audioSrc = URL.createObjectURL(blobAudio);
            console.log($scope.audioSrc);
            $scope.$apply();
    
        } catch (error) {
            console.log(error);
            $scope.error = error;
            $scope.$apply();
            return
        }

    }

    $scope.init();
});
