
enum PlayerState {
  Play,
  Pause,
  Stop
}

class MediaPlayer {
  private state: PlayerState;

  constructor() {
    this.state = PlayerState.Stop;
  }

  play() {
    if (this.state === PlayerState.Stop || this.state === PlayerState.Pause) {
      console.log("Playing media");
      this.state = PlayerState.Play;
    } else {
      console.log("Already playing");
    }
  }

  pause() {
    if (this.state === PlayerState.Play) {
      console.log("Media paused");
      this.state = PlayerState.Pause;
    } else {
      console.log("Cannot pause now");
    }
  }

  stop() {
    if (this.state !== PlayerState.Stop) {
      console.log("Media stopped");
      this.state = PlayerState.Stop;
    } else {
      console.log("Already stopped");
    }
  }
}

const player = new MediaPlayer();
player.play();
player.pause();
player.play();
player.stop();
