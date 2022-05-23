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

    // gets all locations
    module.getLocations = function (callback) {
        send(`GET`, `/api/locations`, null, (err, locations) => {
            if (err) return console.error(err);
            callback(locations);
        });
    }

    module.getLocationSummary = function (id, callback) {
        send(`GET`, `/api/locations/${id}`, null, (err, location) => {
            if (err) return console.error(err);
            callback(location);
        });
    }

    // get polygon
    module.getPolygon = function (id, callback) {
        send(`GET`, `/api/polygons/${id}`, null, (err, polygon) => {
            if (err) return console.error(err);
            callback(polygon);
        });
    }

    return module;

})();