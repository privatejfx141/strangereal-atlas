let geodesy = (function () {
    "use strict";
    
    let module = {};

    module.getDMSString = function (dms) {
        let lat = dms.lat;
        let lng = dms.lng;
        let dmslat = `${lat.d}°${lat.m}'${lat.s}" ${lat.dir}`;
        let dmslng = `${lng.d}°${lng.m}'${lng.s}" ${lng.dir}`;
        return `${dmslat}, ${dmslng}`
    }

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

    return module;

})();