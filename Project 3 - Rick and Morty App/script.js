const searchInput = document.querySelector('.form-input');
const characters_div = document.querySelector('.characters__content');
const statusBalls_div = document.querySelectorAll('.ball');
const loadMoreButton = document.querySelector('.primary-button');

let dataArr = [];
let charactersArr = [];
let smallArrays = [];
let displayIndex = 0;

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getData);
loadMoreButton.addEventListener('click', displayMoreCharacters);
searchInput.addEventListener('keyup', displaySearchedCharacters);

//GET ALL THE CHARACTERS FROM THE API
async function getData(){
    //GET THE CHARACTER PAGES
    for(let pageIndex = 1; pageIndex <= 34; pageIndex++){
        const pageData = await fetchData(pageIndex);
        dataArr.push(pageData.results);
    }

    //LOOP THROUGH EACH PAGE AND PUSH CHARACTERS TO "charactersArr"
    getCharacters(dataArr);
   
    //MAKE 50 CHARACTERS ARRAY FROM CHARACTER ARRAY
    splitToSmallArrays(charactersArr); 

    //DISPLAY FIRST 50 CHARACTERS ON PAGE LOAD
    displayCharacters(smallArrays[0]);
}

//FUNCTION TO GET ALL CHARACTERS
function getCharacters(dataArr){
    dataArr.forEach(page => {
        for(let characterIndex = 0; characterIndex < page.length - 1; characterIndex++){
            charactersArr.push(page[characterIndex]);
        }
     });
} 

//FUNCTION TO SPLIT ALL CHARACTERS INTO 30 CHARACTERS ARRAYS
function splitToSmallArrays(charactersArr){
    const size = 50;
    for(let i = 0; i < charactersArr.length; i = i + size){
        smallArrays.push(charactersArr.slice(i, i + size));
    }
}

// FUNCTION TO DISPLAY THE CHARACTERS
function displayCharacters(characters){
    let generatedHTML = '';
    
    generatedHTML = characters.map(character => {
        let ballClass = 'ball';
        let cardBackfaceClass = '';
        if(`${character.status}` === 'Alive'){
            ballClass += ' ball-alive';
            cardBackfaceClass += 'alive';
        } else if(`${character.status}` === 'Dead'){
            ballClass += ' ball-dead';
            cardBackfaceClass += 'dead';
        } else {
            ballClass = 'ball';
            cardBackfaceClass += 'unknow';
        }


        return `
        <div class="card ">
        <div class="card__inner">
            <div class="card__face card__face-front">
                <div class="card-image">
                    <img src="${character.image}" alt="${character.name}">
                </div>
                <div class="card-info">
                    <h2 class="heading-two">${character.name}</h2>
                    <div class="character-status">
                        <div class="${ballClass}"></div>
                        <span class="status-label">${character.status} - ${character.species}</span>
                    </div>
                </div>
            </div>
            <div class="card__face card__face-back ${cardBackfaceClass}">
                <h2 class="heading-two mb-medium">${character.name}</h2>
                <div class="character-status mb-small">
                    <div class="${ballClass}"></div>
                    <span class="status-label">${character.status} - ${character.species}</span>
                </div>
                <div class="character-location mb-small">
                    <span class="location-status mb-small">Last known location</span>
                    <span class="location">${character.location.name}</span>
                </div>
                <div class="character-first_seen">
                    <span class="first_seen-status mb-small">Appears in</span>
                    <span class="episode">${character.episode.length} Episodes</span>
                </div>
            </div>
        </div>
    </div>
    `
    }).join('');

    characters_div.innerHTML += generatedHTML;

    [...characters_div.children].forEach(child => {
        child.addEventListener('click', () => {
            child.classList.add('clicked');
            setTimeout(() => {
                child.classList.remove('clicked');
            }, 2000)
        })
    })
}

// FUNCTION TO DISPLAY CHARACTERS BASED ON SEARCH INPUT
function displaySearchedCharacters(){
    const searchQuery = this.value;

    if(searchQuery !== ''){
        // DEFINE ARR WITH MATCHES
        const searchedArr = findMatches(searchQuery, charactersArr);
        // RESET THE CHARACTER CARRDS DIV
        characters_div.innerHTML = '';
        // HIDE THE LOAD MORE BUTTON ON SEARCH
        loadMoreButton.classList.add('hidden');
        // DISPLAY MATCHED CHARACTERS
        displayCharacters(searchedArr);
    } else {
        // DISPLAY THE FIRST SET OF CHARACTERS
        characters_div.innerHTML = '';
        displayCharacters(smallArrays[0]);
        // SHOW THE LOAD MORE BUTTON
        loadMoreButton.classList.remove('hidden');
    }
}

// FUNCTION TO DISPLAY ANOTHER 50 CHARACTERS ON LOAD MORE BUTTON CLICK
function displayMoreCharacters(){
    displayIndex++;
    displayCharacters(smallArrays[displayIndex]);
}

// FUNCTION FIND MATCHES
function findMatches(searchInput, charactersArr){
    return charactersArr.filter(character => {
        const regexpMatch = new RegExp(searchInput, 'gi');
        return character.name.match(regexpMatch);
    });
}

async function fetchData(pageId){
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${pageId}`);
    const data = await response.json();

    return data;
}



