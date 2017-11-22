console.log('popup ready!');

let startPredicting = false;
let times = 0;
let y = 0;

document.addEventListener('DOMContentLoaded', function() {

  let video = document.getElementById('video');
  let still = document.getElementById('still');
  let up = document.getElementById('up');
  let down = document.getElementById('down');
  let predict = document.getElementById('predict');

  // Still 
  still.addEventListener('click', function() {
    knn.addImage(video, 1);
    times++;
  })
  // Up
  up.addEventListener('click', function() {
    knn.addImage(video, 2);
    times++;
  })
  // Down
  down.addEventListener('click', function() {
    knn.addImage(video, 3);
    times++;
  })
  // Predict
  predict.addEventListener('click', function() {
    knn.predict(video, function(data) {
      console.log(data);
    });
  })

  let knn = new p5ml.KNNImageClassifier(modelLoaded);

  setInterval(function() {
    if (times > 10) {
      knn.predict(video, function(data) {
        if (data.classIndex == 1) {

        } else if (data.classIndex == 2) {
          console.log('up');
          chrome.runtime.sendMessage({ direction: "up" }, function(response) {
          });
        } else if (data.classIndex == 3) {
          console.log('down');
          chrome.runtime.sendMessage({ direction: "down" }, function(response) {
          });
        }

      });
    }
  }, 1500);

  navigator.getUserMedia = navigator.getUserMedia;

  if (navigator.getUserMedia) {
    navigator.getUserMedia({ audio: false, video: true },
      function(stream) {
        video.srcObject = stream;
        video.onloadedmetadata = function(e) {
          video.play();
        };
      },
      function(err) {
        console.log("The following error occurred: " + err.name);
      }
    );
  } else {
    console.log("getUserMedia not supported");
  }
})

function modelLoaded() {
  console.log('Model Loaded')
}

// chrome.runtime.sendMessage({ txt: "holatu" }, function(response) {
//   console.log(response)
//   // tabURL = response.navURL;
//   // $("#tabURL").text(tabURL);
// });