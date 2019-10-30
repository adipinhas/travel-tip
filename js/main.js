console.log('Main!');

import locService from './services/loc.service.js';
import mapService from './services/map.service.js';
import weatherServise from './services/weather-service.js';


locService.getLocs()
    .then(locs => console.log('locs', locs))



window.onload = () => {
    locService.getPosition()
    mapService.initMap()
        .then(() => {
            let pos = {lat: 32.0749831, lng: 34.9120554}
            weatherServise.getWeatherPrm(pos.lat, pos.lng)
                .then(data => console.log(data))
            mapService.addMarker(pos.lat, pos.lng);
            // mapService.addMarker(32.0749831, 34.9120554);
        })
        .catch(console.log('INIT MAP ERROR'));


    locService.getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

// document.querySelector('.btn').addEventListener('click', (ev) => {
//     console.log('Aha!', ev.target);
//     mapService.panTo(35.6895, 139.6917);
// })

// let pos = {lat: 32.0749831, lng: 34.9120554}
// document.querySelector('.curr-location span').innerText = pos.lat

document.querySelector('.set-curr-location-btn').onclick = () => {
    locService.getPosition()
        .then(loc => mapService.panTo(loc))
}

// document.querySelector('.btn').addEventListener('click', (ev) => {
//     console.log('Aha!', ev.target);
//     mapService.panTo(35.6895, 139.6917);
// })
