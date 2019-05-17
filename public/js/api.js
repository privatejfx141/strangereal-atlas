let api = (function () {
    "use strict";

    // sends a JSON request with binary data to app.js
    function sendFiles(method, url, data, callback) {
        let formdata = new FormData();
        Object.keys(data).forEach(function (key) {
            let value = data[key];
            formdata.append(key, value);
        });
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status !== 200) callback(`[${xhr.status}] ${xhr.responseText}`, null);
            else callback(null, JSON.parse(xhr.responseText));
        };
        xhr.open(method, url, true);
        xhr.send(formdata);
    }

    // sends a JSON request to app.js
    function send(method, url, data, callback) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status !== 200) callback(`[${xhr.status}] ${xhr.responseText}`, null);
            else callback(null, JSON.parse(xhr.responseText));
        };
        xhr.open(method, url, true);
        if (!data) xhr.send();
        else {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        }
    }

    let module = {};

    // get country flag by id
    let getFlag = function (countryId, callback) {
        send("GET", `/api/countries/${countryId}/flag/`, null, callback);
    };

    return module;

})();
