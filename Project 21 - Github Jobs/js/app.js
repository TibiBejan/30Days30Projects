import Fetch from './fetch.js';

const optionForm = document.querySelector('.header__search-form');
let query;
let pageIndex = 2;

// EVENT LISTENERS
optionForm.addEventListener('submit', getInputFields);


async function getInputFields(e){
    e.preventDefault();

    const ft = new Fetch();
    const info = document.getElementById('description').value;
    const location = document.getElementById('location').value;
    const isFulltime = document.getElementById('full-time').checked;

    const params = {info, location, isFulltime};
    const data = await ft.fetchData(params, pageIndex);
    console.log(data);
}
