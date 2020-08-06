const videoContainer = document.getElementById("jsVideoPlayer")
const videoPlayer = videoContainer.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");

function init(){
    playBtn.addEventListener("click", handlePlayClick)
}

function handlePlayClick(){
    if(videoPlayer.paused){
        videoPlayer.play();
    }else{
        videoPlayer.pause();
    }
}

if(videoContainer){
    init();
}