const playPause_button = document.getElementById('play-pause');
const next_button = document.getElementById('next-song');
const prev_button = document.getElementById('previous-song');
const repeat_button = document.getElementById('repeat-song');
const random_button = document.getElementById('random-song');
const mute_button = document.getElementById('mute');
const unmute_button = document.getElementById('max-volume');
const playPauseIcon = document.querySelector('#play-pause .fas');
const progressContainer = document.querySelector('.song-header__duration');
const progressBar = document.querySelector('.current-time');
const volumeSlider = document.getElementById('range');

const songs = [{
    name: "God's Plan",
    artist: "Drake",
    coverPath: "./covers/gods-plan.jpg",
    audioSrc: "./songs/gods-plan.mp3"
},
{
    name: "Laugh Now Cry Later",
    artist: "Drake",
    coverPath: "./covers/laugh-now-cry-later.png",
    audioSrc: "./songs/laugh-now-cry-later.mp3"
},
{
    name: "Toosie Slide",
    artist: "Drake",
    coverPath: "./covers/toosie-slide.jpg",
    audioSrc: "./songs/toosie-slide.mp3"
}
];
const audio = new Audio();
let songIndex = 1;

// EVENT LISTENERS
window.addEventListener('DOMContentLoaded', init);
playPause_button.addEventListener('click', playSong);
next_button.addEventListener('click', nextSong);
prev_button.addEventListener('click', previousSong);
repeat_button.addEventListener('click', repeatSong);
random_button.addEventListener('click', randomSong);
mute_button.addEventListener('click', muteSong);
unmute_button.addEventListener('click', unmuteSong);
audio.addEventListener('ended', nextSong);
audio.addEventListener('timeupdate', showProgress);
progressContainer.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', setVolume);

function init(){
    loadSong(songs[songIndex]);
    audio.volume = 1;
    volumeSlider.value = 1;
}

// DISPLAY CURRENT SONG
function loadSong(song){
    const songName = document.getElementById('song-name');
    const songArtists = document.getElementById('song-artists');
    const songCover = document.getElementById('song-cover');

    songCover.setAttribute('src', `${song.coverPath}`);
    songCover.setAttribute('alt', `${song.name}`);
    songName.innerText = `${song.name}`;
    songArtists.innerText = `${song.artist}`;

    audio.src = `${song.audioSrc}`;
}

// PLAY SONG 
function playSong(){
    if(audio.paused){
        audio.play();
        playPauseIcon.classList.remove('fa-play');
        playPauseIcon.classList.add('fa-pause');
    } else {
        audio.pause();
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
    }
}

// TOGGLE NEXT SONG
function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// TOGGLE PREV SONG
function previousSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// REPEAT SONG
function repeatSong(){
    audio.currentTime = 0;
}

// PLAY RANDOM SONG
function randomSong(){
    const randomNumber = Math.floor(Math.random() * songs.length);
    loadSong(songs[randomNumber]);
    playSong();
}

// MUTE SONG
function muteSong(){
    audio.muted = true;
    volumeSlider.value = 0;
    mute_button.classList.add('active');
    unmute_button.classList.remove('active');
}

// UNMUTE WITH MAX VOLUME
function unmuteSong(){
    audio.muted = false;
    audio.volume = 1;
    volumeSlider.value = audio.volume;
    unmute_button.classList.add('active');
    mute_button.classList.remove('active');
}

// SET THE VOLUME ON SLIDE
function setVolume(){
    if(this.value == 0){
        muteSong();
    } else if (this.value == 1){
        unmuteSong();
    } else {
        mute_button.classList.remove('active');
        unmute_button.classList.remove('active');
        audio.muted = false;
        audio.volume = this.value;
    }
}

// SHOW SONG TIME PROGRESS
function showProgress(){
    const duration = audio.duration;
    const currentTime = audio.currentTime;
    const progressTime = (currentTime / duration ) * 100;
    
    progressBar.style.width = `${progressTime}%`;
}

// SET SONG TIME PROGRESS ON CLICK
function setProgress(e){
    const totalWidth = this.clientWidth;
    const clickLocation = e.offsetX;
    const duration = audio.duration;

    const targetProgress = ( clickLocation / totalWidth ) * duration;
    progressBar.style.width = `${targetProgress}px`;
    audio.currentTime = targetProgress;
    audio.play();
    playPauseIcon.classList.remove('fa-play');
    playPauseIcon.classList.add('fa-pause');
}


