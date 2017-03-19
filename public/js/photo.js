function createImage(data, delete_button = false){
  let image         = document.createElement("img"),
      top           = document.createElement("div"),
      bottom        = document.createElement("div"),
      top_button    = document.createElement("button"),
      bottom_button = document.createElement("button");
  image.setAttribute("src", data);
  image.classList.add("photo");
  top.classList.add("top");
  bottom.classList.add("bottom");
  top_button.innerHTML = "Comment";
  top_button.setAttribute("type", "button")
  bottom_button.innerHTML = "Delete";
  bottom_button.setAttribute("type", "button")
  bottom_button.classList.add("button_error")
  top.appendChild(top_button)
  bottom.appendChild(bottom_button)
  return delete_button ? [image, top, bottom] : [image, top];
}