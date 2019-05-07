window.onload = (function () {
    "use strict";

    let mapExtent = [0, -5632, 9728, 0];
    let mapMinZoom = 3;
    let mapMaxZoom = 6;
    let mapMaxResolution = 1;
    let mapMinResolution = Math.pow(2, mapMaxZoom) * mapMaxResolution;;
    let tileExtent = [0, -5632, 9728, 0];

    let crs = L.CRS.Simple;
    crs.transformation = new L.Transformation(1, -tileExtent[0], -1, tileExtent[3]);
    crs.scale = function (zoom) {
        return Math.pow(2, zoom) / mapMinResolution;
    };
    crs.zoom = function (scale) {
        return Math.log(scale * mapMinResolution) / Math.LN2;
    };

    let map = new L.Map('map', {
        maxZoom: mapMaxZoom,
        minZoom: mapMinZoom,
        crs: crs
    });

    let layer = L.tileLayer('map/strangereal/{z}/{x}/{y}.png', {
        minZoom: mapMinZoom,
        maxZoom: mapMaxZoom,
        attribution: 'Rendered with <a href="https://www.maptiler.com/">MapTiler Desktop</a>',
        noWrap: true,
        tms: false
    }).addTo(map);

    map.fitBounds([
        crs.unproject(L.point(mapExtent[2], mapExtent[3])),
        crs.unproject(L.point(mapExtent[0], mapExtent[1]))
    ]);

    L.control.mousePosition().addTo(map);

    map.on('click', function(e) {        
        var popLocation= e.latlng;
        var popup = L.popup()
        .setLatLng(popLocation)
        .setContent(popLocation.toString())
        .openOn(map);        
    });

    function addMarker(name, position) {
        return L.marker(position).bindPopup(name);
    }
    let cities = L.layerGroup();
    addMarker("Sand Island, Osea", [-2568, 3960]).addTo(cities);
    addMarker("November City, Osea", [-2886, 5058]).addTo(cities);
    addMarker("Oured, Osea", [-2716, 6352]).addTo(cities);
    addMarker("Sudentor, North Osea", [-2054, 6329]).addTo(cities);

    addMarker("Dinsmark, Belka", [-1758, 6473]).addTo(cities);

    addMarker("Directus, Ustio", [-2264, 6445]).addTo(cities);
    addMarker("Solis Ortus, Ustio", [-2283, 6420]).addTo(cities);

    addMarker("Gracemeria, Emmeria", [-1320, 2621]).addTo(cities);
    addMarker("Mante, Emmeria", [-1109, 2779]).addTo(cities);

    addMarker("Cinigrad, Yuktobania", [-2164, 2184]).addTo(cities);
    addMarker("Dresdene, Yuktobania", [-2814, 3169]).addTo(cities);

    addMarker("Farbanti, Erusea", [-2244, 7659]).addTo(cities);
    addMarker("Selatapura, Gunther", [-2721, 8214]).addTo(cities);
    addMarker("Expo City, Bulgurdarest", [-2526, 9284]).addTo(cities);

    cities.addTo(map);

}());
