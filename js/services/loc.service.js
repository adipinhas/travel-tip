
export default {
    getLocs,
    getPosition
}

var locs = [{ lat: 11.22, lng: 22.11 }]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });

}


function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
        .then(data => {
             console.log(data)
            let pos = { lat: data.coords.latitude, lng: data.coords.longitude }
            // console.log('posss', pos)
            return pos
        })
        .catch(res => console.log('dvdecxedx'))
}