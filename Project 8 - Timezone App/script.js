const Appform_form = document.querySelector('.app__header-form');

const ipAdress_h2 = document.getElementById('ip-adress');
const location_h2 = document.getElementById('location');
const timezone_h2 = document.getElementById('timezone');
const isp_h2 = document.getElementById('isp');

const map_div = document.getElementById('app__map');
const mymap = L.map(map_div).setView([0,0], 13);
const marker = L.marker([0, 0]).addTo(mymap);

let searchQuery = '';

// EVENT LISTENERS
window.addEventListener('DOMContentLoaded', () => {
    fetchData(searchQuery);
});
Appform_form.addEventListener('submit', displayResults);

function displayResults(e){
    e.preventDefault();
    const searchInput = document.querySelector('.form-input');
    const regexExpression = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/;

    if(searchInput.value.match(regexExpression)){
        searchQuery = searchInput.value;
    } else {
        console.log("You must enter a valid IP!");
    }

    fetchData(searchQuery);
}


function updateUI(ipData){
    ipAdress_h2.innerHTML = ipData.ip;
    location_h2.innerHTML = `${ipData.location.country}, ${ipData.location.region}`;
    timezone_h2.innerHTML = `${ipData.location.timezone}`;
    isp_h2.innerHTML = ipData.isp;
}

function createMap(ipData, latitude, longitude){
    const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tiles = L.tileLayer(tileURL, { tileAttribution }); 
    tiles.addTo(mymap);
    marker.setLatLng([latitude, longitude]);
    marker.bindPopup(`<b>${ipData.ip}</b><br>${ipData.isp}`).openPopup();
   
}

async function fetchData(searchQuery){
    let url;

    if(searchQuery === undefined){
        url = 'https://geo.ipify.org/api/v1?apiKey=at_I0wAVnVG6QfdYJ0Bl7DKHogSqIQZ0';
    } else {
        url = `https://geo.ipify.org/api/v1?apiKey=at_I0wAVnVG6QfdYJ0Bl7DKHogSqIQZ0&ipAddress=${searchQuery}`;
    }

    async function getResults(url){
        const response = await fetch (url);
        const data = await response.json();

        return data;
    }

    
    let ipData = await getResults(url);
    let latitude = ipData.location.lat;
    let longitude = ipData.location.lng;


    updateUI(ipData);
    createMap(ipData, latitude, longitude);
}