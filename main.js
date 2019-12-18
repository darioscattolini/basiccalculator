/* GLOBAL VARIABLES:
 * numbers          - array storing three string values: 1st operand, 2nd operand, result
 * currentNumber    - string shown on display in which numeric characters of operand are concatenated
 * currentOperation - function corresponding to operation chosen by the user
 * display          - calculator's display
 * message          - element where exceptional messages will be introduced */
var numbers, currentNumber, currentOperation;
var display = document.getElementById("display");
var message = document.getElementById("message");

initialize();

/* Initializes / resets the values of global variables */
function initialize() {

    numbers = ["", "", ""];
    currentNumber = "0";
    currentOperation = undefined;
    display.innerHTML = currentNumber;

}

/* Manages what happens when user presses a digit/dot button. Builds currentNumber.
 * digit - string representing the digit pressed by the user */
function addDigit(digit) {

        //Removes NaN flag (see operate)
    if (Number.isNaN(currentNumber)) {
        currentNumber = "0";            
    }

        //Reset variables if there's a previous operation stored
    if (numbers[2] !== "") initialize();

        //Due to display size numbers can contain up to 16 characters
    if (currentNumber.length < 16) {

            //Adds digit
        switch (digit) {
            case ".":
                    //Only one dot in a number
                if (!currentNumber.includes(".")) currentNumber += digit;
                break;
            case "0":
                    //No "00" on the left
                if (currentNumber !== "0") currentNumber += digit;
                break;
            default:
                    //Keep "0" on the left only if "0."
                if (currentNumber === "0" && digit !== ".") {
                    currentNumber = digit;
                } else {
                    currentNumber += digit;
                }
        }

        display.innerHTML = currentNumber;

    } else {

        message.innerHTML = "Numbers may contain up to 16 characters";
        window.setTimeout( () => { message.innerHTML = ""; }, 1500);

    }

}

/* Manages what happens when user presses operation button
 * sign - string signaling operation chosen by the user */
function operate(sign) {
    
    /* This conditional deals with user pressing successively two operators.
     * NaN is chosen as an arbitrary flag signaling that user has just pressed an operator button
     * If flag is found, the only thing to do is to store the last operation chosen and exit this function */
    if (Number.isNaN(currentNumber)) {
        assignOperation(sign);
        return;
    }

    manageOperation();

    assignOperation(sign);

        //NaN flag is set
    currentNumber = NaN;

}

/* Decides course of action depending on the step in the flow of the operation we're in */
function manageOperation() {
    
        //Case 1: 1st operand already stored in numbers
        //Then currentNumber is the 2nd operand and a previous operation must be solved before managing this one
    if (numbers[0] !== "") {            
        calcResult();

    }

    if (numbers[2] !== "") {
        //Case 2: The result of the previous operation is stored in numbers
        //Then it is the 1st operand of this new operation
        
        numbers[0] = numbers[2];
        numbers[2] = "";

    } else {                
        //Default case: currentNumber is the 1st operand
        //Then its value must be stored in numbers in order to overwrite variable with 2nd operand

        assignPosition(currentNumber);

    }

}

/* Places an operand in the corresponding (empty) position of numbers array
 * number - string containing the operand to be placed */
function assignPosition(number) {
    
    if (numbers[0] === "") {
        numbers[0] = number;
    } else {
        numbers[1] = number;
    }

}

/*
 * Fills currentOperation with the function corresponding to the operation chosen by the user
 * sign - string signaling operation chosen by the user */
function assignOperation(sign) {
    
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

/* Executes operation stored in currentOperation between 1st and 2nd operand */
function calcResult() {
            
    /* This conditional deals with cases where there is no operation to perform.
     * Notice that if 1st operand is stored an operation was already chosen and 2nd operand is at least 0 by default
     * And that if NaN flag is found, the user has just pressed the operation button and there's no 2nd operand 
     * The function is just left, but operands and currentOperation remain stored, allowing calculation to continue */    
    if (numbers[0] === "" || Number.isNaN(currentNumber)) {
        return;
    }

        //2nd operand is stored in numbers
    assignPosition(currentNumber);
    
        //Operands are removed and result is added in numbers by calling the execution of currentOperation
    numbers = ["", "", currentOperation()];

    displayResult();

}

/* Shows the result on display */
function displayResult() {

        //Handles exceptional cases (large integer parts and rounding of decimals)
    if (numbers[2].length > 16) {
        const rounded = roundTo16(numbers[2]);
        numbers[2]        = rounded[0];
        message.innerHTML = rounded[1];
        window.setTimeout( () => { message.innerHTML = ""; }, 2500);
    } 

    display.innerHTML = numbers[2];

}

/* Deals with numbers longer than 16 digits 
 * number - string representing a number, number.length > 16 
 * return:  array containing output number and exception message */
function roundTo16(number) {
            
    const Output = [];

        //Rounding algorithm
    while (number.length > 16 && number.includes(".")) {

        if (
            number.endsWith("5") || number.endsWith("6") || number.endsWith("7") ||
            number.endsWith("8") || number.endsWith("9")
        ) {

            let secondLast = number[number.length - 2] !== "." ? number[number.length - 2] : number[number.length - 3];
            secondLast = Number(secondLast) + 1;
            number = number.slice(0, number.length - 1);
            if (number.endsWith(".")) {
                number = number.slice(0, number.length - 2) + String(secondLast);
            } else {
                number = number.slice(0, number.length - 1) + String(secondLast);
            }

        } else {

            number = number.slice(0, number.length - 1);

        }

    }

        //Return array is filled
    if (number.length > 16) {
        //Integer part larger than 16 digits (15 in negative numbers)

        Output[0] = 0;  //defaults to 0
        Output[1] = "Result doesn't fit in display";

    } else {
        //Rounding successful

        Output[0] = number;
        Output[1] = "Result has been rounded";

    }
        
    return Output;

}