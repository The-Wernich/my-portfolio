// ========== Global Variables ==========
const themeToggle = document.getElementById('themeToggle');
const decimalPlacesSelect = document.getElementById('decimalPlaces');
let decimalPlaces = parseInt(decimalPlacesSelect.value, 10);

const flatpickrOptions = {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
  time_24hr: true,
};

// Initialize Flatpickr instances globally to update theme dynamically
let fpStart = null;
let fpEnd = null;

// ========== Dark/Light Mode ==========

// Apply theme on page load based on saved preference or default light
function applyTheme(dark) {
  if(dark){
    document.body.classList.add('dark-mode');
    themeToggle.checked = true;
    // Switch Flatpickr to dark theme
    if(fpStart) fpStart.set('theme', 'dark');
    if(fpEnd) fpEnd.set('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    themeToggle.checked = false;
    if(fpStart) fpStart.set('theme', 'light');
    if(fpEnd) fpEnd.set('theme', 'light');
  }
}

// Toggle theme when checkbox changes
themeToggle.addEventListener('change', () => {
  const isDark = themeToggle.checked;
  applyTheme(isDark);
  // Save preference to localStorage
  localStorage.setItem('darkMode', isDark);
});

// On page load, read saved theme
window.addEventListener('load', () => {
  const saved = localStorage.getItem('darkMode');
  const dark = saved === 'true';
  applyTheme(dark);

  // Initialize Flatpickr instances
  fpStart = flatpickr("#start-date", {...flatpickrOptions, theme: dark ? "dark" : "light"});
  fpEnd = flatpickr("#end-date", {...flatpickrOptions, theme: dark ? "dark" : "light"});
});

// ========== Decimal Places Toggle ==========
decimalPlacesSelect.addEventListener('change', () => {
  decimalPlaces = parseInt(decimalPlacesSelect.value, 10);
  // Optionally, recalc current results to reflect new decimal places?
});

// ========== Percentage Calculator ==========

function updateLabels(){
  const calcType = document.getElementById('calcType').value;
  const label1 = document.getElementById('label1');
  const label2 = document.getElementById('label2');
  if(calcType === 'percentOf'){
    label1.textContent = 'X (%):';
    label2.textContent = 'Y (number):';
  } else if(calcType === 'whatPercent'){
    label1.textContent = 'X (number):';
    label2.textContent = 'Y (number):';
  } else if(calcType === 'increase'){
    label1.textContent = 'X (old value):';
    label2.textContent = 'Y (new value):';
  }
}

function calculate() {
  const calcType = document.getElementById('calcType').value;
  const input1 = parseFloat(document.getElementById('input1').value);
  const input2 = parseFloat(document.getElementById('input2').value);
  const resultDiv = document.getElementById('result');

  if(isNaN(input1) || isNaN(input2)){
    resultDiv.textContent = 'Please enter valid numbers for both inputs.';
    return;
  }

  let result;
  if(calcType === 'percentOf'){
    result = (input1 / 100) * input2;
    resultDiv.textContent = `${input1}% of ${input2} is ${result.toFixed(decimalPlaces)}`;
  } else if(calcType === 'whatPercent'){
    if(input2 === 0){
      resultDiv.textContent = 'Cannot divide by zero.';
      return;
    }
    result = (input1 / input2) * 100;
    resultDiv.textContent = `${input1} is ${result.toFixed(decimalPlaces)}% of ${input2}`;
  } else if(calcType === 'increase'){
    if(input1 === 0){
      resultDiv.textContent = 'Old value cannot be zero.';
      return;
    }
    result = ((input2 - input1) / input1) * 100;
    let upDown = result >= 0 ? 'increase' : 'decrease';
    resultDiv.textContent = `Percentage ${upDown} from ${input1} to ${input2} is ${Math.abs(result).toFixed(decimalPlaces)}%`;
  }
}

function resetPercentage(){
  document.getElementById('input1').value = '';
  document.getElementById('input2').value = '';
  document.getElementById('result').textContent = '';
  updateLabels();
}

// ========== Weight Converter ==========

const weightConversions = {
  mg: 0.000001,
  g: 0.001,
  oz: 0.0283495231,
  lbs: 0.45359237,
  kg: 1,
  ton: 1000
};

function convertWeight(){
  const val = parseFloat(document.getElementById('weightInput').value);
  const from = document.getElementById('weightFrom').value;
  const to = document.getElementById('weightTo').value;
  const resultDiv = document.getElementById('weightResult');

  if(isNaN(val)){
    resultDiv.textContent = 'Please enter a valid number.';
    return;
  }

  // Convert from "from" unit to kg, then kg to "to" unit
  const valInKg = val * weightConversions[from];
  const converted = valInKg / weightConversions[to];

  resultDiv.textContent = `${val} ${from} = ${converted.toFixed(decimalPlaces)} ${to}`;
}

function resetWeight(){
  document.getElementById('weightInput').value = '';
  document.getElementById('weightResult').textContent = '';
}

// ========== Distance Converter ==========

const distanceConversions = {
  mm: 0.000001,
  cm: 0.00001,
  in: 0.0000254,
  ft: 0.0003048,
  yd: 0.0009144,
  m: 0.001,
  km: 1,
  mi: 1.609344
};

function convertDistance(){
  const val = parseFloat(document.getElementById('distanceInput').value);
  const from = document.getElementById('distanceFrom').value;
  const to = document.getElementById('distanceTo').value;
  const resultDiv = document.getElementById('distanceResult');

  if(isNaN(val)){
    resultDiv.textContent = 'Please enter a valid number.';
    return;
  }

  // Convert from "from" to kilometers, then kilometers to "to"
  const valInKm = val * distanceConversions[from];
  const converted = valInKm / distanceConversions[to];

  resultDiv.textContent = `${val} ${from} = ${converted.toFixed(decimalPlaces)} ${to}`;
}

function resetDistance(){
  document.getElementById('distanceInput').value = '';
  document.getElementById('distanceResult').textContent = '';
}

// ========== Mass Addition ==========

function calculateMassAddition(){
  const inputStr = document.getElementById('massAddInput').value;
  const resultDiv = document.getElementById('massAddResult');

  if(!inputStr.trim()){
    resultDiv.textContent = 'Please enter comma-separated numbers.';
    return;
  }

  const numbers = inputStr.split(',').map(n => parseFloat(n.trim()));
  if(numbers.some(isNaN)){
    resultDiv.textContent = 'Please ensure all inputs are valid numbers.';
    return;
  }

  const sum = numbers.reduce((acc, cur) => acc + cur, 0);
  resultDiv.textContent = `Sum: ${sum.toFixed(decimalPlaces)}`;
}

function resetMassAddition(){
  document.getElementById('massAddInput').value = '';
  document.getElementById('massAddResult').textContent = '';
}

// ========== Mass Subtraction ==========

function calculateMassSubtraction(){
  const inputStr = document.getElementById('massSubtractInput').value;
  const resultDiv = document.getElementById('massSubtractResult');

  if(!inputStr.trim()){
    resultDiv.textContent = 'Please enter values in the format: start.value,subtract1,subtract2,...';
    return;
  }

  const parts = inputStr.split(',').map(n => n.trim());
  if(parts.length < 1){
    resultDiv.textContent = 'Please enter at least one value.';
    return;
  }

  // Starting value is the first number (can have decimal point)
  const startVal = parseFloat(parts[0]);
  if(isNaN(startVal)){
    resultDiv.textContent = 'Please enter a valid starting value.';
    return;
  }

  // The rest are values to subtract
  const toSubtract = parts.slice(1).map(n => parseFloat(n));
  if(toSubtract.some(isNaN)){
    resultDiv.textContent = 'Please enter valid numbers to subtract.';
    return;
  }

  const result = toSubtract.reduce((acc, cur) => acc - cur, startVal);
  resultDiv.textContent = `Result: ${result.toFixed(decimalPlaces)}`;
}

function resetMassSubtraction(){
  document.getElementById('massSubtractInput').value = '';
  document.getElementById('massSubtractResult').textContent = '';
}

// ========== Duration Calculator ==========

function calculateDuration(){
  const startDateStr = document.getElementById('start-date').value;
  const endDateStr = document.getElementById('end-date').value;
  const resultDiv = document.getElementById('durationResult');

  if(!startDateStr || !endDateStr){
    resultDiv.textContent = 'Please select both start and end date/time.';
    return;
  }

  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  if(isNaN(start.getTime()) || isNaN(end.getTime())){
    resultDiv.textContent = 'Invalid date/time format.';
    return;
  }

  if(end < start){
    resultDiv.textContent = 'End date/time must be after start date/time.';
    return;
  }

  let diffMs = end - start;

  const msInSec = 1000;
  const msInMin = msInSec * 60;
  const msInHour = msInMin * 60;
  const msInDay = msInHour * 24;

  const days = Math.floor(diffMs / msInDay);
  diffMs %= msInDay;

  const hours = Math.floor(diffMs / msInHour);
  diffMs %= msInHour;

  const minutes = Math.floor(diffMs / msInMin);
  diffMs %= msInMin;

  const seconds = Math.floor(diffMs / msInSec);

  resultDiv.textContent = `Duration: ${days} day(s), ${hours} hour(s), ${minutes} minute(s), ${seconds} second(s)`;
}

function resetDuration(){
  document.getElementById('start-date').value = '';
  document.getElementById('end-date').value = '';
  document.getElementById('durationResult').textContent = '';
}

// Form Js

function submitForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  fetch("https://formspree.io/f/mnnvrzwn", {
    method: "POST",
    headers: {
      'Accept': 'application/json'
    },
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const modal = document.getElementById("thank-you-modal");
    modal.style.display = "flex";
    document.body.classList.add("modal-open");
    form.reset();
  })
  .catch(error => {
    console.error("Formspree Error:", error);
    alert(`Submission failed: ${error.message}`);
  });
}

function closeModal() {
  const modal = document.getElementById("thank-you-modal");
  modal.style.display = "none";
  document.body.classList.remove("modal-open");
}
