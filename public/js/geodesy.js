function convertToDMS(lat, lng) {
    let dms = {}
    dms.lat = []
    let south = lat < 0;
    dms.lat[0] = Math.floor(Math.abs(lat))
    dms.lat[1] = (Math.abs(lat) - dms.lat[0]) * 60
    dms.lat[2] = Math.floor((dms.lat[1] - Math.floor(dms.lat[1])) * 60)
    dms.lat[1] = Math.floor(dms.lat[1])
    if (south) dms.lat[0] *= -1
    dms.lng = []
    lng = lng >= 0 ? lng - 180 : 180 + lng;
    let west = lng < 0;
    dms.lng[0] = Math.floor(Math.abs(lng))
    dms.lng[1] = (Math.abs(lng) - dms.lng[0]) * 60
    dms.lng[2] = Math.floor((dms.lng[1] - Math.floor(dms.lng[1])) * 60)
    dms.lng[1] = Math.floor(dms.lng[1])
    if (west) dms.lng[0] *= -1
    return dms
};

function getDMSString(dms) {
    let lat = dms.lat;
    let lng = dms.lng;
    let dmslat = `${Math.abs(lat[0])}°${lat[1]}'${lat[2]}" ${lat[0] < 0 ? 'S' : 'N'}`;
    let dmslng = `${Math.abs(lng[0])}°${lng[1]}'${lng[2]}" ${lng[0] < 0 ? 'W' : 'E'}`;
    return `${dmslat}, ${dmslng}`
};

function convertToDD(degrees, minutes, seconds) {
    let negative = false;
    if (degrees < 0) {
        negative = true;
        degrees = Math.abs(degrees);
    }
    return (negative ? -1 : 1) * (degrees + (minutes / 60) + (seconds / 3600));
};

function convertStringToLL(latLngDMS) {
    const regex = /(\d+)°(\d+)'(\d+)"\s*([NS]),\s*(\d+)°(\d+)'(\d+)"\s*([EW])/g;
    let match = regex.exec(latLngDMS);
    let values = match.slice(1, 4).concat(match.slice(5, 8));
    let vs = values.map(val => parseInt(val) || 0);
    let lat = Math.round(convertToDD(vs[0], vs[1], vs[2]) * 100) / 100;
    if (match[4] == "S") lat = -lat;
    let lng = Math.round(convertToDD(vs[3], vs[4], vs[5]) * 100) / 100;
    if (match[8] == "W") lng = 180 - lng;
    else lng = lng - 180;
    return [lat, lng];
};
