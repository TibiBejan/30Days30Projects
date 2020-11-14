window.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.querySelector('.population__input');
    const results_ul = document.querySelector('.population__results');
    let cities = [];

    try {
        cities = await loadData();
    }
    catch(e) {
        console.log("Error!");
        console.log(e)
    }

    // EVENTS
    searchInput.addEventListener('input', displayMatches);
    searchInput.addEventListener('keyup', displayMatches);

    // FUNCTION TO DISPLAY MATCHES
    function displayMatches(){
        const searchInputValue = this.value;
        const filteredLocations = findMatches(searchInputValue, cities);

        if(searchInputValue !== ''){
            const listContent = filteredLocations.map(place => {
                return `
                    <li class="list-item">
                        <p>${place.city}, ${place.state}</p>
                        <span>${numberWithCommas(place.population)}</span>
                    </li>
                `;   
            });
        
            results_ul.innerHTML = listContent.join('');
        } else {
            results_ul.innerHTML = `
                <li class="list-item">Search for a city</li>
                <li class="list-item">Or a state</li>
            `;
        }
    
        
    }
    
    // FUNCTION TO ADD COMMA'S AS THOUSANDS SEPARATOR
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // FUNCTION TO FIND MATCHES
    function findMatches(userInput, cities){
        return cities.filter(location => {
            const regexpMatch = new RegExp(userInput, 'gi');
            return location.city.match(regexpMatch) || location.state.match(regexpMatch);
        });
    }
});

async function loadData(){
    const response = await fetch('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json');
    const data = await response.json();
    return data;
}