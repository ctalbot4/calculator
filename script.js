const displayContainer = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');
const addButton = document.querySelector('.add');
const subtractButton = document.querySelector('.subtract');
const multiplyButton = document.querySelector('.multiply');
const divideButton = document.querySelector('.divide');


function selectButton (operation, action = 'toggle') {
    switch (operation) {
        case 'add':
            addButton.classList[action]('selected');
            break;
        case 'subtract':
            subtractButton.classList[action]('selected');
            break;
        case 'multiply':
            multiplyButton.classList[action]('selected');
            break;
        case 'divide':
            divideButton.classList[action]('selected');
            break;
    }
}

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
        selectButton(lastOperation, 'remove');
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
}

function clearDisplay () {
    showDisplay('');
}

const clearButton = document.querySelector('.clear');

clearButton.addEventListener('click', handleClearClick
);

function handleClearClick () {
    setDisplay(0);
    total = 0;
    selectButton(lastOperation, 'remove');
    lastOperation = undefined;
}

numberButtons.forEach(button => button.addEventListener('click', handleNumberClick));

function handleNumberClick (e, n) {
    if (!n) n = this.textContent;
    appendDisplay(Number(n));
}

const opeatorButtons = document.querySelectorAll('.operator');

opeatorButtons.forEach(button => button.addEventListener('click', handleOperatorClick));

function handleOperatorClick (e, operator) {
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
        selectButton(lastOperation, 'remove');
    }

    setDisplay(total);
    clearOnNextInput = true;

    if (!operator) {
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
            selectButton(lastOperation, 'remove');
            lastOperation = undefined;
        }
    }
    else {
        if (operator === '+') {
            lastOperation = 'add';
        }
        else if (operator === '-') {
            lastOperation = 'subtract';
        }
        else if (operator === '*') {
            lastOperation = 'multiply';
        }
        else if (operator === '/') {
            lastOperation = 'divide';
        }
        else if (operator === '=' || operator === 'Enter') {
            selectButton(lastOperation, 'remove');
            lastOperation = undefined;
        }
        else {
            return;
        }
    }
    selectButton(lastOperation, 'add');
}

const plusMinusButton = document.querySelector('.plus-minus');

plusMinusButton.addEventListener('click', handlePMClick);

function handlePMClick () {
    setDisplay(display * -1);
    if (lastOperation === undefined) {
        total = display;
    }
}

const percentButton = document.querySelector('.percent');

percentButton.addEventListener('click', handlePercentClick);

function handlePercentClick () {
    setDisplay(display / 100);
    if (lastOperation === undefined) {
        total = display;
    }
}

const decimalButton = document.querySelector('.decimal');

decimalButton.addEventListener('click', handleDecimalClick);

function handleDecimalClick () {
    if (!String(display).includes('.')) {
        appendDisplay('.', true);
    }
}

document.addEventListener('keydown', e => {
    if (e.key === '.') handleDecimalClick();
    else if (!isNaN(Number(e.key))) handleNumberClick(null, e.key);
    else if (e.key === '%') handlePercentClick();
    else if (e.key === 'Backspace') handleClearClick();
    else handleOperatorClick(null, e.key);
})