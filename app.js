var constraints = { video: true, audio: true };
var constraints1 = { video: { facingMode: "user" }, audio: false };

// var track = null;
var videoInstances = {};
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");

// Access the device camera and stream to cameraView
function cameraStart() {
    console.log("Start Video.");
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
            console.log("Init Video.");
            // updateDeviceList();
            // track = stream.getTracks()[0];
            videoInstances["WEBVIEW"] = cameraView;
           // track = videoInstances["WEBVIEW"].getTracks()[0];
            videoInstances["WEBVIEW"].srcObject = stream;
            // cameraView.srcObject = videoInstances["WEBVIEW"]; //stream;
            navigator.mediaDevices.ondevicechange = function (event) {
                console.log("Error Video.1 ");
                 tryAgain();
            };
        })
        .catch(function (error) {
            console.log("Error Video.");

        //    console.error("Oops. Something is broken.", error);
        });
}

function tryAgain() {
    console.log("TryAgain...");
    try {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (stream1) {
                console.log("TryAgain...1");

               // track = stream1.getTracks()[0];
                // cameraView.srcObject = stream1;
                videoInstances["WEBVIEW"].srcObject = stream1;

                navigator.mediaDevices.ondevicechange = null;
                navigator.mediaDevices.ondevicechange = function (event) {
                    console.log("Error Video.2 ");

                   tryAgain();
                };
                /*
                sender.replaceTrack(stream1.getAudioTracks()[0])
                    .then(function (stream2) {

                        navigator.mediaDevices.ondevicechange = null;
                        navigator.mediaDevices.ondevicechange = tryAgain;
                    })
                    .catch(function (error) {
                        console.log("Error Video.");

                        console.error("Oops. Something is broken.", error);
                    });*/
            })
            .catch(function (error) {
                console.log("Error Video1.");

          //      console.error("Oops. Something is broken.", error);
            });
              
    } catch (e) {
        console.log("err: ",e);
        if (e.name == "NotFoundError") return;
        console.log(e);
    }
}

function updateDeviceList() {
    navigator.mediaDevices.enumerateDevices()
        .then(function (devices) {
           // audioList.innerHTML = "";
           // videoList.innerHTML = "";

            devices.forEach(function (device) {
                let elem = document.createElement("li");
                let [kind, type, direction] = device.kind.match(/(\w+)(input|output)/i);

                elem.innerHTML = "<strong>" + device.label + "</strong> (" + direction + ")";
                console.log("element: ", elem);
                /*
                if (type === "audio") {
                    audioList.appendChild(elem);
                } else if (type === "video") {
                    videoList.appendChild(elem);
                }
                */
            });
        });
}


// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function () {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    // track.stop();
};

//navigator.mediaDevices.ondevicechange = function (event) {
//    updateDeviceList();
//}


// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);