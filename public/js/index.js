// TODO: rewrite for TMS and MongoDB

function debug() {
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
}

function addCity(layerGroup, data) {
    if (!data || !data.latLng) return;
    let marker = L.marker(data.latLng);
    let content = `${data.name}${(data.country) ? ", " + data.country : ""}`;
    content += ` <br/> ${data.dms} <hr> ${data.desc}`;
    marker.bindPopup(content);
    marker.addTo(layerGroup);
}

window.onload = (function () {
    "use strict";

    const URL = "http://localhost:3000";

    let map = L.map('map').setView([0, 0], 3);
    L.tileLayer(URL + "/api/maps/strangereal/{z}/{x}/{y}.png", {
        minZoom: 2,
        maxZoom: 5,
        tms: true
    }).addTo(map);

    map.on('click', evt => {
        var latLng = evt.latlng;
        let lat = Math.round(latLng.lat * 100) / 100;
        let lng = Math.round(latLng.lng * 100) / 100;
        console.log(lat, lng);
    });

    // Country polygons
    let countries = L.layerGroup();

    // Cities
    let cities = L.layerGroup();
    addCity(cities, {
        "name": "Farbanti",
        "country": "Erusea",
        "latLng": [20.33, 103.35],
        "dms": `18°02'34" N, 76°34'55" W`,
        "desc": "Farbanti is the capital of the Kingdom of Erusea.[2] It is located on the western seaboard of the Usean continent and is home to the Erusean military's General Headquarters."
    });
    addCity(cities, {
        "name": "Oured",
        "country": "Osea",
        "latLng": [3.3, 55],
        "dms": `03°57'35" N, 232°15'31" E`,
        "desc": "Oured is the capital of the Osean Federation. The city is located on the coast of Oured Bay at the mouth of the Yarrow River, near the tip of Osea's southeastern peninsula."
    });
    addCity(cities, {
        "name": "Bana City",
        "country": "Osea",
        "latLng": [-10.8, 55.1],
        "dms": `09°05'56" S, 126°07'35" W`,
        "desc": "Bana City, also known simply as Bana, is a college town located on the southern coast of the Osean Federation, due south of Oured. It is likely one of the most prominent college towns in the country."
    });
    addCity(cities, {
        "name": "November City",
        "country": "Osea",
        "latLng": [-3.1, 7.2],
        "dms": `03°08'27" S, 186°02'54" E`,
        "desc": "November City is one of the largest cities in the Osean Federation and is located in southern Osea, west of Forster Bay."
    });
    addCity(cities, {
        "name": "Directus",
        "country": "Ustio",
        "latLng": [19.5, 58.5],
        "dms": `17°20'01" N, 230°25'51" E`,
        "desc": "Directus is the capital of the Republic of Ustio. The city is located in southeastern Ustio and consists of five administrative wards along the Crescere River."
    });
    addCity(cities, {
        "name": "Solis Ortus",
        "country": "Ustio",
        "latLng": [18.95, 57.55],
        "dms": `16°52'07" N, 237°16'09" E`,
        "desc": "Solis Ortus is an isolated rural town located in the mountains of southern Ustio."
    });
    addCity(cities, {
        "name": "Griswall",
        "country": "Aurelia",
        "latLng": [-40.07, 15.43],
        "dms": `37°36′00" S, 195°04′00" E`,
        "desc": "Griswall is the capital of Aurelia. The area that the capital city rests is on the coastal plain of eastern Aurelia."
    });
    addCity(cities, {
        "name": "International Space Elevator",
        "country": "Gunther",
        "latLng": [2.49, 123.94],
        "dms": `2°23'22" N, 56°10'49" W`,
        "desc": "The International Space Elevator, commonly referred to as the Lighthouse, is a space elevator located next to Selatapura in Gunther Bay, Usea."
    });
    addCity(cities, {
        "name": "Sudentor",
        "country": "North Osea",
        "latLng": [26.7, 54.18],
        "dms": `24°08'59" N, 234°07'59" E`,
        "desc": "Sudentor is an industrial city located in North Osea, just south of the border between Osea and present-day southern Belka, south of the Waldreich Mountains."
    });
    addCity(cities, {
        "name": "Hoffnung",
        "country": "Belka",
        "latLng": [28.19, 57.7],
        "dms": `25°38'18" N, 237°28'58" E`,
        "desc": "Hoffnung is a major city located in southeastern Belka, northeast of Sudentor and west of Belka's border with Recta."
    });
    addCity(cities, {
        "name": "Sand Island",
        "country": "Osea",
        "latLng": [8.7, -33.55],
        "dms": `08°01'13" N, 145°24'34" E`,
        "desc": "Sand Island Air Force Base, frequently referred to as simply Sand Island, is an Osean Air Defense Force base located on the eponymous island in the Ceres Ocean, west of Cape Landers."
    });
    addCity(cities, {
        "name": "Eaglin Straits",
        "country": "Osea",
        "latLng": [17.64, 14.61],
        "dms": `16°11'36" N, 167°08'56" W`,
        "desc": "The Eaglin Straits are an important inland waterway on Osea's west coast that connects the Ceres Ocean to the inland Bennion Sea. Located northeast of St. Hewlett, the straits are a major economic and military shipping route for the Osean Federation."
    });

    // Points of Interest
    let poi_ac4 = L.layerGroup();
    let poi_ac5 = L.layerGroup();
    let poi_acz = L.layerGroup();
    let poi_acx = L.layerGroup();
    let poi_ac6 = L.layerGroup();
    let poi_ac7 = L.layerGroup();

    map.addLayer(cities);
    L.control.layers(null, {
        "Countries": countries,
        "Cities" : cities,
        "POIs: Belkan War (1995)": poi_acz,
        "POIs: Continental War (2003-05)": poi_ac4,
        "POIs: Circum-Pacific War (2010)": poi_ac5,
        "POIs: Anean War (2015-16)": poi_ac6,
        "POIs: Lighthouse War (2019)": poi_ac7,
        "POIs: Aurelian War (2020)": poi_acx
    }).addTo(map);

}());
