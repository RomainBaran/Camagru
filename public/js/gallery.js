(function(){
  var buttonTemplate = {type:"button", style:"width:2%;"},
      pagination = new paginator();

  function getHttp(){
      var xmlhttp = null;

      if (window.XMLHttpRequest) {
          xmlhttp = new XMLHttpRequest();
       } else {
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      return xmlhttp;
  }

  pagination.path = "/gallery";
  pagination.requestObject = getHttp();
  pagination.elem_by_pages = 12;
  pagination.method = "POST";
  pagination.button = {type:"button", style:"width:auto; margin:0px 2px;"};
  pagination.offset_max = 2;
  pagination.offset_min = 2;
  pagination.show = function(data, begin){
      begin = begin * this.elem_by_pages;
      while (this.target.firstChild) {
          this.target.removeChild(this.target.firstChild);
      }
      for (var i = 0; i < this.elem_by_pages; i++){
          if (data[begin + i]){
              let div = document.createElement("li");
              createImage(data[begin + i].name).forEach(function (elem){
                  div.appendChild(elem);
              });
              this.target.appendChild(div);
          }
      }
  }
  pagination.success = function(text){
    this.data = JSON.parse(text)
    if (this.show){
        this.pages = Math.ceil(this.data.length / this.elem_by_pages)
        this.show(this.data, 0);
        this.showButton(0);
    }
  }
  pagination.error = function(text){
    console.log("error")
  }
  pagination.test = function (test){
  try{
      JSON.parse(test)
    } catch (e){
      return false;
    }
    return true;
  }
  pagination.run();
})();
