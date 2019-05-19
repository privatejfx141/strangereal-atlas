// TODO: rewrite for TMS and MongoDB

window.onload = (function () {
    "use strict";

    const URL = "http://localhost:3000";

    let map = L.map('map').setView([0, 0], 2);
    L.tileLayer(URL + "/api/maps/strangereal/{z}/{x}/{y}.png", {
        minZoom: 2,
        maxZoom: 5,
        tms: true
    }).addTo(map);

    let marker = L.marker([0, 0]).addTo(map);
    L.control.mousePosition().addTo(map);

    map.on('click', function (ev) {
        let latLng = map.mouseEventToLatLng(ev.originalEvent);
        let lat = Math.round(latLng.lat * 100) / 100;
        let lng = Math.round(latLng.lng * 100) / 100;
        console.log(`${lat}, ${lng}`);
    });

    var polylinePoints = [
        [24.33, 78.53], [24.13, 78.88], [23.85, 78.75], [23.44, 79.28],
        [23.12, 79.32], [22.72, 79.94], [22.31, 80.02], [21.78, 80.46],
        [21.49, 80.86], [21.29, 80.73], [21.04, 81.21], [20.92, 81.08],
        [20.1, 81.96], [19.73, 81.83], [19.56, 82.05], [18.35, 83.06],
        [18.23, 82.97], [17.9, 83.32], [17.52, 83.63], [17.43, 83.89],
        [17.06, 84.2], [17.06, 83.98], [16.68, 84.11], [16.64, 84.38],
        [15.54, 84.99], [15.28, 84.9], [15.41, 85.56], [14.69, 85.61],
        [14.39, 85.91], [14.05, 86.18]
    ];

    var polygon = L.polygon(polylinePoints, {
        color: 'red',
        smoothFactor: 2.0
    }).addTo(map);
    // var polyline = L.polyline(polylinePoints).addTo(map);  

    let dictionary = {};

    map.on('click', e => {
        let i = Object.keys(dictionary).length;
        marker = new L.marker(e.latlng, {
            draggable: 'true'
        });
        marker.on('dragend', function (event) {
            var marker = event.target;
            var position = marker.getLatLng();
            marker.setLatLng(new L.LatLng(position.lat, position.lng), {
                draggable: 'true'
            });
            let lat = Math.round(position.lat * 100) / 100;
            let lng = Math.round(position.lng * 100) / 100;
            marker.bindPopup(`${lat}, ${lng}`);
            dictionary[i] = [lat, lng];
            // map.panTo(new L.LatLng(position.lat, position.lng))
        });
        var position = marker.getLatLng();
        let lat = Math.round(position.lat * 100) / 100;
        let lng = Math.round(position.lng * 100) / 100;
        marker.bindPopup(`${lat}, ${lng}`);
        dictionary[i] = [lat, lng];
        map.addLayer(marker);
    });

    document.body.onkeyup = e => {
        if (e.keyCode == 32) {
            console.log(dictionary);
        }
    };

    /*/ 18°02'34" N, 76°34'55" W
    // [18.04, -76.58]
    let farbanti = L.marker([20.19, 103.45]).addTo(map);

    // 03°57'35" N, 232°15'31" E
    // [3.96, 232.26]
    let oured = L.marker([3.3, 55]).addTo(map);

    // 09°05'56" S, 126°07'35" W
    // [-9.1, -126.13]
    let bana = L.marker([-10.8, 55.1]).addTo(map);

    // 03°08'27" S, 186°02'54" E
    // [-3.14, 186.05]
    let november = L.marker([-3.1, 7.2]).addTo(map);

    // 17°20'01" N, 230°25'51" E
    // [17.33, 230.43]
    let directus = L.marker([19.5, 58.5]).addTo(map);

    // 16°52'07" N, 237°16'09" E
    // [16.87, 237.27]
    let solisortus = L.marker([18.95, 57.55]).addTo(map);

    // 37°36′00" S, 195°04′00" E
    // [-37.6, 195.07]
    let griswall = L.marker([-40.07, 15.43]).addTo(map);

    // 2°23'22" N, 56°10'49" W
    // [2.39, -56.18]
    let isev = L.marker([2.49, 123.94]).addTo(map);

    // 24°08'59" N, 234°07'59" E
    // [24.15, 234.13]
    let sudentor = L.marker([26.7, 54.18]).addTo(map);

    // 25°38'18" N, 237°28'58" E
    // [25.64, 237.48]
    let hoffnung = L.marker([28.1, 57.65]).addTo(map);

    // 08°01'13" N, 145°24'34" E
    // [8.02, 145.41]
    let sandisland = L.marker([8.7, -33.55]).addTo(map);

    // 16°11'36" N, 167°08'56" W
    // [16.19, -167.15]
    let eaglin = L.marker([17.64, 14.61]).addTo(map); */

}());
