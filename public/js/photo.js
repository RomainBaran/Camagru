function createImage(data, delete_button = false){
  let image         = document.createElement("img"),
      top           = document.createElement("div"),
      bottom        = document.createElement("div"),
      top_button    = document.createElement("button"),
      bottom_button = document.createElement("button"),
      top_link      = document.createElement("a");
  image.setAttribute("src", "/public/upload/" + data + ".jpeg");
  image.classList.add("photo");
  top.classList.add("top");
  bottom.classList.add("bottom");
  top_button.innerHTML = "Comment";
  top_button.setAttribute("type", "button")
  top_link.setAttribute("href", "/comment/" + data)
  if (typeof delete_button === "function"){
    bottom_button.innerHTML = "Delete";
    bottom_button.setAttribute("type", "button")
    bottom_button.setAttribute("name", data + ".jpeg")
    bottom_button.classList.add("button_error")
    bottom_button.classList.add("delete_photo")
    bottom_button.addEventListener("click", delete_button)
  }
  top_link.appendChild(top_button)
  top.appendChild(top_link)
  bottom.appendChild(bottom_button)
  return delete_button ? [image, top, bottom] : [image, top];
}
