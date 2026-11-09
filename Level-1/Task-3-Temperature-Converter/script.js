
// Tempora - Temperature Converter

const converterForm = document.getElementById("converterForm");
const temperatureInput = document.getElementById("temperature");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");

const swapBtn = document.getElementById("swapBtn");
const clearBtn = document.getElementById("clearBtn");

const resultBox = document.getElementById("resultBox");
const resultValue = document.getElementById("resultValue");
const resultDescription = document.getElementById("resultDescription");
const message = document.getElementById("message");

const currentYear = document.getElementById("currentYear");

// Display current year
currentYear.textContent = new Date().getFullYear();

// Unit symbols
const unitSymbols = {
    C: "°C",
    F: "°F",
    K: "K"
};

// Convert input temperature to Celsius
function toCelsius(value, unit) {
    switch (unit) {
        case "C":
            return value;

        case "F":
            return (value - 32) * 5 / 9;

        case "K":
            return value - 273.15;

        default:
            return NaN;
    }
}

// Convert Celsius to the selected unit
function fromCelsius(value, unit) {
    switch (unit) {
        case "C":
            return value;

        case "F":
            return (value * 9 / 5) + 32;

        case "K":
            return value + 273.15;

        default:
            return NaN;
    }
}

// Format result without unnecessary trailing zeros
function formatTemperature(value) {
    const rounded = Number(value.toFixed(6));
    return String(rounded);
}

// Show error message
function showError(text) {
    message.textContent = text;
    message.className = "message error";

    resultValue.textContent = "Conversion unavailable";
    resultDescription.textContent = "Please correct the input and try again.";
}

// Hide error message
function hideError() {
    message.textContent = "";
    message.className = "message";
}

// Convert temperature
converterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    hideError();

    const inputValue = temperatureInput.value.trim();
    const value = Number(inputValue);

    // Validate empty input
    if (inputValue === "") {
        showError("Please enter a temperature value.");
        temperatureInput.focus();
        return;
    }

    // Validate invalid number
    if (!Number.isFinite(value)) {
        showError("Please enter a valid temperature number.");
        temperatureInput.focus();
        return;
    }

    // Convert input to Celsius first
    const celsiusValue = toCelsius(value, fromUnit.value);

    // Absolute zero validation
    if (celsiusValue < -273.15) {
        showError("Temperature cannot be below absolute zero (-273.15°C or 0 K).");
        temperatureInput.focus();
        return;
    }

    // Convert Celsius to target unit
    const convertedValue = fromCelsius(celsiusValue, toUnit.value);

    const fromSymbol = unitSymbols[fromUnit.value];
    const toSymbol = unitSymbols[toUnit.value];

    // Display result
    resultValue.textContent =
        `${formatTemperature(convertedValue)} ${toSymbol}`;

    resultDescription.textContent =
        `${formatTemperature(value)} ${fromSymbol} = ${formatTemperature(convertedValue)} ${toSymbol}`;
});

// Swap temperature units
swapBtn.addEventListener("click", function () {
    const previousFrom = fromUnit.value;

    fromUnit.value = toUnit.value;
    toUnit.value = previousFrom;

    hideError();

    // Automatically recalculate if input is present
    if (temperatureInput.value.trim() !== "") {
        converterForm.requestSubmit();
    } else {
        resetResult();
    }
});

// Reset result area
function resetResult() {
    resultValue.textContent = "Your result will appear here";
    resultDescription.textContent = "Enter a value and click Convert";
}

// Clear all inputs and results
clearBtn.addEventListener("click", function () {
    temperatureInput.value = "";
    fromUnit.value = "C";
    toUnit.value = "F";

    hideError();
    resetResult();

    temperatureInput.focus();
});
