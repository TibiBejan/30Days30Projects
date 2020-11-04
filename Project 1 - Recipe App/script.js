// VARIABLES
const form = document.querySelector('.recipes__form');
const recipes_div = document.querySelector('.recipes__elements');

// EVENT LISTENERS
form.addEventListener('submit',  getResults);

// FUNCTION TO GET RESULTS FROM API BASED ON INPUT VALUE
async function getResults(e){
    e.preventDefault();

    const searchInput = document.querySelector('.recipe-input');
    const searchQuery = searchInput.value;
    let dataArr = await getData(searchQuery);

    prepareData(dataArr.hits);
}

// FUNCTION TO PREPARE DATA FROM API
function prepareData(arr){
    let recipesArr = [];
    arr.forEach((item,) => {
        recipesArr.push({
            image: item.recipe.image,
            title: item.recipe.label,
            calories: item.recipe.calories,
            healthLabels: item.recipe.healthLabels,
            ingredients: item.recipe.ingredientLines,
            totalTime: item.recipe.totalTime,
            totalWeight: item.recipe.totalWeight,
            url: item.recipe.url,
            portions: item.recipe.yield
        });
    });
    
    displayRecipes(recipesArr);
    displayRecipeOverlay(recipesArr);
}

// FUNCTION TO DISPLAY ALL THE RECIPES
function displayRecipes(recipesArr){
    let generatedHTML = recipesArr.map(recipe => 
        `
        <div class="recipe">
            <h2 class="heading-two">${recipe.title}</h2>
            <div class="recipe-image">
                <img src="${recipe.image}" alt="${recipe.title}">
            </div>
         </div>
        `
    ).join('');

    recipes_div.innerHTML = generatedHTML;
}

// FUNCTION TO DISPLAY RECIPE OVERLAY
function displayRecipeOverlay(recipesArr){
    const recipeElements = document.querySelectorAll('.recipe');
    // RECIPE OVERLAY ELEMENTS
    const recipeOverlay_div = document.querySelector('.overlay');
    const backButton = document.querySelector('.back-button');
    const recipeTitle = document.querySelector('.heading-two-showcase');
    const recipeLabels = document.querySelector('.labels');
    const recipeIngredients = document.querySelector('.ingredients');
    const recipeDetailsButton = document.querySelector('.primary-button');
    const recipeWeightInfo = document.querySelector('.weight-info');
    const recipeTimeInfo = document.querySelector('.time-info');
    const recipeServingsInfo = document.querySelector('.servings-info');
    const recipeCalories = document.querySelector('.calories');

    recipeElements.forEach(recipe => {
        recipe.addEventListener('click', function(){
            recipeOverlay_div.classList.add('overlay-open');
            const currentIndex = getIndex(recipe, recipeElements);

            // UPDATE OVERLAY INFO
            recipeTitle.textContent = recipesArr[currentIndex].title;
            recipeLabels.innerHTML = recipesArr[currentIndex].healthLabels.map(label =>
                `
                    <div class="label">${label}</div>
                `
            ).join('');
            recipeIngredients.innerHTML = recipesArr[currentIndex].ingredients.map(ingredient => 
                `
                ${ingredient}, 
                `
            ).join('');
            recipeDetailsButton.setAttribute('href', `${recipesArr[currentIndex].url}`);
            recipeWeightInfo.textContent = Math.floor(recipesArr[currentIndex].totalWeight);
            recipeTimeInfo.textContent = recipesArr[currentIndex].totalTime;
            recipeServingsInfo.textContent = recipesArr[currentIndex].portions;
            recipeCalories.textContent = Math.floor(recipesArr[currentIndex].calories) + " calories";
        });
    });

    // CLOSE OVERLAY ON CLICK
    backButton.addEventListener('click', () =>{
        recipeOverlay_div.classList.remove('overlay-open');
    });
}

// FUNCTION TO FIND THE CURRENT INDEX
function getIndex(item, items){
    for(let i = 0; i < items.length; i++){
        if(item === items[i]){
            return i;
        }
    }
}


// GET DATA FROM API
async function getData(query){
    const api = {
        appId: '5543e6c4',
        appKey: 'b4eee9618e3d407c73e30d513c0ed902',
        url: 'https://api.edamam.com/search'
    }

    const response = await fetch(`${api.url}?q=${query}&app_id=${api.appId}&app_key=${api.appKey}&from=0&to=6`);
    const data = await response.json();

    return data;
}

