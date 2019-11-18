let numbers, currentNumber, currentOperation;
let display = document.getElementById("display");
let message = document.getElementById("message");

erase();

function erase() {
    //Empties the values of global variables. Also used to initialize these variables.

    numbers = ["", "", ""];             //Array including first operand, second operand and result
    currentNumber = "0";                //Number being built and shown on display, zero is default value
    currentOperation = undefined;       //Operation to be performed
    display.innerHTML = currentNumber;  //Default value to be shown on display
}

function addDigit(digit) {
    //Builds the numbers before operating with them

    if (Number.isNaN(currentNumber)) {
        currentNumber = "0";            //Removes NaN flag (see manageOperation())
    }
    if (numbers[2] !== "") erase();     //Empties stored values from previous operations
    if (currentNumber.length < 16) {
        switch (digit) {
            case ".":
                if (!currentNumber.includes(".")) currentNumber += digit;   //Only one dot in a number
                break;
            case "0":
                if (currentNumber !== "0") currentNumber += digit;          //You can't write "00"
                break;
            default:
                if (currentNumber === "0" && digit !== ".") {               //No "0" on the left unless it is "0."
                    currentNumber = digit;
                } else {                                                    //Otherwise digits are just concatenated
                    currentNumber += digit;
                }
        }
        display.innerHTML = currentNumber;
    } else {
        message.innerHTML = "Numbers may contain up to 16 characters";     //Display size
        window.setTimeout( () => { message.innerHTML = ""; }, 1500);
    }
}

function assignPosition(number) {
    //Places operands in array
    
    if (numbers[0] === "") {
        numbers[0] = number;
    } else {
        numbers[1] = number;
    }
}

function operate(sign) {
    //Regulates what happens if an operation button is pressed
    if (Number.isNaN(currentNumber)) {  //Only true if two operators are successively pressed
        assignOperation(sign);          //Last operator pressed prevails
        return;
    }

    manageOperation();
    assignOperation(sign);
}

function manageOperation() {
    if (numbers[0] !== "") {            //If second operand has been written, first performs the operation
        equals();
    }

    if (numbers[2] !== "") {            //Previous result becomes first operand
        numbers[0] = numbers[2];
        numbers[2] = "";
    } else {                            //Default: first operand has just been written
        assignPosition(currentNumber);
    }

    currentNumber = NaN;    //Flag to avoid operation being triggered if two operators are successively pressed
}

function assignOperation(sign) {
    //Fills currentOperation with a function that performs the chosen operation
    //Employs Big Number library

    switch (sign) {
        case "+":
            currentOperation = () => BigNumber.sum(numbers[0], numbers[1]).toString();
            break;
        case "-":
            currentOperation = () => new BigNumber(numbers[0]).minus(numbers[1]).toString();
            break;
        case "*":
            currentOperation = () => new BigNumber(numbers[0]).multipliedBy(numbers[1]).toString();
            break;
        case "/":
            currentOperation = () => new BigNumber(numbers[0]).dividedBy(numbers[1]).toString();
    }
}

function equals() {
    //Executes chosen operation

    if (numbers[0] === "") return;          //In case "=" is unnecessarily pressed
    assignPosition(currentNumber);
    numbers = ["", "", currentOperation()];

    displayResult();
    currentNumber = "";
}

function displayResult() {
    //Employs Big Number library

    let displayedResult;
    if (
        new BigNumber(numbers[2]).isGreaterThanOrEqualTo(new BigNumber(9999999999999999.5)) ||
        new BigNumber(numbers[2]).isLessThanOrEqualTo(new BigNumber(-999999999999999.5))
        ) {  
        //In case integer part of result is longer than display size
        displayedResult = "TooLarge";
        numbers[2] = "";
    } else {
        if (numbers[2].length > 16) {                    
            //In case decimal part of result extends beyond display size
            const pointIndex = numbers[2].indexOf(".");
            const decimals   = ( numbers[2] >= 0 ? 15 : 16 ) - pointIndex;  //Amount of decimals available on display
            numbers[2] = new BigNumber(numbers[2]).toFixed(decimals);       //Rounding
        
            for (let i = numbers[2].length - 1; i >= pointIndex; i--) {     //No zeros on the right after dot
                if (numbers[2][i] === "0") {
                    numbers[2] = numbers[2].substring(0, i);
                } else if (numbers[2][i] === ".") {
                    numbers[2] = numbers[2].substring(0, i);
                    break;
                } else {
                    break;
                }
            }

            message.innerHTML = "Result has been rounded";
            window.setTimeout( () => { message.innerHTML = ""; }, 2500);
        }

        displayedResult = numbers[2];
    }

    display.innerHTML = displayedResult;
}