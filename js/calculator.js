let operation = {
    num1: undefined,
    operator: undefined,
    num2: undefined
}

function add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
}

const subtract = (num1, num2) => {
    return parseFloat(num1) - parseFloat(num2);
}

const multiply = (num1, num2) => {
    return parseFloat(num1) * parseFloat(num2);
}

const divide = (num1, num2) => {
    if (parseFloat(num2) === 0) return "bruh";
    return Math.floor(parseFloat(num1) / parseFloat(num2));
}

const operate = () => {
    switch(operation.operator){
        case '+': {return add(operation.num1, operation.num2); break;}
        case '-': {return subtract(operation.num1, operation.num2); break;}
        case '*': {return multiply(operation.num1, operation.num2); break;}
        case '/': {return divide(operation.num1, operation.num2); break;}
        default: return 0;
    }
}

const clearOperation = () => {
    for (key in operation){
        operation[key] = undefined;
    }
}

const isReady = () => {
    for (key in operation){
        if (operation[key] === undefined) return false;
    }
    return true;
}

const assignOperand = (num) => {
    if (operation["operator"] != undefined){
        operation["num2"] = num;
    }
    else {
        operation["num1"] = num;
    }
}

const enableButtons = () => {
    const buttonList = document.querySelectorAll(".button");
    const display = document.querySelector(".display-content");
    const prev = document.querySelector(".prev");
    const numsAsString = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const operators = ['+', '-', '*', '/'];

    buttonList.forEach(button => { button.addEventListener('click', e => {
        if (button.value === "AC"){
            display.innerHTML = '';
            prev.innerHTML = '';
            clearOperation();
        }

        if (button.value === 'DEL'){
            display.innerHTML = display.innerHTML.substring(0, display.innerHTML.length - 1);
            assignOperand(display.innerHTML);
        }

        else if (button.value === "+/-"){
            if (display.innerHTML[0] != '-') {
                display.innerHTML = '-' + display.innerHTML;
                assignOperand(display.innerHTML);
            }
            else {
                display.innerHTML = display.innerHTML.substring(1);
                assignOperand(display.innerHTML);
            }
        }

        else if (button.value === '.'){
            if (!display.innerHTML.includes(button.value)){
                display.innerHTML = display.innerHTML + button.value;
                assignOperand(display.innerHTML);
            }
        }

        else if (button.value === '='){
            if (isReady()){
                display.innerHTML = parseFloat(operate().toFixed(6));
                if (!(display.innerHTML === 'bruh')){
                    operation.num1 = display.innerHTML;
                    operation.num2 = undefined;
                } 
                prev.innerHTML = "Ans=" + display.innerHTML;
            }
        }

        else if (operators.includes(button.value)){
            if (isReady()){
                display.innerHTML = parseFloat(operate().toFixed(6));
                if (!(display.innerHTML === 'bruh')){
                    operation.num1 = display.innerHTML;
                    operation.num2 = undefined;
                }
                prev.innerHTML = "Ans=" + display.innerHTML;
            }
            operation["operator"] = button.value;
            display.innerHTML = '';
        }

        else if (numsAsString.includes(button.value)){
            display.innerHTML = display.innerHTML + button.value;
            assignOperand(display.innerHTML);
        }
    })});
}

window.onload = () => {
    enableButtons();
}
