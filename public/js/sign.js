(function(){
    var login = document.getElementsByName("login")[0];
    var email = document.getElementsByName("email")[0];
    var password = document.getElementsByName("password")[0];
    var password_again = document.getElementsByName("password_again")[0];
    var submit = document.getElementsByName("submit")[0];
    login.addEventListener("click", function(e){
        removeError(this);
    });
    email.addEventListener("click", function(e){
        removeError(this);
    });
    password.addEventListener("click", function(e){
        removeError(this);
    });
    password_again.addEventListener("click", function(e){
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
        let divAjax = document.querySelector("#ajax")
        let ajax = null;
        let errors = {
            "tests":    [login.classList.contains("error"),
                        email.classList.contains("error"),
                        password.classList.contains("error"),
                        password_again.classList.contains("error")],
            "expected": [false, false, false, false]
        }
        let params = {
            "login": login.value,
            "email": email.value,
            "password": password.value,
            "password_again": password_again.value
        }
        if (checkError(errors) === true){
            if ((ajax = ajaxObject()) === null){
                document.querySelector("p.error").style.display = "block";
                return ;
            }

        }else{
            document.querySelector("p.error").style.display = "block";
        }
    });
})();
