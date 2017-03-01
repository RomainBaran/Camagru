function removeError(elem){
    if (elem.classList.contains("error") === true)
        elem.classList.remove("error")
}

function checkError(check){
    if (((typeof check !== "object" || check === null)
        || ("tests" in check) === false)
        || (("expected" in check) === false)
        || (Array.isArray(check.tests) === false)
        || (Array.isArray(check.expected) === false)
        || (check.tests.length !== check.expected.length)){
        console.log("checkError: wrong parameter")
        return false;
    }
    let values = check.tests
    let expected = check.expected
    for (i = 0; i < values.length; i++){
        if (values[i] !== expected[i])
            return false;
    }
    return true;
}
