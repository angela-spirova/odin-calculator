let currNum = null;
let prevNum = null;
let currOperation = null;

const currNumDisplay = document.getElementById('curr-num-display');
const upperDisplay = document.getElementById('upper-display');
let resultDisplayed = false;

const operations = [
    {
        name: 'add',
        sign: '+',
    },
    {
        name: 'subtract',
        sign: '-',
    },
    {
        name: 'multiply',
        sign: '*',
    },
    {
        name: 'divide',
        sign: '/',
    }
]

// MOUSE CONTROLS

const buttonContainer = document.getElementById('buttons');

buttonContainer.addEventListener('click', (event) => {
    const button = event.target;

    if(button.classList.contains('digit')){
        const digit = +button.id;
        addDigit(digit);
    }
    
    else if(button.classList.contains('operation')){
        const operation = button.id;
        inputOperation(operation);
    }

    else if(button.id === 'equals'){
        displayResult();
    }

    else if(button.id === 'delete'){
        removeDigit();
    }

    else if(button.id === 'clear'){
        clearAll();
    }

    else if(button.id === 'clear-entry'){
        clearEntry();
    }
    else if(button.id === 'sign-toggle'){
        toggleSign();
    }
    else if(button.id === 'decimal-point'){
        
    }

    updateDisplay();
});


// KEYBOARD CONTROLS

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if(key >= '0' && key <= '9'){
        const digit = +key;
        addDigit(digit);
    }
    else if(key === '=' || key === 'Enter'){
        event.preventDefault();
        displayResult();
    }
    else if(key === 'Backspace'){
        removeDigit();
    }
    else if(key === 'Delete'){
        clearEntry();
    }
    else if(key === 'Escape'){
        clearAll();
    }
    else if(key === '+' || key === '-' || key === '*' || key === '/'){
        const operationName = operations.find((operation) => operation.sign === key).name;
        console.log(operationName);
        inputOperation(operationName);
    }
    else if(key === '.'){

    }

    updateDisplay();
});


// FUNCTIONALITIES

function removeDigit(){
    if(currNum >= 0){
        currNum = Math.floor(currNum/10);
    }else{
        currNum = Math.ceil(currNum/10);
    }
}

function addDigit(digit){
    if(resultDisplayed){
        currNum = digit;
        resultDisplayed = false;
    }
    else
    if(currNum >= 0){
        currNum = currNum*10 + digit;
    }else{
        currNum = currNum*10 - digit;
    }
}

function inputOperation(operation){
    if(prevNum !== null && currNum !== null){
        displayResult();
        prevNum = currNum;
        currNum = 0;
    }
    if(currNum === null){
        currNum = 0;
    }
    if(prevNum === null){
        prevNum = currNum;
        currNum = 0;
    }
    currOperation = operation;
    if(resultDisplayed){
        resultDisplayed = false;
    }
}

function displayResult(){
    const result = operate(currOperation, prevNum, currNum);
    if(result === undefined){
        alert('Can\'t divide by zero!');
        return ;
    }

    currNum = result;
    prevNum = null;
    currOperation = null;

    resultDisplayed = true;
}

function clearAll(){
    currNum = 0;
    prevNum = null;
    currOperation = null;
}

function clearEntry(){
    currNum = 0;
}

function toggleSign(){
    currNum *= (-1);
}

// OPERATIONS

function add(a, b){
    const result = a+b;
    return Math.round(result*(10**9))/(10**9);
}

function subtract(a, b){
    const result = a-b;
    return Math.round(result*(10**9))/(10**9);
}

function multiply(a, b){
    const result = a*b;
    return Math.round(result*(10**9))/(10**9);
}

function divide(a, b){
    const result = a/b;
    return Math.round(result*(10**9))/(10**9);
}


function operate (operation, a, b){
    switch(operation){
        case "add":{
            return add(a,b);
        }
        case "subtract": {
            return subtract(a,b);
        }
        case "multiply": {
            return multiply(a,b);
        }
        case "divide": {
            if(b === 0){
                return ;
            }
            return divide(a,b);
        }
        default:{
            return currNum;
        }
    }
}

// DISPLAY OUTPUT

function updateDisplay(){
    currNumDisplay.textContent = currNum;
    if(prevNum===null && currOperation===null){
        upperDisplay.textContent='';
    }
    else{
        const operation = document.getElementById(currOperation).textContent;
        upperDisplay.textContent=`${prevNum} ${operation}`;
    }
}