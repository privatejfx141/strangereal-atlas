window.onload = (function () {
    "use strict";

    const URL = "http://localhost:3000";

    let mapBounds = [[90, 180], [-90, -180]];
    let map = L.map('map', {
        crs: L.CRS.Strangereal,
        maxBounds: mapBounds
    }).setView([0, 0], 3);

    L.tileLayer(URL + "/api/maps/strangereal/{z}/{x}/{y}.png", {
        continuousWorld: true,
        minZoom: 3,
        maxZoom: 5,
        tileSize: 256,
        bounds: mapBounds,
        noWrap: true,
        errorTileUrl: "./strangereal/error.png"
    }).addTo(map);

    L.DomUtil.addClass(map._container, 'crosshair-cursor-enabled');

    let position = new Position();
    map.addControl(position);
    map.addEventListener('mousemove', (event) => {
        let lat = Math.round(event.latlng.lat * 100) / 100;
        let lng = Math.round(event.latlng.lng * 100) / 100;
        let dms = convertToDMS(lat, lng);
        position.updateHTML(getDMSString(dms), [lat, lng]);
    });

    // layer groups
    let cities = L.layerGroup();
    let layerGroups = {
        "city": cities,
        "capital": cities,
        "base": L.layerGroup(),
        "airport": L.layerGroup(),
        "superweapon": L.layerGroup(),
        "crater": L.layerGroup()
    }

    let _icon = L.Icon.extend({
        options: { iconSize: [24, 24] }
    });

    // add locations
    api.getLocations(locations => {
        locations.forEach(location => {
            let latLng = L.DMS(location.dms);
            let marker = L.marker(latLng, {
                icon: new _icon({ iconUrl: `/api/icons/${location.datatype}.png` })
            }).bindPopup(location.name)
              .addTo(layerGroups[location.datatype]);
        });
    });

    L.control.layers({}, {
        "Cities" : layerGroups["city"],
        "Military bases" : layerGroups["base"],
        "Airports" : layerGroups["airport"],
        "Superweapons": layerGroups["superweapon"],
        "Ulysses impacts": layerGroups["crater"]
    }).addTo(map);

    map.on("click", (event) => {
        let lat = event.latlng.lat;
        let lng = event.latlng.lng;
        let dms = convertToDMS(lat, lng);
        let res = `[${dms.lat[0]}, ${dms.lat[1]}, ${dms.lat[2]}], [${dms.lng[0]}, ${dms.lng[1]}, ${dms.lng[2]}]`
        console.log(res);
    });

}());
