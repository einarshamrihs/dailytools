DailyToolsApp.controller('AudioConverterController', function($scope,$location,Upload) {

    $scope.init = function () {
        if ($location.$$path === '/audio_converter') {
            console.log('audio converter')
        }
    }

    const { createFFmpeg, fetchFile } = FFmpeg;
    const ffmpeg = createFFmpeg({ log: true });

    $scope.transcode = async () => {
        console.log($scope.audioFile);
        let file = $scope.audioFile;
        console.log('file: ',file)
        const { name } = file;
        await ffmpeg.load();
        ffmpeg.FS('writeFile', name, await fetchFile(file));
        await ffmpeg.run('-i', name,  'output.wav');
        const data = ffmpeg.FS('readFile', 'output.wav');
        const audio = document.getElementById('player');
        audio.src = URL.createObjectURL(new Blob([data.buffer], { type: 'audio/wav' }));
    }

    $scope.init();
});
