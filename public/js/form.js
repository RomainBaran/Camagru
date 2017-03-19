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

function removeAllClass(elem){
    let classes = elem.classList;

    classes.forEach(function(element) {
        elem.classList.remove(element)
    })
}
