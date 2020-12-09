import Fetch from './fetch.js';
import UI from './ui.js';

const ft = new Fetch();
const ui = new UI();

const searchForm = document.getElementById('search-form');
const selectOptions = document.getElementById('category-selector');
const moviesContainer = document.querySelector('.app__content-movies');
const movieModal = document.getElementById('movie-modal');
const loadMore_button = document.getElementById('load-more');
const bannerPreview_button = document.getElementById('banner-preview-button');

let pageIndex = 1;

// EVENT LISTENERS
window.addEventListener('DOMContentLoaded', initApp);
searchForm.addEventListener('submit', getInput);
selectOptions.addEventListener('change', getInputOption);
bannerPreview_button.addEventListener('click', togglePreviewMovie);
loadMore_button.addEventListener('click', loadMore);

// DISPLAY MOVIE RESULTS ON PAGE LOAD
async function initApp(e){
    const defaultOptionValue = selectOptions.options[0].value;
    const data = await ft.fetchMovies(defaultOptionValue, pageIndex);
    ui.displayMovieCards(data);
    ui.displayRandomMovie(data);
    toggleMovieModal();
}

// DISPLAY MOVIES BASED ON SEARCH INPUT
async function getInput(e){
    e.preventDefault();
    const searchInput = document.querySelector('.form-input');
    const searchQuery = searchInput.value;
    if(searchQuery !== ''){
        const data = await ft.fetchSearchedMovie(searchQuery);
        if(data.results.length !== 0){
            moviesContainer.innerHTML = '';
            ui.displayMovieCards(data);
            toggleMovieModal();
            // RESET THE SEARCH INPUT
            searchInput.value = '';
        } else {
            ui.displayErrorCard('There is nothing here, please try again!')
        }
    } else {
        ui.displayErrorCard('You must search for a movie title!')
    }
}

// DISPLAY MOVIES BASED ON SELECTED CATEGORY
async function getInputOption(){
    const option = this.value;
    const data = await ft.fetchMovies(option, pageIndex);
    moviesContainer.innerHTML = '';
    ui.displayMovieCards(data);
    toggleMovieModal();
}

// TOGGLE MODAL AND DISPLAY SELECTED MOVIE ON MOVIE CARD CLICK
function toggleMovieModal(){
    const movies = document.querySelectorAll('.movie-card');
    movies.forEach((movie) => {
        movie.addEventListener('click', function() {
            const movieId = this.dataset.id;
            displayMovieById(movieId);
        });
    });
}

// TOGGLE MODAL AND DISPLAY THE BANNER MOVIE ON BUTTON CLICK
function togglePreviewMovie(){
    const movieId = this.parentElement.dataset.id;
    displayMovieById(movieId);
}

// FUNCTION TO DISPLAY THE SELECTED MOVIE
async function displayMovieById(movieId){
    movieModal.classList.add('open');
    movieModal.innerHTML = '';
    const movieData = await ft.fetchMovieById(movieId);
    ui.displayModal(movieData);
}

// LOAD MORE MOVIES ON LOAD-MORE BUTTON CLICK
async function loadMore(){
    const currentOption = selectOptions.options[selectOptions.selectedIndex].value;
    pageIndex++;
    const moreData = await ft.fetchMovies(currentOption, pageIndex);
    ui.displayMovieCards(moreData);
    toggleMovieModal();
}

   