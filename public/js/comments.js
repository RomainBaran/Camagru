(function(){
  var content             = document.querySelector("#comments"),
      elem                = document.querySelector("p#message"),
      last_timestamp      = 0,
      path                = window.location.pathname.substr(1).split("/"),
      comment_box         = document.querySelector("#comment");

  function createComment(elem, you){
    let div     = document.createElement("div"),
        label   = document.createElement("label"),
        p       = document.createElement("p"),
        l_text  = document.createTextNode(elem.login + " " + elem.date),
        p_text  = document.createTextNode(elem.content);

    label.appendChild(l_text)
    p.appendChild(p_text)
    div.appendChild(label)
    div.appendChild(p)
    if (elem.id_user == you)
      div.classList.add("you")
    content.insertBefore(div, content.firstChild)
  }

  function success(text = null){
    let comments_buff = null;
    let comments = JSON.parse(text),
        you = comments.you;
    for (var key in comments){
      if (key !== "you"){
        comments_buff = comments[key]
        createComment(comments[key], you)
      }
    }
    if (comments_buff)
      last_timestamp = comments_buff["date"]
  }

  window.addEventListener("load", function(ev){
    if (typeof path !== "object" || path.length !== 2)
      return ;
    request("/comments", {name: path[1], timestamp: last_timestamp}, "POST", success,
      function(text){
        message(elem, text, "error_display")
      },
      function (test){
        try{
          JSON.parse(test)
        } catch (e){
          return false;
        }
        return true;
      })
  })
  document.querySelector("#send").addEventListener("click", function(ev){
    if (typeof path !== "object" || path.length !== 2)
      return ;

    request("/upload_comment", {content: comment_box.value, name: path[1]}, "POST",
      function(text = null){
        message(elem, "Your comment has been sent", "success_display");
        request("/comments", {name: path[1], timestamp: last_timestamp}, "POST", success,
          function(text){
            message(elem, text, "error_display")
          },
          function (test){
            try{
              JSON.parse(test)
            } catch (e){
              return false;
            }
            return true;
          });
      },  function (text){
        message(elem, text, "error_display")
      })
    })
})();
