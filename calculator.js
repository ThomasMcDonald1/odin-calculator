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
    MAX_DIGITS: 20
};

let secondNumber = 
{
    operandVal: "",
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
            //else if(secondNumber.operandVal.length > 0) { compute("+"); }
            break;
        case "7":
            //alert("7 was pressed!");
            checkNumber(7);
            break;
        case "8":
            //alert("8 was pressed!");
            checkNumber(8);
            break;
        case "9":
            //alert("9 was pressed!");
            checkNumber(9);
            break;
        case "-":
            alert("why is this being clicked?!!");
            //alert("- was pressed!");
            if (firstNumber.operandVal.length > 0) { checkOperator("-"); }
            //else if(secondNumber.operandVal.length > 0) { compute("-"); }
            break;
        case "4":
            //alert("4 was pressed!");
            checkNumber(4);
            break;
        case "5":
            //alert("5 was pressed!");
            checkNumber(5);
            break;
        case "6":
            //alert("6 was pressed!");
            checkNumber(6);
            break;
        case "x":
            //alert("x was pressed!");
            if (firstNumber.operandVal.length > 0) { checkOperator("*"); }
            //else if(secondNumber.operandVal.length > 0) { compute("*"); }
            break;
        case "1":
            //alert("1 was pressed!");
            checkNumber(1);
            break;
        case "2":
            //alert("2 was pressed!");
            checkNumber(2);
            break;
        case "3":
            //alert("3 was pressed!");
            checkNumber(3);
            break;
        case "/":
            //alert("/ was pressed!");
            if (firstNumber.operandVal.length > 0) { checkOperator("/"); }
            //else if(secondNumber.operandVal.length > 0) { compute("/"); }
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
            //alert("0 was pressed!");
            checkNumber(0);
            break; 
        case "=":
            //alert("= was pressed!");
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
    /* OLD CODE
    if (!operatorApplied)
    {
        if (firstNumber.operandVal.length < MAX_FIRST_OPS && !(number === 0 && firstNumber.operandVal === "0"))
        {
            if (firstNumber.operandVal === "0" && number !== 0) 
            { 
                currentEntries = 0;
                while(entryArea.firstChild) { entryArea.removeChild(entryArea.firstChild); }
                firstNumber.operandVal = ""; 
            }
            firstNumber.operandVal += number;
            currentEntries++;
            displayEntry(number);
        }
    }
    else
    {
        if (secondNumber.operandVal.length < MAX_SECOND_OPS && !(number === 0 && secondNumber.operandVal === "0"))
        {
            if (secondNumber.operandVal === "0" && number !== 0) 
            { 
                currentEntries = 0;
                while(entryArea.firstChild) { entryArea.removeChild(entryArea.firstChild); }
                secondNumber.operandVal = ""; 
            }
            secondNumber.operandVal += number;
            currentEntries++;
            displayEntry(number);
        }
    }*/
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

    /* OLD CODE
    if (firstNumber.operandVal.length > 0)
    {
        operatorApplied = true;
        let displayEntry = document.createElement('div');
        displayEntry.classList.add('display-entry');
        displayEntry.textContent = currentOperator;
        entryArea.appendChild(displayEntry);
    }
    */
}

function compute()
{
    let first = new Big(firstNumber.operandVal);
    let second = new Big(secondNumber.operandVal);
    switch(firstNumber.operatorUsed)
    {
        /*case "+/-":
            // This checks to make sure only the first number is applied and doesn't have an operator
            // Won't do anything if the firstNumber already has an operator
             OLD CODE
            if (!operatorApplied) 
            { 
                let tmp = BigInt(firstNumber.operandVal);
                tmp *= -1n;
                if (tmp < 0) { currentEntries++; }
                else { currentEntries--; }
                firstNumber.operandVal = tmp.toString();     
                while (entryArea.firstChild) { entryArea.removeChild(entryArea.firstChild); }
                for (let i = 0; i < firstNumber.operandVal.length; i++)
                {
                    displayEntry(firstNumber.operandVal[i]);
                }
            }
            else if(secondNumber.operandVal.length > 0 && operatorApplied)
            {
                compute(currentOperator);
                compute("+/-");
            }
            break;*/
        case "+":
            {
                let third = first.plus(second);
                firstNumber.operandVal = third.toString();
                alert(firstNumber.operandVal);
                clearDisplay();
                for(let i = 0; i < firstNumber.operandVal.length; i++)
                {
                    displayEntry(firstNumber.operandVal[i]);
                }
                /* OLD CODE 
                firstNumber.operandVal = solve().toString();
                secondNumber.operandVal = "";
                currentOperator = "+";
                while (entryArea.firstChild) { entryArea.removeChild(entryArea.firstChild); }
                for (let i = 0; i < firstNumber.operandVal.length; i++)
                {
                    displayEntry(firstNumber.operandVal[i]);
                }
                checkOperator();
                break;
                */
            }
        case "-":
            alert("uhhh?");
            firstNumber.operandVal = (first.minus(second)).toString();
            clearDisplay();
            for(let i = 0; i < firstNumber.operandVal.length; i++)
            {
                displayEntry(firstNumber.operandVal[i]);
            }
            /* OLD CODE
            firstNumber.operandVal = solve().toString();
            secondNumber.operandVal = "";
            currentOperator = "-";
            while (entryArea.firstChild) { entryArea.removeChild(entryArea.firstChild); }
            for (let i = 0; i < firstNumber.operandVal.length; i++)
            {
                displayEntry(firstNumber.operandVal[i]);
            }
            checkOperator();
            */
            break;
        case "*":
            Multiply(secondNumber.operandVal);
            /* OLD CODE
            firstNumber.operandVal = solve().toString();
            secondNumber.operandVal = "";
            currentOperator = "*";
            while (entryArea.firstChild) { entryArea.removeChild(entryArea.firstChild); }
            for (let i = 0; i < firstNumber.operandVal.length; i++)
            {
                displayEntry(firstNumber.operandVal[i]);
            }
            checkOperator();
            */
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

            /* OLD CODE
            firstNumber.operandVal = solve().toString();
            if (firstNumber.operandVal === "ERROR") { displayError(); }
            secondNumber.operandVal = "";
            currentOperator = "/";
            while (entryArea.firstChild) { entryArea.removeChild(entryArea.firstChild); }
            for (let i = 0; i < firstNumber.operandVal.length; i++)
            {
                displayEntry(firstNumber.operandVal[i]);
            }
            checkOperator();
            */
            break;
        /*case "=":
            if (secondNumber.operandVal.length > 0) { compute(); }
            break;*/
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
}

function resetAll()
{
    clearDisplay();
    firstNumber.operandVal = "";
    firstNumber.operatorUsed = "";
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
/*function solve()
{
    /* OLD CODE
    switch (currentOperator)
    {
        case "+":
            return BigInt(firstNumber.operandVal) + BigInt(secondNumber.operandVal);
            break;
        case "-":
            return BigInt(firstNumber.operandVal) - BigInt(secondNumber.operandVal);
            break;
        case "*":
            return BigInt(firstNumber.operandVal) * BigInt(secondNumber.operandVal);
            break;
        case "/":
            if (parseInt(secondNumber.operandVal) === 0) { return "ERROR"; }
            return BigInt(firstNumber.operandVal) / BigInt(secondNumber.operandVal);
            break;
    }
}*/