const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = (event) => {
    console.log(event);
    const { data : vidoeFile } = event;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download = "recorded.webm";
    document.body.appendChild(link);
    link.click();
}

const stopRecording = () => {
    videoRecorder.stop();
    recordBtn.removeEventListener("click", stopRecording);
    recordBtn.addEventListener("click", getVideo);
    recordBtn.innerHTML = "Start recording";
};

const startRecording = () => {
    const videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start();
    videoRecorder.addEventListener("dataavailable", handleVideoData);        
    recordBtn.addEventListener("click", stopRecording);
    //setTimeout(() => videoRecorder.stop(), 5000);
};


const getVideo = async () => {
    try{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video: {width : 1920, height : 1080}            
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        recordBtn.innerHTML = "Stop recording";
        streamObject = stream;
        startRecording();
    }catch(error){
        recordBtn.innerHTML = ":( Cant record";
    } finally {
        recordBtn.removeEventListener("click", getVideo);
    }
}

function init() {
    recordBtn.addEventListener("click", getVideo);
}


if (recorderContainer) {
    init();
}