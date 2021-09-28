const display = document.querySelector("#display"); //calculator display div
const calculatorButtons = document.querySelector(".button-container"); // container div of all calculator buttons

//value of what is showing on the calculator display
let displayValue = display.attributes[1].value.toString();
let solved = false;
let isOperator = false;
let operatorArr = [];

//calls function on any of the buttons clicked within calculatorButtons
calculatorButtons.addEventListener('click', (e) => {
    let buttonValue = e.target.value.toString(); // value of the clicked button 
    let buttonId = e.target.id; // ID of the clicked button
    keyPressed(e, buttonValue, buttonId);
});

//numpad input
document.addEventListener('keydown', (e) => {
    console.log(e);
    let buttonValue = e.key;

    let buttonId = e.code.toLowerCase().split("");
 
    if(buttonValue !== "Backspace") {
        buttonId.splice(0, 6);
        buttonId = buttonId.join("");
    } else {
        buttonId = buttonId.join("");
    }

    let numPad = [
        "0",
        "1", 
        "2", 
        "3", 
        "4", 
        "5", 
        "6", 
        "7", 
        "8", 
        "9", 
        "enter", 
        "add", 
        "subtract", 
        "multiply", 
        "divide",
        "backspace",
        "decimal"
    ]

    let isNumpad = false;

    numPad.map((input) => {
        if(input === buttonId) isNumpad = true;
    });
    
    if(isNumpad) keyPressed(e, buttonValue, buttonId);
    console.log(buttonId, buttonValue);
})

function keyPressed(e, buttonValue, buttonId) {

    if(displayValue === "0" && buttonId !== "AC" && buttonId !== "enter" ) {
        // conditional to concat decimal to zero
        if(buttonId === "point" || buttonId === "divide" || buttonId === "add" || buttonId === "multiply" || buttonId === "subtract") {
            solved = false;
            updateDisplay(e, solved, buttonValue, isOperator);
        }
        //else replace the value if it is currently zero
        else if(buttonValue !== "Backspace") {
            replace(buttonValue);
        }
    } 

    //concat values if not zero
    else if(displayValue !== "0" && buttonId !== "AC" && buttonId !== "enter") {
        if(solved) {
            if(buttonId === "point" || buttonId === "divide" || buttonId === "add" || buttonId === "multiply" || buttonId === "subtract") {
                solved = false;
                updateDisplay(e, solved, buttonValue, isOperator);
            } else {
                updateDisplay(e, solved, buttonValue, isOperator);
                solved = false;
            }     
        } else {
            updateDisplay(e, solved, buttonValue, isOperator);
            solved = false;
        }
    }


    operatorArr.push(buttonId);

    // clear values if AC is clicked
    if(buttonId === "AC") clear();
    
    // calculate expression if "=" is clicked
    if(buttonId === "enter") {
        console.log(buttonId);
        solved = true;
        calculate(displayValue);
    }
}

// clear screen and reset value to zero
function clear() {
    displayValue = "0";  
    display.innerHTML = "0";  
}

//update screen based on user input
function updateDisplay(event, solved, buttonValue, isOperator) {
    if(!isOperator) {
        console.log(isOperator)
        if(buttonValue !== "Backspace") {
            if(!solved) {
                displayValue += buttonValue;
                display.innerHTML = displayValue;        
            } else {
                replace(buttonValue);
            }
        } else {
            if(displayValue.length > 1) {
                displayValue = displayValue.slice(0, displayValue.length - 1);
                updateDisplay(event, solved, "");
            } else {
                clear();
            }
        }
    }
}

// calculate arithmitic expression
function calculate(equation) {
    try {
        console.log(equation)
        let solution = eval(equation);
        displayValue = solution;
        display.innerHTML = solution;
    } catch(err) {
        displayValue = "Equation Error";
        display.innerHTML = displayValue;
    }
}

// replace values
function replace(buttonValue) {
    displayValue = buttonValue;  
    display.innerHTML = buttonValue; 
}

