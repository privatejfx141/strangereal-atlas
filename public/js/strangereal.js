// track DMS position
const Position = L.Control.extend({
    _container: null,
    options: {
        position: 'bottomleft'
    },
    onAdd: function (map) {
        let latlng = L.DomUtil.create('div', 'mouseposition');
        this._latlng = latlng;
        return latlng;
    },
    updateHTML: function (dms, latLng) {
        latLng[1] = latLng[1] >= 0 ? latLng[1] - 180 : 180 + latLng[1];
        this._latlng.innerHTML = "Coordinates: " + dms;
        this._latlng.innerHTML += "<br />" + latLng[0] + ", " + Math.round(latLng[1] * 100) / 100;
    }
});

const types = {
    "city": "City",
    "capital": "Capital city",
    "base": "Military base",
    "airport": "Airport / space center",
    "superweapon": "Superweapon",
    "crater": "Ulysses impact crater"
};

// infobox
const Infobox = L.Control.extend({
    _container: null,
    options: {
        position: 'bottomleft'
    },
    onAdd: function (map) {
        let infobox = L.DomUtil.create('div', 'infobox');
        this._infobox = infobox;
        this._infobox.innerHTML = `
            <div class="infobox-title" ref="title">
                <h2>Welcome to the Strangereal Atlas</h2>
            </div>`
        L.DomEvent.disableClickPropagation(infobox);
        return infobox;
    },
    updateHTML: function (data) {
        let loc = data.country;
        if (data.region !== data.country) loc = data.region + ", " + loc;
        let desc = data.desc ? data.desc : "No information available."
        this._infobox.innerHTML = `
        <div class="infobox-title" ref="title">
            <h2>${data.name}</h2>
        </div>
        <div class="infobox-body">
            <h3>${types[data.datatype]}</h3>
            <div>Coordinates: ${getDMSString(data.dms)}</div>
            <div>Location: ${loc}</div>
            <h3>Summary</h3>
            <div>${desc}</div>
            ${(data.url ? `<div><a href=${data.url} target="_blank">Read More</a></div>` : "")}
        </div>`;
    }
});

// Strangereal coordinate reference system
L.CRS.Strangereal = L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(32/45, 128, -32/45, 64)
});

// DMS to latLng function
L.DMS = function (dms) {
    let lat = Math.abs(dms.lat[0]) + dms.lat[1] / 60 + dms.lat[2] / 3600
    if (dms.lat[0] < 0) lat = -lat;
    let lng = Math.abs(dms.lng[0]) + dms.lng[1] / 60 + dms.lng[2] / 3600
    if (dms.lng[0] < 0) lng = -lng;
    return L.latLng(lat, lng < 0 ? lng + 180 : lng - 180);;
};
