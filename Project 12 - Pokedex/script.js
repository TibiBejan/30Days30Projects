const colors = {
    fire: '#da4a12',
	grass: '#6ea95e',
	electric: '#e0d443',
	water: '#338ade',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#f9eaff',
	poison: '#8dd6c1',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#e7f2f6',
	fighting: '#E6E0D4',
    normal: '#FCE7FD',
    ice: '#b9e8ea',
    dark: '#97A7A7',
    ghost: '#333'
};


const pokemonCards_div = document.querySelector('.pokedex__cards');

// EVENT LISTENTERS
window.addEventListener('DOMContentLoaded', init);

async function init(){
    const pokemonArr = await fetchData();
    const promises = [];

    for(let i = 1; i <= pokemonArr.length; i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then(response => response.json()));
    }

    Promise.all(promises).then(response => {
        const pokemons = response.map(data => ({
            name: data.name[0].toUpperCase() + data.name.slice(1),
            id: data.id,
            hp: data.stats[0].base_stat,
            image: `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`,
            type: data.types[0].type.name,
            height: data.height,
            weight: data.weight,
            abilities: data.abilities.map(ability => ability.ability.name).join(', '),
            color: colors[data.types[0].type.name]
        }));

        displayPokemons(pokemons);
    });
}


function displayPokemons(pokemons){
    const pokemonHTML = pokemons.map(poke => `
        <div class="card">
            <div class="card__info-top" style="background-image: linear-gradient(to bottom, #76d5ff, ${poke.color});">
                <img src=${poke.image} alt="${poke.name}">                        
                <div class="info">
                    <span class="info-id">#${poke.id.toString().padStart(3, '0')}</span>
                    <div class="info-hp">
                        <i class="fas fa-heart"></i>
                        <span class="hp-label">${poke.hp} HP</span>
                    </div>
                </div>
            </div>
            <h2 class="heading-two">${poke.name}</h2>
            <h3 class="heading-three" style="color: ${poke.color}">${poke.type}</h3>
            <div class="card__info-bottom">
                <p class="paragraph"><span class="detail">Height: </span>${parseFloat(poke.height) * 10} <span class="detail">Weight: </span>${parseFloat(poke.weight) / 10}kg</p>
                <p class="paragraph"><span class="detail">Abilities: </span>${poke.abilities}</p>
            </div>
        </div>
    `).join('');

    pokemonCards_div.innerHTML = pokemonHTML;
}



async function fetchData(){
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=100`;

    const response = await fetch(url);
    const data = await response.json();

    return data.results;
}
