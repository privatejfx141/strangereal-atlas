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

    module.updateCityLayer = function () {

    };

    module.addMarker = function (map, dd) {
        dd.lat = dd.lat / 2 - 0.4;
        dd.lng = dd.lng + 1;
        L.marker(dd).addTo(map);
    };

    let interpolateLat = x => {
        let c = [-0.4008802, 1.123905, 0.001962863, -0.00005136137, -0.000001461495];
        let y = 0;
        for (let i = 0; i <= 4; ++i) {
            y += c[i] * Math.pow(x, i);
        }
        return y;
    };

    module.getMapLL = function (latLngDMS) {
        let srcLL = this.convertToLL(latLngDMS);
        let mapLat = interpolateLat(srcLL[0]);
        return mapLat;
    };

    module.convertToDD = function (degrees, minutes, seconds) {
        let negative = false;
        if (degrees < 0) {
            negative = true;
            degrees = Math.abs(degrees);
        }
        return (negative ? -1 : 1) * (degrees + (minutes / 60) + (seconds / 3600));
    };

    module.convertToDMS = function (dd) {
        let degrees = Math.floor(dd);
        let minsFloat = (dd - degrees) * 60;
        let minutes = Math.floor(minsFloat);
        let seconds = Math.round((minsFloat - minutes) * 60);
        return [degrees, minutes, seconds];
    };

    module.convertToLL = function (latLngDMS) {
        const regex = /(\d+)°(\d+)'(\d+)" ([NS]), (\d+)°(\d+)'(\d+)" ([EW])/g;
        let match = regex.exec(latLngDMS);
        let values = match.slice(1, 4).concat(match.slice(5, 8));
        let vs = values.map(val => parseInt(val) || 0);
        let lat = Math.round(this.convertToDD(vs[0], vs[1], vs[2]) * 100) / 100;
        if (match[4] == "S") lat = -lat;
        let lng = Math.round(this.convertToDD(vs[3], vs[4], vs[5]) * 100) / 100;
        if (match[8] == "W") lng = -lng;
        return [lat, lng];
    };

    /* Listeners */

    let errorListeners = [];

    function notifyErrorListeners(err) {
        errorListeners.forEach(function (listener) {
            listener(err);
        });
    }

    module.onError = function (listener) {
        errorListeners.push(listener);
    };

    let cityListeners = [];

    let getCities = function (callback) {
        send(`GET`, `/api/cities/`, null, (err, cityIds) => {
            if (err) return console.error(err);
            cityIds.forEach(cityId => {
                send(`GET`, `/api/cities/${cityId}/`, null, (err, city) => {
                    callback(err, city);
                });
            });
        });
    };

    function notifyCityListeners() {
        cityListeners.forEach(function (listener) {
            getCities((err, city) => {
                if (err) return console.error(err);
                listener(city);
            });
        });
    }

    module.onCityUpdate = function (listener) {
        cityListeners.push(listener);
    };

    return module;

})();
