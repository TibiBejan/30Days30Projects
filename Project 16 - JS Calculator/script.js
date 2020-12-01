const date = document.getElementById('clock');
const currentOperandTextElement = document.querySelector('.calculator__display-textContent');
const numberButtons = document.querySelectorAll('.button[data-number]');
const operationButtons = document.querySelectorAll('.button[data-operation]');
const allClearButton = document.querySelector('.button[data-all-clear]');
const deleteButton = document.querySelector('.button[data-delete]');
const equalsButton = document.querySelector('.button[data-equals]');

// EVENT LISTENERS
window.addEventListener('DOMContentLoaded', init);

function init(){
    currentTime();
}

class Calculator {
    constructor(currentOperandTextElement) {
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    } 

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return;
        if(this.previousOperand !== ''){
            this.calculate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    calculate() {   
        let calculation;
        let prev = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);

        if(isNaN(prev) || isNaN(current)) return;

        switch (this.operation){
            case '+':
                calculation = prev + current;
                break;
            case '-':
                calculation = prev - current;
                break;
            case '*':
                calculation = prev * current;
                break;
            case '÷':
                calculation =  prev / current;
                break;
            default:
                return;
        }

        this.previousOperand = '';
        this.currentOperand = calculation;
        this.operation = undefined;
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
    }
}


// CREATE CALCULATOR
const calculator = new Calculator(currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});


// GET CURRENT TIME
function currentTime(){
    const hours_span = document.querySelector('.current-time__hours');
    const minutes_span = document.querySelector('.current-time__minutes');

    const currentDate = new Date();
    let hours = currentDate.getHours().toString();
    let minutes = currentDate.getMinutes().toString();

    if(hours > 12){
        hours -= 12;
    }

    hours_span.textContent = hours;
    minutes_span.textContent = minutes.padStart(2, '0');
}

setInterval(currentTime, 1000);