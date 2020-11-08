const generatePassword_button = document.querySelector('.submit-button');

const passwordSlider_input = document.getElementById('password-range');
const includeLowercase_element = document.getElementById('lowercase');
const includeUppercase_element = document.getElementById('uppercase');
const includeNumbers_element = document.getElementById('numbers');
const includeSymbols_element = document.getElementById('symbols');

const password_h3 = document.getElementById('password');
let passwordCharacters_span = document.querySelector('.characters');

window.addEventListener('DOMContentLoaded', () => {
    passwordCharacters_span.innerHTML = passwordSlider_input.value;
});

// GET CHARACTERS LENGTH
passwordSlider_input.addEventListener('input', function() {
    passwordCharacters_span.innerHTML = this.value;
});

// GET ARRAYS OF ASCII CODES
const LowercaseCharCodes = generateArrayFrom(97, 122);
const UppercaseCharCodes = generateArrayFrom(65, 90);
const numberCharCodes = generateArrayFrom(48, 57);
const symbolsCharCodes = generateArrayFrom(33, 47).concat(generateArrayFrom(58, 64)).concat(generateArrayFrom(91, 96)).concat(generateArrayFrom(123, 126));

// ON CLICK, GENERATE PASSWORD
generatePassword_button.addEventListener('click', (e) => {
    e.preventDefault();

    const charactersAmount = passwordCharacters_span.textContent;
    const includeLowercase = includeLowercase_element.checked;
    const includeUppercase = includeUppercase_element.checked;
    const includeNumbers = includeNumbers_element.checked;
    const includeSymbols= includeSymbols_element.checked;

    const password = generatePassword(includeLowercase, includeUppercase, includeNumbers, includeSymbols, charactersAmount);
    password_h3.textContent = password;
});

// FUNCTION TO GENERATE PASSWORD
function generatePassword(lowercase, uppercase, numbers, symbols, charactersAmount){
    let charCodes = LowercaseCharCodes;

    if(uppercase) {
        charCodes = charCodes.concat(UppercaseCharCodes);
    }
    if(numbers) {
        charCodes = charCodes.concat(numberCharCodes);
    }
    if(symbols) {
        charCodes = charCodes.concat(symbolsCharCodes);
    }

    let passwordCharacters = [];

    for(let index = 0; index < charactersAmount; index++ ){
        let charCode = charCodes[Math.floor(Math.random() * charCodes.length)];
        passwordCharacters.push(String.fromCharCode(charCode));
    }

    return passwordCharacters.join('');
}

// FUNCTION TO GENERATE ARRAYS FROM SPECIFIC VALUES
function generateArrayFrom(low, high) {
    let arrayEl = [];
    for(let i = low; i <= high; i++){
        arrayEl.push(i);
    }
    return arrayEl;
}



