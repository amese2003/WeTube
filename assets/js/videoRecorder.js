const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

const startRecording = async () => {
    try{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video: {width : 1920, height : 1080}            
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.onplay();
    }catch(error){
        recordBtn.innerHTML = ":( Cant record";
        recordBtn.removeEventListener("click", startRecording);
    }
}

function init() {
    recordBtn.addEventListener("click", startRecording);
}


if (recorderContainer) {
    init();
}