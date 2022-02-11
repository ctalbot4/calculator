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

let number = 0;
setNumber(number);

function setNumber (n) {
    number = n;
    display.textContent = 0;
}

function appendNumber (digit) {
    if (number == 0) {
        setNumber(digit);
        clearDisplay();
    }
    else number += String(digit);
    number = Number(number);
    if (!number) {
        console.log('Number is falsy!');
        display.textContent = 'Error';
        return;
    }
    display.textContent = number;
    console.log('Number updated to ' + number + ' with a type of ' + typeof number);
}

function clearDisplay (zero) {
    display.textContent = '';
    console.log('Cleared display temporarily!');
}

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
    setNumber(0);
    console.log('Cleared display!');
    }
);

numberButtons.forEach(button => button.addEventListener('click', handleNumberClick));

function handleNumberClick (e) {
    appendNumber(Number(this.textContent));
}