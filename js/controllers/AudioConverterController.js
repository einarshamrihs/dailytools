DailyToolsApp.controller('AudioConverterController',
    function($scope,$location,Upload) {

    $scope.init = function () {
        if ($location.$$path === '/audio_converter') {
            console.log('audio converter')
            $scope.initFFmpeg();
        }
    }

    $scope.targetFormats = ['wav'];
    $scope.samplingRates = ['1000','8000','11025','16000','22050',
        '24000','32000','44100','48000','96000'];
    $scope.bitResolutions = [{'title': '8 bit','codec':'pcm_s8'},
        {'title': '16 bit','codec':'pcm_s16le'},
        {'title': '24 bit','codec':'pcm_s24le'},
        {'title': '32 bit','codec':'pcm_s32le'},
        {'title': '64 bit','codec':'pcm_s64le'}
    ];
    $scope.channels = [{'title': 'No change','option':'0'},
        {'title': 'Mono','option':'1'},
        {'title': 'Stereo','option':'2'}
    ];
    $scope.loadingFfmpeg = true;
    $scope.loading = false;
    $scope.loadingText = '';

    $scope.audioParams = { 'targetFormat': 'wav',
        'bitResolution': 'pcm_s16le',
        'samplingRate': '8000',
        'channels': '1'}

    $scope.initFFmpeg = async () => {
        $scope.createFFmpeg = FFmpeg.createFFmpeg;
        $scope.fetchFile = FFmpeg.fetchFile;
        $scope.ffmpeg = $scope.createFFmpeg({ log: true });
        await $scope.ffmpeg.load();
        $scope.loadingFfmpeg = false;
        $scope.$apply();
    }

    $scope.convertFiles = async () => {

        $scope.loading = true;
        $scope.error = '';
        $scope.loadingText = 'Converting...';
        $scope.outputArr = [];
        try {
            for (const [i,file] of $scope.audioFile.entries()) {
//                $scope.loadingText = `Converting ${i+1} of ${$scope.audioFile.length} files...`;
                await $scope.transcode(file);
            }
//            $scope.loadingText = 'Creating download links...';

            let zip = new JSZip();
            for (const file of $scope.outputArr) {
                zip.file(file.name, file.file, {binary: true});
            }
            let content = await zip.generateAsync({type:'blob'});
            $scope.outputZIPFile = { 'url': URL.createObjectURL(content),'name': 'converted.zip' }
            $scope.loading = false;

            $scope.$apply();
        } catch (error) {
            $scope.error = error;
            $scope.loading = false;

            $scope.$apply();
            return
        }
    }

    $scope.transcode = async (file) => {

        let name = file.name.replace(/\.[^/.]+$/, "") + '.'
             + $scope.audioParams.targetFormat;
        $scope.ffmpeg.FS('writeFile', name, await $scope.fetchFile(file));
        switch($scope.audioParams.targetFormat) {
            case 'wav':
                if ($scope.audioParams.channels===0) {
                    await $scope.ffmpeg.run('-i', name,'-ar','8000',
                        '-acodec','pcm_s16le', 'output.wav');
                } else {
                    await $scope.ffmpeg.run('-i', name,
                        '-ar',$scope.audioParams.samplingRate,
                        '-acodec',$scope.audioParams.bitResolution,
                        '-ac',$scope.audioParams.channels, 'output.wav');
                }
            default:
                break;
        }
        let data = $scope.ffmpeg.FS('readFile', 'output.wav');
        let bl = new Blob([data.buffer],{ type: 'audio/wav' });
        let outputFile = { 'url': URL.createObjectURL(bl),
            'name': name,
            'file': bl }
        $scope.outputArr.push(outputFile);

    }

    $scope.init();
});
