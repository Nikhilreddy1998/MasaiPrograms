var PlayerState;
(function (PlayerState) {
    PlayerState[PlayerState["Play"] = 0] = "Play";
    PlayerState[PlayerState["Pause"] = 1] = "Pause";
    PlayerState[PlayerState["Stop"] = 2] = "Stop";
})(PlayerState || (PlayerState = {}));
var MediaPlayer = /** @class */ (function () {
    function MediaPlayer() {
        this.state = PlayerState.Stop;
    }
    MediaPlayer.prototype.play = function () {
        if (this.state === PlayerState.Stop || this.state === PlayerState.Pause) {
            console.log("Playing media");
            this.state = PlayerState.Play;
        }
        else {
            console.log("Already playing");
        }
    };
    MediaPlayer.prototype.pause = function () {
        if (this.state === PlayerState.Play) {
            console.log("Media paused");
            this.state = PlayerState.Pause;
        }
        else {
            console.log("Cannot pause now");
        }
    };
    MediaPlayer.prototype.stop = function () {
        if (this.state !== PlayerState.Stop) {
            console.log("Media stopped");
            this.state = PlayerState.Stop;
        }
        else {
            console.log("Already stopped");
        }
    };
    return MediaPlayer;
}());
var player = new MediaPlayer();
player.play();
player.pause();
player.play();
player.stop();
