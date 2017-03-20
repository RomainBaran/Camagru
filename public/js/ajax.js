function getHttp(){
    var xmlhttp = null;

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
     } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}

function form(params){
    let data = null;

    if (params && typeof params === "object"){
        data = new FormData();
        for (var k in params){
            data.append(k, params[k]);
        }
    }
    return data;
}

function request(uri, params, method, success = null, error = null, test = null){
    let requestObject;
    let data = null;

    if (!(requestObject = getHttp())
        || (params && !(data = form(params)))){
            if (typeof error === "function")
                error();
            return null;
    }
    requestObject.onreadystatechange = function() {
	    if (requestObject.readyState == 4){
            if (requestObject.status == 200){
                if ((requestObject.responseText === "true"
                      || (typeof test === "function" && test(requestObject.responseText)))
                    && typeof success === "function")
                    success(requestObject.responseText);
                else if (typeof error === "function")
                    error(requestObject.responseText)
            }
            else if (typeof error === "function")
                error("Error from server");
        }
    }
    requestObject.open(method, uri, true);
    requestObject.send(data);
}
