interface MediaFile{
    play():void;
}

class AudioFile implements MediaFile{
    play(): void {
        console.log("Playing audio file...")
    }
}

class VideoFile implements MediaFile{
    play():void{
        console.log("Playing video file...")
    }
}

class PDFFile implements MediaFile{
    play(): void {
        console.log("Displaying PDF document...")
    }
}   

class MediaPlayer{
    private mediaFile:MediaFile
    constructor(mediaFile:MediaFile){
        this.mediaFile = mediaFile
    }

    play(){
        this.mediaFile.play()
    }

    setMediaFile(mediaFile:MediaFile){
        this.mediaFile = mediaFile
    }
}

const audioFile = new AudioFile()
const videoFile = new VideoFile()
const pdfFile = new PDFFile()

const player = new MediaPlayer(audioFile)
player.play()

player.setMediaFile(videoFile)
player.play()

player.setMediaFile(pdfFile)
player.play()