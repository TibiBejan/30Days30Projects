class UI{
    constructor(){
        this.headerBanner = document.querySelector('.app__header-banner');
        this.moviesContainer = document.querySelector('.app__content-movies');
        this.modal = document.getElementById('movie-modal');
    }

    displayMovieCards(data){
        const moviesHTML = data.results.map(movie => `
        <div class="movie-card" data-id="${movie.id}">
            <div class="movie-card__image mb-small">
                <img src='https://image.tmdb.org/t/p/w500/${movie.poster_path}' alt="${movie.title}">
            </div>
            <h4 class="heading-four movie-card__title mb-small">${movie.title}</h4>
            <span class="movie-card__genre">Action</span>
            <div class="movie-card__rating">
                <span class="rating-label">${movie.vote_average}</span>
                <i class="fas fa-star"></i>
            </div>
        </div> 
        `).join('');

        this.moviesContainer.innerHTML = moviesHTML;
    }

    displayRandomMovie(data){
        const randomNumber = Math.floor(Math.random() * data.results.length + 1);
        const randomMovie = data.results[randomNumber];

        this.headerBanner.innerHTML = `
            <img src="https://image.tmdb.org/t/p/original/${randomMovie.backdrop_path}" alt="${randomMovie.title}" class="banner-image">
            <h1 class="heading-one mb-medium">${randomMovie.title}</h1>
            <button type="button" class="button transparent-button" id="banner-preview-button">View More</button>
        `;

        this.headerBanner.setAttribute('data-id', `${randomMovie.id}`)
    }

    displayModal(data){
        console.log(data);
    }
}

export default UI;