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

    let map = L.map('map').setView([0, 0], 3);
    L.tileLayer(URL + "/api/maps/strangereal/{z}/{x}/{y}.png", {
        minZoom: 2,
        maxZoom: 5,
        tms: true
    }).addTo(map);

    // Country polygons
    let countries = L.layerGroup();

    // Add cities
    let cities = L.layerGroup();
    api.initializeCities(allcities => {
        allcities.forEach(city => {
            if (!city || !city.latLng) return;
            let marker = L.marker(city.latLng);
            let content = `${city.name}${(city.country) ? ", " + city.country : ""}`;
            // if there is dms or desc provided
            if (city.dms || city.desc) content += ` <br/> `
            if (city.dms) content += `${geodesy.getDMSString(city.dms)}`;
            if (city.desc) content += ` <hr> ${city.desc}`
            marker.bindPopup(content);
            marker.addTo(cities);
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
        "Countries": countries,
        "Cities" : cities
    }).addTo(map);

    
    // get real-time coordinates
    let Position = L.Control.extend({
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
            var latlng = lat + ", " + lng;
            //this._latlng.innerHTML = "Latitude: " + lat + "   Longitiude: " + lng;
            this._latlng.innerHTML = "Coordinates: " + latlng;
        }
    });
    let position = new Position();
    map.addControl(position);
    map.addEventListener('mousemove', e => {
        let lat = Math.round(e.latlng.lat * 1000) / 1000;
        let lng = Math.round(e.latlng.lng * 1000) / 1000;
        position.updateHTML(lat, lng);
      }
    );


    L.Control.textbox = L.Control.extend({
		onAdd: function(map) {
		var text = L.DomUtil.create('div');
		text.id = "info_text";
		text.innerHTML = "<strong>Strangereal Atlas</strong>"
		return text;
		},
		onRemove: function(map) {
			// Nothing to do here
		}
	});
	L.control.textbox = function(opts) { return new L.Control.textbox(opts);}
	L.control.textbox({ position: 'bottomleft' }).addTo(map);

}());