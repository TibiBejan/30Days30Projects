import Fetch from './fetch.js';
import UI from './ui.js';

const searchForm = document.getElementById('search-form');
const selectOptions = document.getElementById('category-selector');
const bannerPreview_button = document.getElementById('banner-preview-button');
const loadMore_button = document.getElementById('load-more');
const movieModal = document.getElementById('movie-modal');

let pageIndex = 1;
const ft = new Fetch();
const ui = new UI();

// EVENT LISTENERS
window.addEventListener('DOMContentLoaded', initApp);
searchForm.addEventListener('submit', getInput);
selectOptions.addEventListener('change', getInputOption);

function initApp(){
    const defaultMoviesData = ft.fetchMovies('popular', pageIndex)
    .then(data => {
        ui.displayMovieCards(data);
        ui.displayRandomMovie(data);
    })
    .catch((err) => {
        console.log(err);
    });
}

function getInput(e){
    e.preventDefault();
    const searchInput = document.querySelector('.form-input');
    const searchQuery = searchInput.value;

    if(searchQuery !== ''){
        const movieData = ft.fetchMovie(searchQuery).then(data => {
            ui.displayMovieCards(data);
        }).catch(err => {
            console.log(err);
        });

        searchInput.value = '';
    } else {
        alert('You must search for a movie title!');
    }
}

function getInputOption(){
    const option = this.value;
    
    const moviesData = ft.fetchMovies(option, pageIndex)
        .then(data => {
            ui.displayMovieCards(data);
        })
        .catch((err) => {
            console.log(err);
        });
}

   