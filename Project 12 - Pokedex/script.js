const pokemonNumbers = 200;
const colors = {
    fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#add8e6',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
    normal: '#FCE7FD',
    ice: '#b9e8ea',
    dark: '#97A7A7'
};

document.addEventListener('DOMContentLoaded', fetchPokemons);


// FETCH DATA FROM API
function fetchPokemons(){

    const promises = [];
    for(let i = 1; i <= pokemonNumbers; i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then(res => res.json()));
    }

    Promise.all(promises).then( results => {
        const pokemon = results.map((data) => ({
            name: data.name[0].toUpperCase() + data.name.slice(1),
            id: data.id,
            image: data.sprites['front_shiny'],
            types: data.types.map(type => type.type.name),
            color: colors[data.types[0].type.name]
        }));

        displayPokemon(pokemon);
    });
}

function displayPokemon(pokemon){
    const pokemonCards_div = document.querySelector('.pokedex__cards');

    const pokemonHTML = pokemon.map(poke => `
        <div class="card" style="background-color: ${poke.color}">
            <div class="card__image">
                <img src="${poke.image}" alt="${poke.name}">
            </div>
            <p class="card__id">${poke.id}</p>
            <h3 class="heading-three">${poke.name}</h3>
            <p class="card__type">type: ${poke.types}</p>
        </div>
    `).join('');

    pokemonCards_div.innerHTML = pokemonHTML;
}