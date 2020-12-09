import Fetch from './fetch.js';
import UI from './ui.js';

const searchForm = document.getElementById('search-form');
const selectOptions = document.getElementById('category-selector');
const moviesContainer = document.querySelector('.app__content-movies');
const movieModal = document.getElementById('movie-modal');

const loadMore_button = document.getElementById('load-more');

let pageIndex = 1;
const ft = new Fetch();
const ui = new UI();

// EVENT LISTENERS
window.addEventListener('DOMContentLoaded', initApp);
searchForm.addEventListener('submit', getInput);
selectOptions.addEventListener('change', getInputOption);
loadMore_button.addEventListener('click', loadMore);

function initApp(e){
    const defaultOptionValue = selectOptions.options[0].value;

    // LOAD MORE BUTTON VISIBLE
    loadMore_button.classList.remove('hidden');

    ft.fetchMovies(defaultOptionValue, pageIndex)
    .then(data => {
        ui.displayMovieCards(data);
        ui.displayRandomMovie(data);
        toggleMovieModal();
        togglePreviewMovie();
    })
    .catch((err) => {
        console.log(err);
    });
}

function getInput(e){
    e.preventDefault();
    const searchInput = document.querySelector('.form-input');
    const searchQuery = searchInput.value;

     // LOAD MORE BUTTON HIDDEN
     loadMore_button.classList.add('hidden');
     // RESET SELECT ELEMENT
     selectOptions.selectedIndex = 0;

    if(searchQuery !== ''){
        ft.fetchSearchedMovie(searchQuery).then(data => {
            // RESET MOVIES CONTAINER
            moviesContainer.innerHTML = '';
            ui.displayMovieCards(data);
            toggleMovieModal();
        }).catch(err => {
            console.log(err);
        });

        searchInput.value = '';
    } else {
        alert('You must search for a movie title!');
    }
}

function getInputOption(e){
    const option = this.value;
     // LOAD MORE BUTTON VISIBLE
     loadMore_button.classList.remove('hidden');
    
    ft.fetchMovies(option, pageIndex)
        .then(data => {
            // RESET MOVIES CONTAINER
            moviesContainer.innerHTML = '';
            ui.displayMovieCards(data);
            toggleMovieModal();
        })
        .catch((err) => {
            console.log(err);
        });
}

// GET MOVIE CARDS ID 
function toggleMovieModal(){
    const movies = document.querySelectorAll('.movie-card');

    movies.forEach((movie) => {
        const thisMovie = movie;
        movie.addEventListener('click', () => {
            const movieId = thisMovie.dataset.id;
            // OPEN MODAL
            movieModal.classList.add('open');
            movieModal.innerHTML = '';
            
            ft.fetchMovieById(movieId)
            .then(data => {
                ui.displayModal(data);
            })
            .catch((err) => {
                console.log(err);
            });
        });
    });
}

function togglePreviewMovie(){
    const appHeader_div = document.querySelector('.app__header-banner');
    const bannerPreview_button = document.getElementById('banner-preview-button');

    bannerPreview_button.addEventListener('click', (e) => {
        const movieId = appHeader_div.dataset.id;

        // OPEN MODAL
        movieModal.classList.add('open');
        movieModal.innerHTML = '';
        
        ft.fetchMovieById(movieId)
        .then(data => {
            ui.displayModal(data);
        })
        .catch((err) => {
            console.log(err);
        });
    });
}

function loadMore(){
    const currentOption = selectOptions.options[selectOptions.selectedIndex].value;
    pageIndex++;
    
    ft.fetchMovies(currentOption, pageIndex)
    .then(data => {
        ui.displayMovieCards(data);
        toggleMovieModal();
    })
    .catch((err) => {
        console.log(err);
    });
}

   