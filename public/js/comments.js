(function(){
  var content             = document.querySelector("#comments"),
      elem                = document.querySelector("p#message"),
      last_timestamp      = 0,
      path                = window.location.pathname.substr(1).split("/"),
      comment_box         = document.querySelector("#comment"),
      likebutton          = document.querySelector("#like");
      label               = document.querySelector("#like_label");

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

  function display_likebutton(verify_me){
    likebutton.innerHTML = "";
    if (!verify_me){
      likebutton.style.background = "#ec528d";
      likebutton.appendChild(document.createTextNode("Like"))
    } else {
      likebutton.style.background = "red";
      likebutton.appendChild(document.createTextNode("Dislike"))
    }
  }

  function display_label(count, verify_me){
    label.innerHTML = "";
    if (!count && !verify_me){
      label.appendChild(document.createTextNode("Nobody like this shitty photo"))
      return ;
    }
    if (verify_me)
      label.appendChild(document.createTextNode("You"))
    if (count){
      if (verify_me)
        label.appendChild(document.createTextNode(" and "))
      label.appendChild(document.createTextNode(count + " person(s)"))
    }
    label.appendChild(document.createTextNode(" like"))
  }

  function load_like(text){
    let parse = JSON.parse(text),
        me    = false,
        count = 0;
    for (let key in parse){
      if (key === "you")
        break ;
      if (parse[key].id_user === parse["you"]){
        me = true;
        continue ;
      }
      count++;
    }
    display_likebutton(me)
    display_label(count, me)
  }

  window.addEventListener("load", function(ev){
    if (typeof path !== "object" || path.length !== 2)
      return ;
    request("/likes", {name: path[1]}, "POST", load_like, function(text){
      message(elem, text, "error_display")
    }, function (test){
      try{
        JSON.parse(test)
      } catch (e){
        return false;
      }
      return true;
    })
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
  document.querySelector("#like").addEventListener("click", function (ev){
    request("/like", {name: path[1]}, "POST", function(text){
      message(elem, text, "success_display")
      request("/likes", {name: path[1]}, "POST", load_like, function(text){
        message(elem, text, "error_display")
      }, function (test){
        try{
          JSON.parse(test)
        } catch (e){
          return false;
        }
        return true;
      })
    }, function(text){
      message(elem, text, "error_display")
    }, RegExp.prototype.test.bind(/You have (dis)*liked this picture/))
  })
})();
