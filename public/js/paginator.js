var paginator = function(){
    this.target = document.querySelector(".paginator_target")
    this.pagination = document.querySelector(".paginator")
    this.path = ""
    this.requestObject = null
    this.elem_by_pages = 0
    this.pages = 0
    this.method = ""
    this.button = null
    this.offset_min = 0
    this.offset_max = 0
    this.success = null
    this.error = null
    this.test = null
    this.show = null
    this.createButton = function(value, active = false, separator = false){
        let button = document.createElement('button');
        let that = this;
        if (this.button){
            for (var key in this.button)
                button.setAttribute(key, this.button[key])
        }
        if (active)
            button.classList.add("active")
        else if (separator)
            button.classList.add("separator")
        else {
            button.addEventListener("click", function (ev){
                that.show(that.data, parseInt(this.name) - 1);
                that.showButton(parseInt(this.name) - 1)
            })
        }
        button.setAttribute("name", value);
        button.appendChild(document.createTextNode(value))
        this.pagination.appendChild(button)
    }
    this.showButton = function (begin){
        var offset_min = ((begin - this.offset_min) > 0) ? begin - this.offset_min : 0;
        var offset_max = begin + this.offset_max;

        while (this.pagination.firstChild) {
            this.pagination.removeChild(this.pagination.firstChild);
        }
        this.createButton(1, (begin) ? false : true);
        if (offset_min > 1){
            this.createButton("...", false, true)
        }
        for (var i = offset_min; i < begin; i++){
            if (i > 0)
                this.createButton(i + 1)
        }
        if (begin)
            this.createButton(begin + 1, true)
        for (var i = begin + 1; i <= offset_max && i < (this.pages - 1); i++){
            this.createButton(i + 1)
        }
        if (offset_max < (this.pages - 2)){
            this.createButton("...", false, true)
        }
        if ((this.pages - 1) != begin)
            this.createButton(this.pages)
    }
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
