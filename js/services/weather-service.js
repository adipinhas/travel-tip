'use strict';

export default {
    getWeatherPrm
}


//`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${W_KEY}` 

const MY_WEATHER_API_KEY = 'bbf4d8816f7b3f9f155bafa020fb3b4a';

function createWetherApiURL(lat, lng) {
    return `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=${MY_WEATHER_API_KEY}`;
}

function getWeatherPrm(lat, lng) {
    return fetch(createWetherApiURL(lat, lng))
            .then(data => data.json())
                .then(weatherData => {
                    console.log(weatherData)
                    return weatherData
                });
}