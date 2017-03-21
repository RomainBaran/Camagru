(function() {
  var streaming         = false,
      video             = document.querySelector('#video'),
      cover             = document.querySelector('#cover'),
      canvas            = document.querySelector('#canvas'),
      startbutton       = document.querySelector('#startbutton'),
      cancelbutton      = document.querySelector('#cancel'),
      uploadbutton      = document.querySelector('#upload'),
      take_photo_block  = document.querySelector("div#firstaction"),
      canvas_block      = document.querySelector("div#secondaction"),
      ul_photo          = document.querySelector("ul#photoList"),
      no_photo          = document.querySelector("p#no_photo"),
      width             = 320,
      height            = 0;

  navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

  navigator.getMedia(
    {
      video: true,
      audio: false
    },
    function(stream) {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    function(err) {
      console.log("An error occured! " + err);
    }
  );

  function takepicture() {
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    take_photo_block.style.display = "none";
    canvas_block.style.display = "block";
  }

function deletepicture(){
  let elem = document.querySelector("p#message");
  let params = {
    name: this.name
  }
  let that = this;
  request("/delete_comments", {name: that.name.replace(".jpeg", "")}, "POST", function (text = null) {
    request("/delete_photo", params, "POST", function(text = null) {
          message(elem, "Your photo has been deleted", "success_display")
          that.parentElement.parentElement.remove();
          if (!document.querySelector("ul#photoList > li")){
            ul_photo.style.display = "none";
            no_photo.style.display = "block";
          }
    }, function(text) {
          message(elem, text, "error_display")
    })
  }, function (text){
    message(elem, text, "error_display")
  })
}

  window.addEventListener('load', function (ev){
    let photos = document.querySelectorAll(".delete_photo");
    ev.preventDefault();
    Array.prototype.forEach.call(photos, function (elem){
      elem.addEventListener('click', deletepicture)
    })
  })

  video.addEventListener('canplay', function(ev){
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false);

  startbutton.addEventListener('click', function(ev){
    takepicture();
    ev.preventDefault();
  }, false);

  cancelbutton.addEventListener('click', function(ev){
    canvas_block.style.display = "none";
    take_photo_block.style.display = "block";
  }, false);


  uploadbutton.addEventListener('click', function(ev){
    let li        = document.createElement("li"),
        elem      = document.querySelector("p#message"),
        params    = {
          "data": canvas.toDataURL('image/jpeg', 1)
        };
    request("/upload", params, "POST", function(text = null) {
        message(elem, "Your photo has been uploaded", "success_display")
        createImage(text, deletepicture).forEach((elem) => li.appendChild(elem))
        ul_photo.appendChild(li)
        if (no_photo){
          no_photo.style.display = "none";
          ul_photo.style.display = "block";
        }
    }, function(text) {
        message(elem, text, "error_display")
    }, /\d+_\w+/.test.bind(/\d+_\w+/))
    canvas_block.style.display = "none";
    take_photo_block.style.display = "block";
  }, false);

})();
