const units = {
    length: {
        meters: 1,
        kilometers: 1000,
        centimeters: 0.01,
        millimeters: 0.001,
        inches: 0.0254,
        feet: 0.3048,
        yards: 0.9144,
        miles: 1609.344
    },
    weight: {
        kilograms: 1,
        grams: 0.001,
        milligrams: 0.000001,
        pounds: 0.45359237,
        ounces: 0.028349523125,
        tons: 1000
    },
    temperature: {
        celsius: 'C',
        fahrenheit: 'F',
        kelvin: 'K'
    }
};

const categorySelect = document.getElementById('category');
const fromUnitSelect = document.getElementById('fromUnit');
const toUnitSelect = document.getElementById('toUnit');
const fromValue = document.getElementById('fromValue');
const toValue = document.getElementById('toValue');
const swapBtn = document.getElementById('swapBtn');

// Populate unit dropdowns based on category
function populateUnits(category) {
    const unitOptions = Object.keys(units[category]);
    
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';
    
    unitOptions.forEach(unit => {
        fromUnitSelect.add(new Option(unit, unit));
        toUnitSelect.add(new Option(unit, unit));
    });
    
    // Set default second option for toUnit
    toUnitSelect.selectedIndex = 1;
}

// Convert temperature
function convertTemperature(value, fromUnit, toUnit) {
    let celsius;
    
    // Convert to Celsius first
    switch(fromUnit) {
        case 'celsius':
            celsius = value;
            break;
        case 'fahrenheit':
            celsius = (value - 32) * 5/9;
            break;
        case 'kelvin':
            celsius = value - 273.15;
            break;
    }
    
    // Convert from Celsius to target unit
    switch(toUnit) {
        case 'celsius':
            return celsius;
        case 'fahrenheit':
            return (celsius * 9/5) + 32;
        case 'kelvin':
            return celsius + 273.15;
    }
}

// Convert units
function convert() {
    const category = categorySelect.value;
    const from = fromUnitSelect.value;
    const to = toUnitSelect.value;
    const value = parseFloat(fromValue.value);
    
    if (isNaN(value)) {
        toValue.value = '';
        return;
    }
    
    if (category === 'temperature') {
        toValue.value = convertTemperature(value, from, to).toFixed(2);
    } else {
        const result = (value * units[category][from]) / units[category][to];
        toValue.value = result.toFixed(4);
    }
}

// Event listeners
categorySelect.addEventListener('change', () => {
    populateUnits(categorySelect.value);
    convert();
});

fromUnitSelect.addEventListener('change', convert);
toUnitSelect.addEventListener('change', convert);
fromValue.addEventListener('input', convert);

swapBtn.addEventListener('click', () => {
    const tempUnit = fromUnitSelect.value;
    const tempValue = fromValue.value;
    
    fromUnitSelect.value = toUnitSelect.value;
    toUnitSelect.value = tempUnit;
    fromValue.value = toValue.value;
    
    convert();
});

// Initialize the converter
populateUnits(categorySelect.value);
