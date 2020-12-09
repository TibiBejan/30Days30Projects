class Fetch{
    constructor(){
        this.apiKey = '397f0df62280d2eda46af34a0f353edd';
        this.url = 'https://api.themoviedb.org/3/';
    }

    async fetchMovies(category, pageIndex){
        const response = await fetch(`${this.url}movie/${category}?api_key=${this.apiKey}&language=en-US&page=${pageIndex}`);
        const data = await response.json();

        return data;
    }

    async fetchSearchedMovie(searchQuery) {
        const response = await fetch(`${this.url}search/movie?api_key=${this.apiKey}&query=${searchQuery}`);
        const data = await response.json();

        return data;
    }

    async fetchMovieById(id){
        const movieResponse = await fetch(`${this.url}movie/${id}?api_key=${this.apiKey}&language=en-US`);
        const videoResponse = await fetch(`${this.url}movie/${id}/videos?api_key=${this.apiKey}&language=en-US`);

        const movieData = await movieResponse.json();
        const videoData = await videoResponse.json();

        return {movieData, videoData}
    }


}

export default Fetch;