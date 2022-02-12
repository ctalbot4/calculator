const displayContainer = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');

let lastOperation;
let total = 0;
let display = total;
setDisplay(total);
let clearOnNextInput = false;

function setDisplay (n) {
    display = n;
    showDisplay(n);
}

function showDisplay (text) {
    displayContainer.textContent = text;
}

function appendDisplay (digit, convert) {
    if (clearOnNextInput === true) {
        setDisplay(digit);
        clearDisplay();
        clearOnNextInput = false;
    }
    else display += String(digit);
    if (convert) setDisplay(display);
    else setDisplay(Number(display));
    if (display != 0 && !display) {
        console.log('Number is falsy!');
        showDisplay('Error');
        return;
    }
    console.log(display + ' ' + total);
}

function clearDisplay () {
    showDisplay('');
    console.log('Cleared display temporarily!');
}

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
    setDisplay(0);
    total = 0;
    lastOperation = undefined;
    console.log('Cleared display!');
    }
);

numberButtons.forEach(button => button.addEventListener('click', handleNumberClick));

function handleNumberClick (e) {
    appendDisplay(Number(this.textContent));
}

const opeatorButtons = document.querySelectorAll('.operator');

opeatorButtons.forEach(button => button.addEventListener('click', handleOperatorClick));

function handleOperatorClick (e) {
    if (!clearOnNextInput) {
        switch (lastOperation) {
            case 'add':
                total += display;
                break;
            case 'subtract':
                total -= display;
                break;
            case 'multiply':
                total *= display;
                break;
            case 'divide':
                total /= display;
                break;
            default:
                total = display;
        }
    }

    setDisplay(total);
    clearOnNextInput = true;

    if (Array.from(this.classList).includes('add')) {
        lastOperation = 'add';
    }
    else if (Array.from(this.classList).includes('subtract')) {
        lastOperation = 'subtract';
    }
    else if (Array.from(this.classList).includes('multiply')) {
        lastOperation = 'multiply';
    }
    else if (Array.from(this.classList).includes('divide')) {
        lastOperation = 'divide';
    }
    else {
        lastOperation = undefined;
    }
    console.log(display + ' ' + total);
}

const plusMinusButton = document.querySelector('.plus-minus');

plusMinusButton.addEventListener('click', handlePMClick);

function handlePMClick () {
    setDisplay(display * -1);
    if (lastOperation === undefined) {
        total = display;
    }
    console.log(display + ' ' + total);
}

const percentButton = document.querySelector('.percent');

percentButton.addEventListener('click', handlePercentClick);

function handlePercentClick () {
    setDisplay(display / 100);
    if (lastOperation === undefined) {
        total = display;
    }
    console.log(display + ' ' + total);
}

const decimalButton = document.querySelector('.decimal');

decimalButton.addEventListener('click', handleDecimalClick);

function handleDecimalClick () {
    if (!String(display).includes('.')) {
        appendDisplay('.', true);
    }
}