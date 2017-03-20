(function(){
  var content             = document.querySelector("#comments"),
      elem                = document.querySelector("p#message"),
      commentsCollection  = null;

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
    let comments = JSON.parse(text),
        you = comments.you;
    for (var key in comments){
      if (key !== "you" && (!commentsCollection || !(key in commentsCollection))){
        if (!commentsCollection)
          commentsCollection = new Object();
        commentsCollection[key] = comments[key]
        createComment(comments[key], you)
      }
    }
  }

  window.addEventListener("load", function(ev){
    let explode_path = window.location.pathname.substr(1).split("/")
    if (typeof explode_path !== "object" || explode_path.length !== 2)
      return ;
    request("/comments", {name: explode_path[1]}, "POST", success,
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
  document.querySelector("send").addEventListener("click", function(ev){
    let explode_path = window.location.pathname.substr(1).split("/")
    if (typeof explode_path !== "object" || explode_path.length !== 2)
      return ;
    request("/comments", {name: explode_path[1]}, "POST", success,
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

})();
