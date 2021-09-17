DailyToolsApp.controller('AudioConverterController', function($scope,$location,Upload) {

    $scope.init = function () {
        if ($location.$$path === '/audio_converter') {
            console.log('audio converter')
            $scope.initFFmpeg();
        }
    }

    $scope.target_formats = ['wav'];
    $scope.sampling_rates = ['1000','8000','11025','16000','22050','24000','32000','44100','48000','96000'];
    $scope.bit_resolutions = [{'title': '8 bit','codec':'pcm_s8'},
        {'title': '16 bit','codec':'pcm_s16le'},
        {'title': '24 bit','codec':'pcm_s24le'},
        {'title': '32 bit','codec':'pcm_s32le'},
        {'title': '64 bit','codec':'pcm_s64le'}
    ];
    $scope.channels = [{'title': 'No change','option':'0'},
        {'title': 'Mono','option':'1'},
        {'title': 'Stereo','option':'2'}
    ];
    $scope.loading_ffmpeg = true;
    $scope.loading = false;
    $scope.loading_text = '';

    $scope.audio_params = { 'target_format': 'wav', 'bit_resolution': 'pcm_s16le', 'sampling_rate': '8000', 'channels': '1'}

    $scope.initFFmpeg = async () => {
        $scope.createFFmpeg = FFmpeg.createFFmpeg;
        $scope.fetchFile = FFmpeg.fetchFile;
        $scope.ffmpeg = $scope.createFFmpeg({ log: true });
        await $scope.ffmpeg.load();
        $scope.loading_ffmpeg = false;
        $scope.$apply();
    }

    $scope.convertFiles = async () => {

        $scope.loading = true;
        $scope.loading_text = 'Converting...';
        $scope.outputArr = [];
        for (const [i,file] of $scope.audioFile.entries()) {
//            $scope.loading_text = `Converting ${i+1} of ${$scope.audioFile.length} files...`;
            await $scope.transcode(file);
        }
//        $scope.loading_text = 'Creating download links...';

        let zip = new JSZip();
        for (const file of $scope.outputArr) {
            zip.file(file.name, file.url);
        }
        let content = await zip.generateAsync({type:"blob"});
        $scope.outputZIPFile = { 'url': URL.createObjectURL(content),
        'name': 'converted.zip' }
        $scope.loading = false;

        $scope.$apply();
    }

    $scope.transcode = async (file) => {

        let name = file.name.replace(/\.[^/.]+$/, "") + '.' + $scope.audio_params.target_format;
        $scope.ffmpeg.FS('writeFile', name, await $scope.fetchFile(file));
        switch($scope.audio_params.target_format) {
            case "wav":
                if ($scope.audio_params.channels===0) {
                    await $scope.ffmpeg.run('-i', name,'-ar','8000','-acodec','pcm_s16le', 'output.wav');
                } else {
                    await $scope.ffmpeg.run('-i', name,'-ar',$scope.audio_params.sampling_rate,'-acodec',$scope.audio_params.bit_resolution,'-ac',$scope.audio_params.channels, 'output.wav');
                }
            default:
                break;
        }
        let data = $scope.ffmpeg.FS('readFile', 'output.wav');
        let outputFile = { 'url': URL.createObjectURL(new Blob([data.buffer], { type: 'audio/wav' })),
            'name': name }
        $scope.outputArr.push(outputFile);

    }

    $scope.init();
});
