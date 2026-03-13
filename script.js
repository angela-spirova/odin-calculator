let currNum = 0;
let prevNum = null;
let currOperation = null;

const currNumDisplay = document.getElementById('curr-num-display');
const upperDisplay = document.getElementById('upper-display');
let resultDisplayed = false;

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
        inputEqualsSign();
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
    else if(key === '='){
        inputEqualsSign();
    }
    else if(key === 'Backspace'){
        removeDigit();
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
    currOperation = operation;
    if(prevNum === null){
        prevNum = currNum;
        currNum = 0;
    }
    if(resultDisplayed){
        resultDisplayed = false;
    }
}

function inputEqualsSign(){
    let result = operate(currOperation, prevNum, currNum);
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