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
  pagination.elem_by_pages = 20;
  pagination.method = "POST";
  pagination.button = {type:"button", style:"width:2%"};
  pagination.offset_max = 2;
  pagination.offset_min = 2;
  pagination.success = function(text){
    this.data = JSON.parse(text)
    this.count = (this.data) => {let count = 0;
                                for ()}
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
