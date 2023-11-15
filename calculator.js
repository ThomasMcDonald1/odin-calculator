let buttons = document.querySelectorAll(".calc-button");
let entryArea = document.querySelector("#entry-container");

let currentOperator = "";
let currentEntries = 0;
let operatorApplied = false;
const MAX_FIRST_OPS = 20;
const MAX_SECOND_OPS = 20;
const MAX_ENTRIES = 44;

let firstNumber = 
{
    operandVal: "",
    hasDecimal: false
};

let secondNumber = 
{
    operandVal: "",
    hasDecimal: false
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
    switch (button.textContent)
    {
        case "+/-":
            //alert("+/- was pressed!");
            compute("+/-");
            break;
        case "AC":
            //alert("AC was pressed!");
            clearAll();
            break;
        case "DEL":
            //alert("DEL was pressed!");
            break;
        case "+":
            //alert("+ was pressed!");
            if (!operatorApplied)
            {
                currentOperator = "+";
                displayOperator();
            }
            else if(secondNumber.operandVal.length > 0) { compute("+"); }
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
            //alert("- was pressed!");
            if (!operatorApplied)
            {
                currentOperator = "-";
                displayOperator();
            }
            else if(secondNumber.operandVal.length > 0) { compute("-"); }
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
            if (!operatorApplied)
            {
                currentOperator = "*";
                displayOperator();
            }
            else if(secondNumber.operandVal.length > 0) { compute("*"); }
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
            if (!operatorApplied)
            {
                currentOperator = "/";
                displayOperator();
            }
            else if(secondNumber.operandVal.length > 0) { compute("/"); }
            break;
        case ".":
            //alert(". was pressed!");
            break;
        case "0":
            //alert("0 was pressed!");
            checkNumber(0);
            break; 
        case "=":
            //alert("= was pressed!");
            if (secondNumber.operandVal.length > 0) 
                compute("=");
            break;               
        default:
            alert("ERROR... This shouldn't happen...");
            break;
    }
}

function checkNumber(number)
{
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
    }
}

function displayEntry(entry)
{
    let displayEntry = document.createElement('div');
    displayEntry.classList.add('display-entry');
    displayEntry.textContent = entry;
    entryArea.appendChild(displayEntry);
}

function displayOperator()
{
    if (firstNumber.operandVal.length > 0)
    {
        operatorApplied = true;
        let displayEntry = document.createElement('div');
        displayEntry.classList.add('display-entry');
        displayEntry.textContent = currentOperator;
        entryArea.appendChild(displayEntry);
    }
}

function compute(operator)
{
    switch(operator)
    {
        case "+/-":
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
            break;
        case "+":
            {
                firstNumber.operandVal = solve().toString();
                secondNumber.operandVal = "";
                currentOperator = "+";
                while (entryArea.firstChild) { entryArea.removeChild(entryArea.firstChild); }
                for (let i = 0; i < firstNumber.operandVal.length; i++)
                {
                    displayEntry(firstNumber.operandVal[i]);
                }
                displayOperator();
                break;
            }
        case "-":
            firstNumber.operandVal = solve().toString();
            secondNumber.operandVal = "";
            currentOperator = "-";
            while (entryArea.firstChild) { entryArea.removeChild(entryArea.firstChild); }
            for (let i = 0; i < firstNumber.operandVal.length; i++)
            {
                displayEntry(firstNumber.operandVal[i]);
            }
            displayOperator();
            break;
        case "*":
            firstNumber.operandVal = solve().toString();
            secondNumber.operandVal = "";
            currentOperator = "*";
            while (entryArea.firstChild) { entryArea.removeChild(entryArea.firstChild); }
            for (let i = 0; i < firstNumber.operandVal.length; i++)
            {
                displayEntry(firstNumber.operandVal[i]);
            }
            displayOperator();
            break;
        case "/":
            firstNumber.operandVal = solve().toString();
            if (firstNumber.operandVal === "ERROR") { displayError(); }
            secondNumber.operandVal = "";
            currentOperator = "/";
            while (entryArea.firstChild) { entryArea.removeChild(entryArea.firstChild); }
            for (let i = 0; i < firstNumber.operandVal.length; i++)
            {
                displayEntry(firstNumber.operandVal[i]);
            }
            displayOperator();
            break;
        case "=":
            break;
        default:
            break;
    }
}

function solve()
{
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
}

/*
let tmp = BigInt(secondNumber.operandVal);
                tmp *= -1n;
                if (tmp < 0) { currentEntries++; }
                else { currentEntries--; }
                secondNumber.operandVal = tmp.toString();     
                while (entryArea.firstChild) { entryArea.removeChild(entryArea.firstChild); }
                for (let i = 0; i < firstNumber.operandVal.length; i++)
                {
                    displayEntry(firstNumber.operandVal[i]);
                }
                displayOperator();
                for(let i = 0; i < secondNumber.operandVal.length; i++)
                {
                    displayEntry(secondNumber.operandVal[i]);
                }
*/