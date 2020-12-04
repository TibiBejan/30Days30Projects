import Fetch from './fetch.js';
import UI from './ui.js';

const searchForm = document.getElementById('search-form');

// EVENT LISTENERS
window.addEventListener('DOMContentLoaded', initApp);
searchForm.addEventListener('submit', initSearch);

function initApp(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position){
        const currentCoords = {lat: position.coords.latitude, long: position.coords.longitude};
        
        const fetch = new Fetch();
        fetch.getDataByCoords(currentCoords).then((data) => {
            const ui = new UI();
            ui.populateUISuccess(data);
       }).catch(() => {
            const ui = new UI();
            ui.populateUIFail('Unexpected Error, please try again!');
       });
    }

    function error(err){
        const ui = new UI();
        ui.populateUIFail(`There is an error with code: ${err.code}, ${err.message}`);
    }
}

function initSearch(e){
    e.preventDefault();
    const searchQuery = document.querySelector('#search-form input').value;

    const fetch = new Fetch();
    fetch.getDataByCity(searchQuery).then((data) => {
        const ui = new UI();
        ui.populateUISuccess(data);
    }).catch((err) => {
        const ui = new UI();
        ui.populateUIFail('Please enter a valid city into the search input!');
   });
}

