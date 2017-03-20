(function(){
    var login = document.getElementsByName("login")[0];
    var email = document.getElementsByName("email")[0];
    var password = document.getElementsByName("password")[0];
    var password_again = document.getElementsByName("password_again")[0];
    var submit = document.getElementsByName("submit")[0];
    login.addEventListener("click", function(e){
        this.classList.remove("error")
    });
    email.addEventListener("click", function(e){
        this.classList.remove("error")
    });
    password.addEventListener("click", function(e){
        this.classList.remove("error")
    });
    password_again.addEventListener("click", function(e){
        this.classList.remove("error")
    });
    login.addEventListener("blur", function(e){
        let errors = {
            "tests": [(this.value.length > 0), /^[\w]+$/.test(this.value)],
            "expected": [true, true]
        }
        if (checkError(errors) === false)
            this.classList.add("error")
    });
    email.addEventListener("blur", function(e){
        let errors = {
            "tests": [(this.value.length === 0), /^[\w\-\.]+@([\w]+\.){1,2}[a-zA-Z]{2,3}$/.test(this.value)],
            "expected": [false, true]
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
    password_again.addEventListener("blur", function(e){
        let errors = {
            "tests": [(this.value === password.value)],
            "expected": [true]
        }
        if (checkError(errors) === false)
            this.classList.add("error")
    });
    submit.addEventListener("click", function(e){
        let elem = document.querySelector("p#message");
        let params = {
            "login": login.value,
            "email": email.value,
            "password": password.value,
            "password_again": password_again.value
        }
        if (!request("/sign", params, "POST", function(text = null) {
            message(elem, "An email as been sent", "success_display")
        }, function(text) {
            message(elem, text, "error_display")
        }))
        return;
    });
})();
