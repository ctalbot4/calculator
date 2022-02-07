function add (x, y) {
    if (typeof (x + y) === 'number') return x + y;
    else return 'Error';
}

function subtract (x, y) {
    if (typeof (x - y) === 'number') return x - y;
    else return 'Error';
}

function multiply (x, y) {
    if (typeof (x * y) === 'number') return x * y;
    else return 'Error';
}

function divide (x, y) {
    if (typeof (x / y) === 'number') return x / y;
    else return 'Error';
}

function operate (operator, x, y) {
    if (operator === 'add') {
        return add(x, y);
    }
    else if (operator === 'subtract') {
        return subtract(x, y);
    }
    else if (operator === 'multiply') {
        return multiply(x, y);
    }
    else if (operator === 'divide') {
        return divide(x, y);
    }
    else {
        return 'Error';
    }
}

const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');

clearDisplay(true);

function updateDisplay (text) {
    if (display.textContent === '0') clearDisplay();
    display.textContent += text;
}

function clearDisplay (zero) {
    if (zero === true) display.textContent = '0';
    else display.textContent = '';
}

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => clearDisplay(true));

numberButtons.forEach(button => button.addEventListener('click', handleNumberClick));

function handleNumberClick (e) {
    updateDisplay(this.textContent);
}