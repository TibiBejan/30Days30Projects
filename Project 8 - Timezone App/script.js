const Appform_form = document.querySelector('.app__header-form');

const ipAdress_h2 = document.getElementById('ip-adress');
const location_h2 = document.getElementById('location');
const timezone_h2 = document.getElementById('timezone');
const isp_h2 = document.getElementById('isp');

const map_div = document.getElementById('app__map');
let searchQuery = '';

// EVENT LISTENERS
window.addEventListener('DOMContentLoaded', initApp);
Appform_form.addEventListener('submit', displayResults);

async function initApp(){
    let ipData = await getData();
    let latitude = ipData.location.lat;
    let longitude = ipData.location.lng;
    
    updateUI(ipData);
    createMap(ipData, latitude, longitude);
}

function displayResults(e){
    const searchInput = document.querySelector('.form-input');
    const regexExpression = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/;

    if(searchInput.value.match(regexExpression)){
        searchQuery = searchInput.value;
    } else {
        console.log("You must enter a valid IP!");
    }

    e.preventDefault();
}


function updateUI(ipData){
    ipAdress_h2.innerHTML = ipData.ip;
    location_h2.innerHTML = `${ipData.location.country}, ${ipData.location.region}`;
    timezone_h2.innerHTML = `${ipData.location.timezone}`;
    isp_h2.innerHTML = ipData.isp;
}

function createMap(ipData, latitude, longitude){
    const mymap = L.map(map_div).setView([`${latitude}`, `${longitude}`], 13);
    const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tiles = L.tileLayer(tileURL, { tileAttribution }); 
    tiles.addTo(mymap);
    const marker = L.marker([`${latitude}`, `${longitude}`]).addTo(mymap);
    marker.bindPopup(`<b>${ipData.ip}</b><br>${ipData.isp}`).openPopup();
}

async function getData(){
    const response = await fetch('https://geo.ipify.org/api/v1?apiKey=at_I0wAVnVG6QfdYJ0Bl7DKHogSqIQZ0');
    const data = await response.json();

    return data;
}
