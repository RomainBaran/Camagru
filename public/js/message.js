function message(elem, text, cssclass){
    elem.style.display = "none";
    removeAllClass(elem);
    elem.innerHTML = text;
    elem.classList.add(cssclass);
    elem.style.display = "block";     
}