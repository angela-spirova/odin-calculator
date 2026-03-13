let currNum = 0;
let prevNum = null;
let currOperation = null;

const currNumDisplay = document.getElementById('curr-num-display');
const upperDisplay = document.getElementById('upper-display');

const buttonContainer = document.getElementById('buttons');

buttonContainer.addEventListener('click', (event) => {
    const button = event.target;

    if(button.classList.contains('digit')){
        const digit = +button.id;
        addDigit(digit);
    }
    
    else if(button.classList.contains('operation')){
        const operation = button.id;
        currOperation = operation;
        if(prevNum === null){
            prevNum = currNum;
            currNum = 0;
        }
    }

    else if(button.id === 'equals'){
        currNum = operate(currOperation, prevNum, currNum);
        prevNum = null;
        currOperation = null;
    }

    else if(button.id === 'delete'){
        removeDigit();
    }

    else if(button.id === 'clear'){
        currNum = 0;
        prevNum = null;
        currOperation = null;
    }

    else if(button.id === 'clear-entry'){
        currNum = 0;
    }
    else if(button.id === 'sign-toggle'){
        currNum *= (-1);
    }
    else if(button.id === 'decimal-point'){
        
    }

    updateDisplay();
});

// OPERATIONS

function add(a, b){
    return a+b;
}

function subtract(a, b){
    return a-b;
}

function multiply(a, b){
    return a*b;
}

function divide(a, b){
    return a/b;
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
                alert("Can't divide by zero!");
                return ;
            }
            return divide(a,b);
        }
        default:{
            return currNum;
        }
    }
}


function addDigit(digit){
    if(currNum >= 0){
        currNum = currNum*10 + digit;
    }else{
        currNum = currNum*10 - digit;
    }
   
}

function removeDigit(){
    if(currNum >= 0){
        currNum = Math.floor(currNum/10);
    }else{
        currNum = Math.ceil(currNum/10);
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