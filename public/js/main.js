(function() {
  var streaming         = false,
      video             = document.querySelector('#video'),
      video_container   = document.querySelector('#video_container'),
      cover             = document.querySelector('#cover'),
      canvas            = document.querySelector('#canvas'),
      startbutton       = document.querySelector('#startbutton'),
      cancelbutton      = document.querySelector('#cancel'),
      uploadbutton      = document.querySelector('#upload'),
      uploadfilebutton  = document.querySelector('#fileupload'),
      uploadfileinput   = document.querySelector('#fileinput'),
      take_photo_block  = document.querySelector("div#firstaction"),
      canvas_block      = document.querySelector("div#secondaction"),
      ul_photo          = document.querySelector("ul#photoList"),
      no_photo          = document.querySelector("p#no_photo"),
      elem              = document.querySelector("p#message"),
      width             = 320,
      filter            = {},
      dragElem          = null,
      mousePositions    = null,
      image             = undefined,
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

  function managFilter(ev){
    if (this.classList.contains("active")){
      this.classList.remove("active")
      if (filter.hasOwnProperty(this.name) && filter[this.name] !== null){
        video_container.removeChild(filter[this.name].imgTag)
        delete filter[this.name];
      }
    }else{
      let img = document.createElement("img")
      img.src  = this.src;
      img.draggable = true;
      img.name = this.name
      img.style.left = "0px"
      img.style.top = "0px"
      filter[this.name] = {imgTag: img, top: 0, left: 0};
      img.addEventListener("dragstart", function(ev){
        mousePositions = {x: ev.pageX, y: ev.pageY}
        dragElem = this
      }, false)
      img.addEventListener("dragend", function(ev){
        dragElem = null
        mousePositions = null
      }, false)
      img.classList.add("filter")
      this.classList.add("active")
      video_container.appendChild(img)
    }
  }

  function drop(ev){
    let left                = 0,
        top                 = 0;
    if (!dragElem){
      message(elem, "Wrong elem dropped", "error_display")
      return ;
    }
    left = parseInt(dragElem.style.left) + (ev.pageX - mousePositions.x)
    top = parseInt(dragElem.style.top) + (ev.pageY - mousePositions.y)
    if ((left + dragElem.width) > video_container.offsetWidth || left < 0
      || (top + dragElem.height) > video_container.offsetHeight || top < 0){
        message(elem, "Image out of boundaries", "error_display")
        return ;
    }
    dragElem.style.left = left + "px"
    dragElem.style.top = top + "px"
    filter[dragElem.name].left = left
    filter[dragElem.name].top = top
  }

  function switchAction(){
    if (take_photo_block.style.display !== "none"){
      take_photo_block.style.display = "none";
      canvas_block.style.display = "block";
    }else {
      canvas_block.style.display = "none";
      take_photo_block.style.display = "block";
    }
  }

  function takepicture() {
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    image = canvas.toDataURL('image/png')
    for (let key in filter){
      if (filter !== null && filter.hasOwnProperty(key) && filter[key] !== null)
        canvas.getContext('2d').drawImage(filter[key].imgTag,
          filter[key].left, filter[key].top,
          filter[key].imgTag.offsetWidth, filter[key].imgTag.offsetHeight);
    }
    switchAction()
  }

  function deletepicture(){
    let params = {name: this.name}
    let that = this;
    request("/delete_comments", {name: that.name.replace(".png", "")}, "POST", function (text = null) {
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

  function parseFilter(){
    let filter_parse = [],
        i = 0

    for (k in filter){
      filter_parse[i] = [
        filter[k].imgTag.name,
        filter[k].imgTag.width,
        filter[k].imgTag.height,
        filter[k].left,
        filter[k].top
      ]
      i++;
    }
    return filter_parse;
  }

  window.addEventListener('load', function (ev){
    let photos = document.querySelectorAll(".delete_photo");
    let filters = document.querySelectorAll("#filters ul li img");

    video_container.addEventListener("dragover", function(ev){ev.preventDefault()}, false)
    video_container.addEventListener("drop", drop, false)
    Array.prototype.forEach.call(photos, function (elem){
      elem.addEventListener('click', deletepicture, false)
    })
    Array.prototype.forEach.call(filters, function (elem){
      elem.addEventListener('click', managFilter, false)
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
    if (filter !== null && Object.keys(filter).length > 0){
      takepicture();
    } else {
      message(elem, "Please select a filter", "error_display")
    }
  }, false);

  cancelbutton.addEventListener('click', switchAction, false);

  uploadbutton.addEventListener('click', function(ev){
    let li            = document.createElement("li"),
        params        = {
          data: image,
          filter: parseFilter()
        };
    image = undefined
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
    }, RegExp.prototype.test.bind(/^\d+_\w+$/))
    switchAction()
  }, false);

  uploadfilebutton.addEventListener('click', function (ev){
    let event =  new MouseEvent('click', {'view': window});
    uploadfileinput.dispatchEvent(event);
  })

  uploadfileinput.addEventListener('change', function (ev){
    let reader = new FileReader();
    if (this.files.length === 0)
      return ;
    reader.addEventListener("load", function(ev){
      let li            = document.createElement("li")
      if (!this.result){
        message(elem, "File upload error", "error_display")
        return ;
      }
      request("/upload_file", {data: this.result}, "POST", function(text = null) {
          message(elem, "Your photo has been uploaded", "success_display")
          createImage(text, deletepicture).forEach((elem) => li.appendChild(elem))
          ul_photo.appendChild(li)
      }, function(text) {
          message(elem, text, "error_display")
      }, RegExp.prototype.test.bind(/^\d+_\w+$/))
    })
    reader.readAsDataURL(this.files[0])
  })
})();
