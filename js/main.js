console.log('Main!');

import locService from './services/loc.service.js';
import mapService from './services/map.service.js';
import weatherServise from './services/weather-service.js';

const urlParams = new URLSearchParams(window.location.search);

locService.getLocs()
    .then(locs => console.log('locs', locs))



window.onload = () => {
    let pos;
    if (urlParams.get('lat') && urlParams.get('lng')) pos = {lat: +urlParams.get('lat'), lng: +urlParams.get('lng')};
    else pos = {lat: 32.0749831, lng: 34.9120554}

    locService.getPosition()
    mapService.initMap()
        .then(() => {
            doUpdateWeather(pos.lat, pos.lng);
            mapService.panTo(pos.lat, pos.lng)
        })
        .catch(console.log('INIT MAP ERROR'));
}

document.querySelector('.set-curr-location-btn').onclick = () => {
    locService.getPosition()
        .then(loc => {
            mapService.panTo(loc.lat, loc.lng);
            // mapService.addMarker(loc)
            doUpdateWeather(loc.lat, loc.lng);
        })
}

function doUpdateWeather(lat, lng) {
    weatherServise.getWeatherPrm(lat, lng)
                .then(data => {
                    document.querySelector('.curr-weather span').innerText = data.main.temp;
                    document.querySelector('.curr-sky-mode span').innerText = data.weather[0].description;
                    // document.querySelector('.curr-location span').innerText = 1;
                    console.log(data)
                })
}

document.querySelector('.search-btn').addEventListener('click', (ev) => {
    onSearchLocation();
})
document.querySelector('.search-input').addEventListener('change', (ev) => {
    onSearchLocation();
})
document.querySelector('.copy-location-btn').addEventListener('click', (ev) => {
    onCopyLocation();
})


function onSearchLocation() {
    let searchKey = document.querySelector('.search-input').value;
    mapService.getGeocodePRM(searchKey)
        .then(data => {
            document.querySelector('.curr-location span').innerText = data.results[0].formatted_address;
            let pos = data.results[0].geometry.location;
            mapService.panTo(pos.lat, pos.lng);
            doUpdateWeather(pos.lat, pos.lng);
        })
}



// onCopyLocation()
function onCopyLocation() {
    let currURL = window.location.href;
    locService.getPosition()
        .then(data => {
            const COPY_URL = `${currURL}?lat=${data.lat}&lng=${data.lng}`;
            // const copyToClipboard = str => {
            const newEL = document.createElement('textarea');
            newEL.value = COPY_URL;
            document.body.appendChild(newEL);
            newEL.select();
            document.execCommand('copy');
            document.body.removeChild(newEL);
            //   };
            console.log(COPY_URL);
        })
}