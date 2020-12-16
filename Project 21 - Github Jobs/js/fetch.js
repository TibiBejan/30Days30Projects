class Fetch {
    async fetchData(params, pageIndex){
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${params.info}&full_time=${params.isFulltime}&location=${params.location}&page=${pageIndex}`);
        const data = await response.json();

        return data;
    }
}

export default Fetch;