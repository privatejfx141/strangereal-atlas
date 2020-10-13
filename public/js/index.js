const Position = L.Control.extend({
    _container: null,
    options: {
        position: 'bottomleft'
    },
    onAdd: function (map) {
        var latlng = L.DomUtil.create('div', 'mouseposition');
        this._latlng = latlng;
        return latlng;
    },
    updateHTML: function (lat, lng) {
        this._latlng.innerHTML = "Coordinates: " + lat + ", " + lng;;
    }
});

const Infobox = L.Control.extend({
    options: {
        position: 'bottomleft'
    },
    onAdd: function (map) {
        let infobox = L.DomUtil.create('div', 'info-container');
        this._infobox = infobox;
        this._infobox.innerHTML = `
            <span class="info-title" ref="title">
                <h2>Welcome to the Strangereal Atlas</h2>
            </span>`
        L.DomEvent.disableClickPropagation(infobox);
        return infobox;
    },
    updateHTML: function (html) {
        this._infobox.innerHTML = html
    }
});

function getDateString(olddate) {
    const date = new Date(olddate);
    const month = date.toLocaleString('default', { month: 'long' });
    return `${month} ${date.getDate()}, ${date.getFullYear()}`;
}

function createPOIPopup(poi) {
    let content = `<h3 style="margin-bottom: 1px;">${poi.name}</h3>`
    content += `<span style="font-style: italic;">${poi.altname}</span>`
    // ACX only shows year
    content += `<br/><span>${poi.conflictId === "acx" ? "2020" : getDateString(poi.date)}</span>`
    return content;
}

// city to poi dictionary
let citypoi = {};

function initializePOIs(conflict, layerGroup, icon) {
    citypoi[conflict] = {};
    api.initializePOIs(conflict, pois => {
        pois.forEach(poi => {
            if (!poi || !poi.location) return;
            let marker = L.marker(poi.location, { icon: icon });
            if (poi.cityId) {
                if (poi.cityId in citypoi[conflict]) {
                    citypoi[conflict][poi.cityId]._popup._content += `<hr>` + createPOIPopup(poi);
                    return;
                } else {
                    citypoi[conflict][poi.cityId] = marker;
                }
            }
            marker.bindPopup(createPOIPopup(poi));
            marker.addTo(layerGroup);
        });
    });
}

window.onload = (function () {
    "use strict";

    const URL = "http://localhost:3000";

    // leaflet map
    let map = L.map('map').setView([0, 0], 3);
    L.tileLayer(URL + "/api/maps/strangereal/{z}/{x}/{y}.png", {
        minZoom: 2,
        maxZoom: 5,
        tms: true
    }).addTo(map);

    let position = new Position();
    map.addControl(position)
    .addEventListener('mousemove', e => {
        let lat = Math.round(e.latlng.lat * 1000) / 1000;
        let lng = Math.round(e.latlng.lng * 1000) / 1000;
        position.updateHTML(lat, lng);
      }
    );

    let infobox = new Infobox();
    map.addControl(infobox);
    
    // Country polygons
    let countries = L.layerGroup();

    // Add cities
    let cities = L.layerGroup();
    api.initializeCities(allcities => {
        allcities.forEach(city => {
            if (!city || !city.latLng) return;
            L.marker(city.latLng, { icon: markericon.city })
            .bindPopup(city.name)
            .addTo(cities)
            .on("click", _ => {
                map.addControl(infobox);
                api.getCitySummary(city._id, data => {
                    infobox.updateHTML(`
                    <span class="info-title" ref="title">
                        <img class="info-flag" src="/api/countries/${data.countryId}/flag"/>
                        <h2>${data.name}</h2>
                    </span>
                    <div class="info-body">
                        <h3>${data.isCapital ? "Capital City" : "City"}</h3>
                        <div>Location: ${data.location}</div>
                        ${data.dms ? `<div>Coordinates: ${geodesy.getDMSString(data.dms)}</div>` : ""}
                        <h3>Summary</h3>
                        <div>${data.desc}</div>
                        ${data.url ? `<a href="${data.url}">Acepedia</a>` : ""}
                    </div>`);
                });
            });
        });
    });

    let landmarks = L.layerGroup();

    // Add points of interest
    let poi_ac04 = L.layerGroup();
    initializePOIs("ac04", poi_ac04, markericon.ac04);

    let poi_ac5 = L.layerGroup();
    initializePOIs("ac5", poi_ac5, markericon.ac5);

    let poi_acz = L.layerGroup();
    initializePOIs("acz", poi_acz, markericon.acz);

    let poi_acx = L.layerGroup();
    initializePOIs("acx", poi_acx, markericon.acx);

    let poi_ac6 = L.layerGroup();
    initializePOIs("ac6", poi_ac6, markericon.ac6);

    let poi_ac7 = L.layerGroup();
    initializePOIs("ac7", poi_ac7, markericon.ac7);

    L.control.layers({
        "Default": L.layerGroup(),
        "POIs: Belkan War (1995)": poi_acz,
        "POIs: Continental War (2003-05)": poi_ac04,
        "POIs: Circum-Pacific War (2010)": poi_ac5,
        "POIs: Anean War (2015-16)": poi_ac6,
        "POIs: Lighthouse War (2019)": poi_ac7,
        "POIs: Aurelian War (2020)": poi_acx
    }, {
        "Cities" : cities,
        "Landmarks": countries,
    }).addTo(map);

}());