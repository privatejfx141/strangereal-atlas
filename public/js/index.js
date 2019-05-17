// TODO: rewrite for TMS and MongoDB

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

    function createMarker(name, position) {
        return L.marker(position).bindPopup(name);
    }
    let cities = L.layerGroup();
    createMarker("Sand Island, Osea", [-2568, 3960]).addTo(cities);
    createMarker("November City, Osea", [-2886, 5058]).addTo(cities);
    createMarker("Oured, Osea", [-2716, 6352]).addTo(cities);
    createMarker("Sudentor, North Osea", [-2054, 6329]).addTo(cities);

    createMarker("Dinsmark, Belka", [-1758, 6473]).addTo(cities);
    createMarker("Directus, Ustio", [-2264, 6445]).addTo(cities);
    createMarker("Solis Ortus, Ustio", [-2283, 6420]).addTo(cities);

    createMarker("Gracemeria, Emmeria", [-1320, 2621]).addTo(cities);
    createMarker("Mante, Emmeria", [-1109, 2779]).addTo(cities);

    createMarker("Cinigrad, Yuktobania", [-2164, 2184]).addTo(cities);
    createMarker("Dresdene, Yuktobania", [-2814, 3169]).addTo(cities);

    createMarker("Farbanti, Erusea", [-2244, 7659]).addTo(cities);
    createMarker("Selatapura, Gunther", [-2721, 8214]).addTo(cities);
    createMarker("Expo City, Bulgurdarest", [-2526, 9284]).addTo(cities);

    let countries = L.layerGroup();

    let poi_acz = L.layerGroup();
    
    let poi_ac4_icon = L.icon({
        iconUrl: 'images/markers/marker_ac4.png',
        iconSize: [36, 58],
        iconAnchor: [18, 58],
        popupAnchor: [0, -50] 
    });

    let poi_ac4 = L.layerGroup();
    function createAC4Marker(name, position) {
        L.marker(position, {icon: poi_ac4_icon}).bindPopup(name).addTo(poi_ac4);
    }

    createAC4Marker("Operation Umbrella <br/> 19 September 2004", [-2129, 9484]);
    createAC4Marker("Operation Harvest <br/> 5 October 2004", [-2351, 9338]);
    createAC4Marker("Operation White Out <br/> 10 October 2004", [-1829, 9106]);
    createAC4Marker("Operation Hunting Hawk <br/> 7 November 2004", [-2619, 9212]);
    createAC4Marker("Operation Early Bird <br/> 19 November 2004", [-2699, 9258]);
    createAC4Marker("Operation Rough Seas <br/> 23 November 2004", [-2737, 9242]);
    createAC4Marker("Operation Blackout <br/> 16 December 2004", [-2389, 9130]);
    createAC4Marker("Operation Countdown <br/> 31 December 2004", [-3325, 9248]);
    createAC4Marker("Operation Bunker Shot <br/> 24 January 2005", [-3103, 9000]);
    createAC4Marker("Operation Woodpecker <br/> 28 February 2005", [-3031, 8880]);
    createAC4Marker("Operation Noah's Ark <br/> 14 March 2005", [-2697, 8594]);
    createAC4Marker("Operation Stone Crusher <br/> 2 April 2005", [-2507, 8388]);
    createAC4Marker("Operation Blindman's Bluff <br/> 7 May 2005", [-2417, 8552]);
    createAC4Marker("Operation Aurora <br/> 18 June 2005", [-1805, 8890]);
    createAC4Marker("Operation Firefly <br/> 10 July 2005", [-2320, 8388]);
    createAC4Marker("Operation Sandstorm <br/> 15 August 2005", [-2197, 7968]);
    createAC4Marker("Operation Autumn Thunder <br/> 19 September 2005", [-2243, 7660]);
    createAC4Marker("Operation Judgement Day <br/> 26 September 2005", [-2455, 7708]);

    let poi_ac5 = L.layerGroup();
    createMarker("Operation Lagoon <br/> 24 September 2010", [-2673, 4225]).addTo(poi_ac5);
    createMarker("Operation Gyre <br/> 27 September 2010 <hr> Bombing of Sand Island <br/> 27 September 2010 <hr> Operation Vanguard <br/> 4 October 2010", [-2567, 3959]).addTo(poi_ac5);
    createMarker("Bombing of St. Hewlett <br/> 27 September 2010", [-2527, 4917]).addTo(poi_ac5);
    createMarker("Operation Whalebird <br/> 30 September 2010", [-2320, 5259]).addTo(poi_ac5);
    createMarker("Operation Silver Bridge <br/> 3 October 2010", [-2878, 4643]).addTo(poi_ac5);
    createMarker("Akerson Hill incident <br/> 22 October 2010", [-2583, 4566]).addTo(poi_ac5);
    createMarker("Operation Footprint <br/> 1 November 2010", [-2956, 3365]).addTo(poi_ac5);
    createMarker("Operation Hammerblow <br/> 2 November 2010", [-2815, 3177]).addTo(poi_ac5);
    createMarker("Operation Emerald <br/> 4 November 2010", [-2940, 6033]).addTo(poi_ac5);
    createMarker("Operation Wisdom <br/> 4 November 2010", [-3097, 6354]).addTo(poi_ac5);
    createMarker("Operation Snake Pit <br/> 7 November 2010", [-2875, 2928]).addTo(poi_ac5);
    createMarker("Operation Fork Dance <br/> 7 November 2010", [-2560, 3056]).addTo(poi_ac5);
    createMarker("Operation Long Harpoon <br/> 14 November 2010", [-849, 2644]).addTo(poi_ac5);
    createMarker("Operation Backhaul <br/> 17 November 2010 <hr> Operation Stray Sheep <br/> 18 November 2010", [-2422, 2781]).addTo(poi_ac5);
    createMarker("Operation Desert Arrow <br/> 25 November 2010", [-2541, 2555]).addTo(poi_ac5);
    createMarker("Operation Desert Blitz <br/> 25 November 2010", [-2557, 2525]).addTo(poi_ac5);
    createMarker("Operation Supercircus <br/> 29 November 2010", [-2886, 5059]).addTo(poi_ac5);
    createMarker("Operation Doodlebug <br/> 6 December 2010", [-2125, 2349]).addTo(poi_ac5);
    createMarker("Ambush at Vladimir <br/> 6 December 2010", [-2133, 2762]).addTo(poi_ac5);
    createMarker("Escape from Sand Island <br/> 7 December 2010", [-1670, 4171]).addTo(poi_ac5);
    createMarker("Operation Keynote <br/> 9 December 2010", [-1981, 6274]).addTo(poi_ac5);
    createMarker("Operation Silvereye <br/> 11 December 2010 <hr> Operation Deepsix <br/> 12 December 2010", [-1888, 6177]).addTo(poi_ac5);
    createMarker("Operation Riverbed <br/> 16 December 2010", [-1938, 2582]).addTo(poi_ac5);
    createMarker("Operation Crossroad <br/> 23 December 2010", [-2101, 3063]).addTo(poi_ac5);
    createMarker("Operation Glory Horn <br/> 29 December 2010", [-1805, 4013]).addTo(poi_ac5);
    createMarker("Battle of Sudentor <br/> 30 December 2010", [-2054, 6329]).addTo(poi_ac5);
    createMarker("Operation Arcadia <br/> 31 December 2010", [-2710, 6330]).addTo(poi_ac5);

    let poi_ac6 = L.layerGroup();
    createMarker("Invasion of Gracemeria <br/> 30 August 2015 <hr> Operation Free Gracemeria <br/> 31 March 2016 <hr> Gracemeria cruise missile <br/> 31 March 2016", [-1316, 2625]).addTo(poi_ac6);
    createMarker("Bombing of Vitoze <br/> 24 November 2015", [-1667, 715]).addTo(poi_ac6);
    createMarker("Battle of Sipli Field <br/> 27 November 2015", [-1425, 880]).addTo(poi_ac6);
    createMarker("Battle of Bartolomeo Fortress <br/> 27 December 2015", [-1311, 1036]).addTo(poi_ac6);
    createMarker("Rargom Beach offensive <br/> 26 January 2016", [-1553, 1380]).addTo(poi_ac6);
    createMarker("Standoff in Silvat Town <br/> 7 February 2016", [-1447, 1644]).addTo(poi_ac6);
    createMarker("Battle of the Selumna Peaks <br/> 12 February 2016", [-1227, 1888]).addTo(poi_ac6);
    createMarker("San Loma Assault <br/> 15 February 2016", [-1427, 2084]).addTo(poi_ac6);
    createMarker("Assault on the Aerial Fleet <br/> 20 February 2016", [-1622, 2244]).addTo(poi_ac6);
    createMarker("Battle of Ragno Fortress <br/> 6 March 2016", [-1139, 2348]).addTo(poi_ac6);
    createMarker("Battle of the Moloch Desert <br/> 25 March 2016", [-1255, 2456]).addTo(poi_ac6);
    createMarker("Fort Norton infiltration <br/> 26 March 2016", [-1255, 2556]).addTo(poi_ac6);
    createMarker("Battle of Sonne Island <br/> 1 April 2016", [-727, 2768]).addTo(poi_ac6);

    let poi_ac7 = L.layerGroup();
    createMarker("Operation Lighthouse Keeper <br/> 6 June 2019 <hr> Operation Daredevil <br/> 31 October 2019 <hr> Operation Hush <br/> 1 November 2019", [-2721, 8214]).addTo(poi_ac7);

    let overlays = {
        "Countries": countries,
        "Cities" : cities,
        "POIs: Belkan War (1995)": poi_acz,
        "POIs: Continental War (2003-05)": poi_ac4,
        "POIs: Circum-Pacific War (2010)": poi_ac5,
        "POIs: Emmeria-Estovakia War (2015-16)": poi_ac6,
        "POIs: Lighthouse War (2019)": poi_ac7
    };

    L.control.layers(null, overlays).addTo(map);

}());
