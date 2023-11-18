let buttons = document.querySelectorAll(".calc-button");
let entryArea = document.querySelector("#entry-container");

//let currentOperator = "";
//let currentEntries = 0;
//let operatorApplied = false;
//const MAX_FIRST_OPS = 20;
// const MAX_SECOND_OPS = 20;
const MAX_ENTRIES = 44;

let firstNumber = 
{
    operandVal: "",
    operatorUsed: "",
    hasDecimal: false,
    MAX_DIGITS: 20
};

let secondNumber = 
{
    operandVal: "",
    hasDecimal: false,
    MAX_DIGITS: 20
};


buttons.forEach((button) => 
{
    button.addEventListener('click', function()
    {
        buttonClicked(button);
    });
});

function buttonClicked(button)
{
    if (firstNumber.operandVal === "ERROR") { resetAll(); }
    switch (button.textContent)
    {
        case "+/-":
            if (firstNumber.operandVal.length > 0 && secondNumber.operandVal.length === 0 && firstNumber.operatorUsed === "")
            {
                Multiply(-1);
            }
            // Otherwise, we need to compute first, assign the result to the first number, then multiply by -1
            else if (secondNumber.operandVal.length > 0) 
            {
                compute();
                Multiply(-1);
            }
            break;
        case "AC":          
            resetAll();
            break;
        case "DEL":
            removeLastInput();
            break;
        case "+":
            if (firstNumber.operandVal.length > 0) { checkOperator("+"); }
            break;
        case "7":
            checkNumber(7);
            break;
        case "8":
            checkNumber(8);
            break;
        case "9":
            checkNumber(9);
            break;
        case "-":
            if (firstNumber.operandVal.length > 0) { checkOperator("-"); }
            break;
        case "4":
            checkNumber(4);
            break;
        case "5":
            checkNumber(5);
            break;
        case "6":
            checkNumber(6);
            break;
        case "x":
            if (firstNumber.operandVal.length > 0) { checkOperator("*"); }
            break;
        case "1":
            checkNumber(1);
            break;
        case "2":
            checkNumber(2);
            break;
        case "3":
            checkNumber(3);
            break;
        case "/":
            if (firstNumber.operandVal.length > 0) { checkOperator("/"); }
            break;
        case ".":
            if (secondNumber.operandVal.length === 0 && firstNumber.operatorUsed === "" && 
                firstNumber.operandVal.length > 0 && firstNumber.operandVal.length < firstNumber.MAX_DIGITS-1 &&
                !firstNumber.hasDecimal)
            {
                firstNumber.hasDecimal = true;
                firstNumber.operandVal += ".";
                displayEntry(".");
            }
            else if (secondNumber.operandVal.length > 0 && secondNumber.operandVal.length < secondNumber.MAX_DIGITS-1 &&
                     !secondNumber.hasDecimal)
            {
                secondNumber.hasDecimal = true;
                secondNumber.operandVal += ".";
                displayEntry(".");
            }
            break;
        case "0":
            checkNumber(0);
            break; 
        case "=":
            if (secondNumber.operandVal.length > 0) 
                compute();
            break;               
        default:
            alert("ERROR... This shouldn't happen...");
            break;
    }
}

function checkNumber(number)
{
    if (firstNumber.operatorUsed === "") // then we know the user clicked a number for the first number
    {
        if (firstNumber.operandVal.length < firstNumber.MAX_DIGITS && !(number === 0 && firstNumber.operandVal === "0"))
        {
            if (firstNumber.operandVal === "0" && number !== 0)
            {
                while(entryArea.firstChild) { entryArea.removeChild(entryArea.firstChild); }
                firstNumber.operandVal = "";
            }
            firstNumber.operandVal += number;
            displayEntry(number);
        }
    }
    else
    {
        if (secondNumber.operandVal.length < secondNumber.MAX_DIGITS && !(number === 0 && secondNumber.operandVal === "0"))
        {
            if (secondNumber.operandVal === "0" && number !== 0) 
            { 
                while(entryArea.firstChild) { entryArea.removeChild(entryArea.firstChild); }
                secondNumber.operandVal = ""; 
            }
            secondNumber.operandVal += number;
            displayEntry(number);
        }
    }
}

function displayEntry(entry)
{
    let displayEntry = document.createElement('div');
    displayEntry.classList.add('display-entry');
    displayEntry.textContent = entry;
    entryArea.appendChild(displayEntry);
}

function checkOperator(operator)
{
    /* Then we know the first number already contains an operator, so we can perform a calulation
        before displaying the result and apply the next operator to said result */
    if (secondNumber.operandVal.length > 0)
    {
        // Compute first, then show the result with this next operator:
        compute();
    }
    /* We need this check to ensure we are not overriding a current operator already applied in the
       case that the second number has not already been developed. If the previous if statement was
       true where the second number WAS developed, then we know that the compute() function will reset
       the firstNumber.operatorUsed = "" */
    if (firstNumber.operatorUsed === "")
    {
        firstNumber.operatorUsed = operator;
        displayEntry(operator);
    }
}

function compute()
{
    let first = new Big(firstNumber.operandVal);
    let second = new Big(secondNumber.operandVal);
    switch(firstNumber.operatorUsed)
    {
        case "+":
            {
                let third = first.plus(second);
                firstNumber.operandVal = third.toString();
                clearDisplay();
                for(let i = 0; i < firstNumber.operandVal.length; i++)
                {
                    displayEntry(firstNumber.operandVal[i]);
                }
            }
            break;
        case "-":
            firstNumber.operandVal = (first.minus(second)).toString();
            clearDisplay();
            for(let i = 0; i < firstNumber.operandVal.length; i++)
            {
                displayEntry(firstNumber.operandVal[i]);
            }
            break;
        case "*":
            Multiply(secondNumber.operandVal);
            break;
        case "/":
            if (secondNumber.operandVal === "0") { displayError(); }
            else
            {
                let first = new Big(firstNumber.operandVal);
                firstNumber.operandVal = (first.div(new Big(secondNumber.operandVal))).toString();
                clearDisplay();
                for (let i = 0; i < firstNumber.operandVal.length; i++)
                {
                    displayEntry(firstNumber.operandVal[i]);
                }
            }
            break;
        default:
            break;
    }
    firstNumber.operatorUsed = "";
}

function Multiply(value)
{
    let first = new Big(firstNumber.operandVal);
    firstNumber.operandVal = (first.times(new Big(value))).toString();
    clearDisplay();
    for (let i = 0; i < firstNumber.operandVal.length; i++)
    {
        displayEntry(firstNumber.operandVal[i]);
    }
}

function clearDisplay()
{
    while (entryArea.firstChild)
    {
        entryArea.removeChild(entryArea.firstChild);
    }
    secondNumber.operandVal = "";
    secondNumber.hasDecimal = false;
}

function resetAll()
{
    clearDisplay();
    firstNumber.operandVal = "";
    firstNumber.operatorUsed = "";
    firstNumber.hasDecimal = false;
}

function removeLastInput()
{
    if (firstNumber.operatorUsed === "" && firstNumber.operandVal.length > 0)
    {
        firstNumber.operandVal = firstNumber.operandVal.slice(0, firstNumber.operandVal.length - 1);
        entryArea.removeChild(entryArea.lastChild);
    }
    else if (firstNumber.operatorUsed !== "" && secondNumber.operandVal.length === 0)
    {
        firstNumber.operatorUsed = "";
        entryArea.removeChild(entryArea.lastChild);
    }
    else if (secondNumber.operandVal.length > 0)
    {
        secondNumber.operandVal = secondNumber.operandVal.slice(0, secondNumber.operandVal.length - 1);
        entryArea.removeChild(entryArea.lastChild);
    }
}

function displayError()
{
    resetAll();
    firstNumber.operandVal = "ERROR";
    for (let i = 0; i < firstNumber.operandVal.length; i++)
    {
        displayEntry(firstNumber.operandVal[i]);
    }
}