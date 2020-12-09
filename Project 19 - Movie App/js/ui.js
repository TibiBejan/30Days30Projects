class UI{
    constructor(){
        this.headerBanner = document.querySelector('.app__header-banner');
        this.bannerImage = document.querySelector('.banner-image');
        this.bannerTitle = document.querySelector('.heading-one');
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

        this.moviesContainer.innerHTML += moviesHTML;
    }

    displayErrorCard(message){
        const errorHTML = `
            <div class="error-card">
                <p class="paragraph">${message}</p>
            </div>
        `

        this.moviesContainer.innerHTML = errorHTML;
    }

    displayRandomMovie(data){
        const randomNumber = Math.floor(Math.random() * data.results.length + 1);
        const randomMovie = data.results[randomNumber];

        this.bannerImage.setAttribute('src', `https://image.tmdb.org/t/p/original/${randomMovie.backdrop_path}`);
        this.bannerImage.setAttribute('alt', `${randomMovie.title}`);
        this.bannerTitle.innerText = `${randomMovie.title}`;
        this.headerBanner.setAttribute('data-id', `${randomMovie.id}`);
    }

    displayModal(data){
        const movieModalHTML = `
        <div class="movie-modal__content">
            <div class="movie-modal__content-image">
                <img src="https://image.tmdb.org/t/p/original/${data.movieData.backdrop_path}" alt="${data.movieData.title}">
            </div>
            <div class="movie-modal__content-info">
                <ul class="movie-genres mb-medium">
                    ${data.movieData.genres.map(genre => {
                        return `
                            <li class="list-item">${genre.name}</li>
                        `
                    }).join('')}
                </ul>
                <h2 class="heading-two movie-title mb-large">${data.movieData.title}</h2>
                <p class="movie-description mb-large">${data.movieData.overview}</p>
                <div class="movie-labels mb-large">
                    <span class="release-year">${data.movieData.release_date}</span>
                    <span class="movie-duration">${data.movieData.runtime}mins</span>
                </div>
                <div class="buttons">
                    <button type="button" class="button primary-button close-button">
                        <i class="far fa-times-circle"></i>
                        <span class="button-label">Close</span>
                    </button>
                    <a href="https://www.youtube.com/watch?v=${data.videoData.results[0].key}" target="blank" class="primary-button">
                        <i class="far fa-file-video"></i>
                        <span class="button-label">Watch Trailer</span>
                    </a>
                </div>
            </div>
        </div>
        `

        this.modal.innerHTML = movieModalHTML;

        this.modal.addEventListener('click', (e) => {
            if(e.target.closest('.close-button')){
                this.modal.classList.remove('open');
            }

             if(!e.target.closest('.movie-modal__content')){
                this.modal.classList.remove('open');
            }
        });
    }
}

export default UI;