var paginator = function(){
    this.target = document.querySelector("#paginator_target")
    this.pagination = document.querySelector("#paginator")
    this.path = ""
    this.requestObject = null
    this.elem_by_pages = 0
    this.method = ""
    this.button = null
    this.offset_min = 0
    this.offset_max = 0
    this.success = null
    this.error = null
    this.test = null
    this.request = function() {
      let that = this;
      this.requestObject.onreadystatechange = function() {
        if (that.requestObject.readyState == 4){
              if (that.requestObject.status == 200){
                  if ((that.requestObject.responseText === "true"
                        || (typeof that.test === "function" && that.test(that.requestObject.responseText)))
                      && typeof that.success === "function")
                      that.success(that.requestObject.responseText);
                  else if (typeof that.error === "function")
                      that.error(that.requestObject.responseText)
              }
              else if (typeof error === "function")
                  that.error("Error from server");
          }
      }
      this.requestObject.open(this.method, this.path, true);
      this.requestObject.send();
    }
    this.run = function(){
      if (!this.target || !this.pagination){
        console.log("Pagination not set")
        return ;
      }
      this.request();
    }
}
