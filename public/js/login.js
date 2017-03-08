(function(){
    var login = document.getElementsByName("login")[0];
    var password = document.getElementsByName("password")[0];
    var submit = document.getElementsByName("submit")[0];
    login.addEventListener("click", function(e){
        removeError(this);
    });
    password.addEventListener("click", function(e){
        removeError(this);
    });
    login.addEventListener("blur", function(e){
        let errors = {
            "tests": [(this.value.length > 0), /^[\w]+$/.test(this.value)],
            "expected": [true, true]
        }
        if (checkError(errors) === false)
            this.classList.add("error")
    });
    password.addEventListener("blur", function(e){
        let errors = {
            "tests": [(this.value.length > 0), /^[\w]+$/.test(this.value)],
            "expected": [true, true]
        }
        if (checkError(errors) === false)
            this.classList.add("error")
    });
    submit.addEventListener("click", function(e){
        let elem = document.querySelector("p#message");
        let params = {
            "login": login.value,
            "password": password.value,
        }
        request("/login", params, "POST", function() {
            window.location.replace("/");
        }, function(text) {
            elem.style.display = "none";
            removeAllClass(elem);
            elem.innerHTML = text;
            elem.classList.add("error_display");
            elem.style.display = "block";
        })
    });
})();
