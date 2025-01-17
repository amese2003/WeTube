import getBlobDuration from "get-blob-duration";

const videoContainer = document.getElementById("jsVideoPlayer")
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScreenBtn = document.getElementById("jsFullScreen")
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");
const progressRange = document.getElementById("jsProgressbar");

const registerView = () => {
    const videoId = window.location.href.split("/videos/")[1];
    fetch(`/api/${videoId}/view`, {
        method: "POST"
    });
};

const formatDate = seconds => {
    const secondsNumber = parseInt(seconds, 10);
    let hours = Math.floor(secondsNumber / 3600);
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
    let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (seconds < 10) {
        totalSeconds = `0${totalSeconds}`;
    }
    
    return `${hours}:${minutes}:${totalSeconds}`;
}

async function setTotalTime(){
    const totalTimeString = formatDate(videoPlayer.duration);
    // console.log(videoPlayer);

    if(totalTimeString === null){
        const blob = await fetch(videoPlayer.src).then(response => response.blob());
        duration = await getBlobDuration(blob);
        totalTimeString = formatDate(duration);
    }    

    totalTime.innerHTML = totalTimeString;
    setInterval(getCurrentTime, 1000);
}

function getCurrentTime(){
    currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
    progressRange.value = videoPlayer.currentTime / videoPlayer.duration;
}

function handleEnded(){    
    videoPlayer.currentTime = 0;
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
    registerView();
}

function handleDrag(event){
    const {
        target: {value}
    } = event;
    videoPlayer.volume = value;

    if(value >= 0.7){
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>'
    } else if (value >= 0.3){
        volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>'
    } else{
        volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>'
    }
}

function progressHandleDrag(event) {
    const {
        target: {value}
    } = event;
    videoPlayer.currentTime = value * videoPlayer.duration;
}


function init(){
    videoPlayer.volume = 0.5;
    playBtn.addEventListener("click", handlePlayClick)
    volumeBtn.addEventListener("click", handleVolumeClick);
    fullScreenBtn.addEventListener("click", goFullScreen);
    videoPlayer.addEventListener("loadedmetadata", setTotalTime);
    videoPlayer.addEventListener("ended", handleEnded);
    volumeRange.addEventListener("input", handleDrag);      
    progressRange.addEventListener("input", progressHandleDrag);  
}

function exitFullScreen(){
    fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>'
    fullScreenBtn.addEventListener("click", goFullScreen)
    //document.webkitExitFullscreen();
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }    
}


function goFullScreen(){
    //videoContainer.webkitRequestFullscreen();
    if(videoContainer.requestFullscreen){
        videoContainer.requestFullscreen();
    } else if (videoContainer.mozRequestFullScreen){
        videoContainer.mozRequestFullScreen();
    } else if (videoContainer.webkitRequestFullscreen){
        videoContainer.webkitRequestFullscreen();
    } else if (videoContainer.msRequestFullscreen){
        videoContainer.msRequestFullscreen();
    }

    fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>'
    fullScreenBtn.removeEventListener("click", goFullScreen)
    fullScreenBtn.addEventListener("click", exitFullScreen);
}

function handleVolumeClick(){
    if(videoPlayer.muted){
        videoPlayer.muted = false;
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>'
        volumeRange.value = videoPlayer.volume;        
    } else {
        volumeRange.value = 0;
        videoPlayer.muted = true;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'
    }
}

function handlePlayClick(){
    if(videoPlayer.paused){
        videoPlayer.play();
        playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
    }else{
        videoPlayer.pause();
        playBtn.innerHTML = `<i class="fas fa-play"></i>`;
    }
}



if(videoContainer){
    init();
}