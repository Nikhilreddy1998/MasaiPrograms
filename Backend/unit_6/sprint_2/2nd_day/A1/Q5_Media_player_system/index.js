var AudioFile = /** @class */ (function () {
    function AudioFile() {
    }
    AudioFile.prototype.play = function () {
        console.log("Playing audio file...");
    };
    return AudioFile;
}());
var VideoFile = /** @class */ (function () {
    function VideoFile() {
    }
    VideoFile.prototype.play = function () {
        console.log("Playing video file...");
    };
    return VideoFile;
}());
var PDFFile = /** @class */ (function () {
    function PDFFile() {
    }
    PDFFile.prototype.play = function () {
        console.log("Displaying PDF document...");
    };
    return PDFFile;
}());
var MediaPlayer = /** @class */ (function () {
    function MediaPlayer(mediaFile) {
        this.mediaFile = mediaFile;
    }
    MediaPlayer.prototype.play = function () {
        this.mediaFile.play();
    };
    MediaPlayer.prototype.setMediaFile = function (mediaFile) {
        this.mediaFile = mediaFile;
    };
    return MediaPlayer;
}());
var audioFile = new AudioFile();
var videoFile = new VideoFile();
var pdfFile = new PDFFile();
var player = new MediaPlayer(audioFile);
player.play();
player.setMediaFile(videoFile);
player.play();
player.setMediaFile(pdfFile);
player.play();
