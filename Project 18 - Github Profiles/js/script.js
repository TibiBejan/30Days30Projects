import Fetch from './fetch.js';
import UI from './ui.js';

const searchForm = document.querySelector('.app-header__form');
const searchInput = document.querySelector('.form-input');

// EVENT LISTENERS
searchForm.addEventListener('submit', findUser);

function findUser(e){
    e.preventDefault();
    
    const searchQuery = searchInput.value;
    const fetch = new Fetch();
    const ui = new UI();

    if(searchQuery !== ''){
        fetch.getData(searchQuery).then(data => {
            ui.buildUI(data);
        }).catch(() => {
            ui.errorUI('User not found, please try again!');
        });

        searchInput.value = '';
    } else {
        ui.errorUI('You must type in an user profile name!');
    }
}