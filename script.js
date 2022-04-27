let video = document.querySelector("video");
let recordBtnCont = document.querySelector(".record-btn-cont");
let recordBtn = document.querySelector(".record-btn");
let captureBtnCont = document.querySelector(".capture-btn-cont");
let captureBtn = document.querySelector(".capture-btn");
let recordFlag = false;

let transparentColor = "transparent";
let recorder;
let chunks = []; // media data in chunks

let constrains ={
    video: true,
    audio: false
}
// navigator is global object, which provide information related to your browser.
// global object means it is provided by our window
navigator.mediaDevices.getUserMedia(constrains)
.then((stream)=>{
    video.srcObject = stream;

    recorder = new MediaRecorder(stream);
    recorder.addEventListener("start",(e)=>{
        chunks =[];
    })
    recorder.addEventListener("dataavailable",(e)=>{
        chunks.push(e.data);
    })
    recorder.addEventListener("stop",(e)=>{
        // conversion of media chunks to video
        let blob = new Blob(chunks,{type:"video/mp4"});
        let videoUrl = URL.createObjectURL(blob);

        let a = document.createElement("a");
        a.href = videoUrl;
        a.download = "stream.mp4";
        a.click();
    })

})
recordBtnCont.addEventListener("click",(e)=>{
    if(!recorder)return;

    recordFlag = !recordFlag;

    if(recordFlag){
        // start
        recorder.start();
        recordBtn.classList.add("scale-record");
        startTimer();
    }else{
        // stop
        recorder.stop();
        recordBtn.classList.remove("scale-record");
        stopTimer();
    }
})

captureBtnCont.addEventListener("click",(e)=>{
    let canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    let tool = canvas.getContext("2d");
    tool.drawImage(video, 0 , 0, canvas.width, canvas.height);
    // filtering
    tool.fillStyle = transparentColor;
    tool.fillRect( 0 , 0, canvas.width, canvas.height);
    let imageUrl = canvas.toDataURL();
    let a = document.createElement("a");
        a.href = imageUrl;
        a.download = "image.jpg";
        a.click();
})

let timerID;
let counter = 0;  // represents total seconds
let timer  = document.querySelector(".timer");
function startTimer(){
    timer.style.display = "block";
    function displayTimer(){
        let totalSeconds = counter;

        let hours = Number.parseInt(totalSeconds/3600);
        totalSeconds = totalSeconds % 3600; // remaining value

        let minutes = Number.parseInt(totalSeconds/60);
        totalSeconds = totalSeconds % 60;

        let seconds = totalSeconds;

        hours = (hours < 10) ? `0${hours}` : hours;
        minutes = (minutes < 10) ? `0${minutes}` : minutes;
        seconds = (seconds < 10) ? `0${seconds}` : seconds;

        timer.innerText =`${hours}:${minutes}:${seconds}`;

        counter++;
    }
    timerID = setInterval(displayTimer, 1000);
}
function stopTimer(){
    timer.style.display = "none"
    clearInterval(timerID);
    timer.innerText ="00:00:00";
}
let filterLayer = document.querySelector(".filter-layer")
let allFilters = document.querySelectorAll(".filter")
    allFilters.forEach((filterElem)=>{
        filterElem.addEventListener("click",(e)=>{
          // get style
          transparentColor = getComputedStyle(filterElem).getPropertyValue("background-color")
          // set 
          filterLayer.style.backgroundColor = transparentColor; 
        })
    })
     