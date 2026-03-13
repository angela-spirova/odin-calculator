let currNum = 0;
let prevNum = null;
let currOperation = null;

let resultDisplayed = false;

const currNumDisplay = document.getElementById('curr-num-display');
const upperDisplay = document.getElementById('upper-display');

const buttonContainer = document.getElementById('buttons');

buttonContainer.addEventListener('click', (event) => {
    const button = event.target;

    if(button.classList.contains('digit')){
        const digit = +button.id;
        if(!resultDisplayed){
            addDigit(digit);
        }else{
            currNum = digit;
            resultDisplayed = false;
        }
    }
    
    else if(button.classList.contains('operation')){
        const operation = button.id;
        currOperation = operation;
        if(prevNum === null){
            prevNum = currNum;
            currNum = 0;
        }
        if(resultDisplayed){
            resultDisplayed = false;
        }
    }

    else if(button.id === 'equals'){
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