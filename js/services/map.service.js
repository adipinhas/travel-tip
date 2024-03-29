
import weatherService from './weather-service.js'

export default {
    initMap,
    addMarker,
    panTo,
    createGeocodeAPI,
    getGeocodePRM
}

const API_KEY = 'AIzaSyClJEGatJZ5nsl0wqdDZ3KLGNHKVUsY9WA'; //TODO: Enter your API Key

var map;


export function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            map = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', map);
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    map.panTo(laLatLng);
    addMarker(laLatLng);
    console.log(lat, lng)
    
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

console.log(createGeocodeAPI('jerusalem'))

function getGeocodePRM(locationStr) {
    return fetch(createGeocodeAPI(locationStr))
            .then(data => data.json())
}

function createGeocodeAPI(locationStr) {
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${locationStr}&key=${API_KEY}`;
}

//https://maps.googleapis.com/maps/api/geocode/json?address=jerusalem&key=AIzaSyClJEGatJZ5nsl0wqdDZ3KLGNHKVUsY9WA



