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

    map.on("contextmenu", function (event) {
        console.log("Coordinates: " + event.latlng.toString());
        let marker = L.marker(event.latlng).addTo(map);
        console.log("added");
    });

    let ll = api.getMapLL(`18°02'34" N, 76°34'55" W`);
    console.log(ll);

    L.marker([0,0]).addTo(map);

    // 18°02'34" N, 76°34'55" W
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
    let eaglin = L.marker([17.64, 14.61]).addTo(map);

}());
