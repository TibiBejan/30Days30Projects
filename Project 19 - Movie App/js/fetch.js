class Fetch{
    constructor(){
        this.apiKey = '397f0df62280d2eda46af34a0f353edd';
    }

    async fetchMovies(input, pageIndex){
        const response = await fetch(`https://api.themoviedb.org/3/movie/${input}?api_key=${this.apiKey}&language=en-US&page=${pageIndex}`);
        const moviesData = await response.json();

        return moviesData;
    }

    async fetchMovie(input) {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${input}`);
        const movieData = await response.json();

        return movieData;
    }

    async fetchMovieById(id){
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&language=en-US`);
        const movieDataById = await response.json();

        return movieDataById;
    }
}

export default Fetch;