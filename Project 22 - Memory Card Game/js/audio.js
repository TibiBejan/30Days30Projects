class AudioController {
    constructor(){
        this.bgAudio = new Audio('../assets/audio/christmas-background-music.mp3');
        this.flipSound = new Audio('../assets/audio/flip.mp3');
        this.matchSound = new Audio('../assets/audio/match.wav');
        this.victorySound = new Audio('../assets/audio/victory.wav');
        this.gameOverSound = new Audio('../assets/audio/gameOver.wav');
        this.bgAudio.volume = 0.3;
        this.loop = true;
    }

    startMusic(){
        this.bgAudio.play();
    }

    stopMusic(){
        this.bgAudio.pause();
        this.bgAudio.currentTime = 0;
    }

    flip(){
        this.flipSound.play();
    }

    match(){
        this.matchSound.play();
    }

    victory(){
        this.stopMusic();
        this.victorySound.play();
    }

    gameOver(){
        this.stopMusic();
        this.gameOverSound.play();
    }

}

export default AudioController;