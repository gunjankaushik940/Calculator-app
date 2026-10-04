let historyList = document.getElementById("history-list");
let clearHistory = document.getElementById("clear-history");
let display = document.getElementById("display");
let buttons = document.querySelectorAll(".buttons button");


// Mouse / Button Click
buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        let value = button.innerText;

        calculate(value);

    });

});


// Calculator Function
function calculate(value) {

    if (value === "AC") {
        display.value = "";
    }

    else if (value === "DEL") {
        display.value = display.value.slice(0, -1);
    }

    else if (value === "=") {

    try {

        let expression = display.value;
        let result = eval(expression);

        display.value = result;

        let historyItem = document.createElement("div");

        historyItem.classList.add("history-item");

        historyItem.innerText = expression + " = " + result;

        historyList.prepend(historyItem);
        localStorage.setItem("calculatorHistory", historyList.innerHTML);

    }

    catch {
        display.value = "Error";
    }
}

    else if (value === "%") {

        try {
            display.value = eval(display.value) / 100;
        }

        catch {
            display.value = "Error";
        }
    }

    else {

        if (display.value === "Error") {
    display.value = "";
}

    if (value === ".") {

        let currentNumber = display.value.split(/[+\-*/]/).pop();

        if (currentNumber.includes(".")) {
            return;
        }
    }

    if (
        value === "+" ||
        value === "-" ||
        value === "*" ||
        value === "/"
    ) {

        let lastCharacter = display.value.slice(-1);

        if (
            lastCharacter === "+" ||
            lastCharacter === "-" ||
            lastCharacter === "*" ||
            lastCharacter === "/"
        ) {
            return;
        }
    }

    display.value += value;
}
}


// Keyboard Support
document.addEventListener("keydown", function(event) {

    let key = event.key;

    if (
        (key >= "0" && key <= "9") ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "."
    ) {
        display.value += key;
    }

    else if (key === "Enter") {

        try {
            display.value = eval(display.value);
        }

        catch {
            display.value = "Error";
        }
    }

    else if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
    }

    else if (key === "Escape") {
        display.value = "";
    }
    clearHistory.addEventListener("click", function() {

    historyList.innerHTML = "";

    localStorage.removeItem("calculatorHistory");

});
     
    // Load Saved History

let savedHistory = localStorage.getItem("calculatorHistory");

if (savedHistory) {
    historyList.innerHTML = savedHistory;
}

});

