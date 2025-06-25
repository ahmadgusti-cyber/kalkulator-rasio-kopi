const methodSelect = document.getElementById("method");
const coffeeInput = document.getElementById("coffee");
const ratioInput = document.getElementById("customRatio");
const resultDiv = document.getElementById("result");
const calculateBtn = document.getElementById("calculate");
const resetBtn = document.getElementById("reset");
const themeToggle = document.getElementById("toggleTheme");
const timerBtn = document.getElementById("startTimer");
const timerDisplay = document.getElementById("timerDisplay");

function calculateWater() {
  let ratio = parseFloat(ratioInput.value);
  if (isNaN(ratio) || ratio <= 0) {
    ratio = parseFloat(methodSelect.options[methodSelect.selectedIndex].dataset.ratio);
  }
  const coffee = parseFloat(coffeeInput.value);
  if (isNaN(coffee) || coffee <= 0) {
    resultDiv.innerText = "Masukkan jumlah kopi yang valid!";
    return;
  }

  if (methodSelect.value === "espresso") {
    resultDiv.innerText = `Target hasil: ${(coffee * ratio).toFixed(1)} gram espresso (rasio 1:${ratio})`;
  } else {
    resultDiv.innerText = `Butuh sekitar ${(coffee * ratio).toFixed(1)} ml air (rasio 1:${ratio})`;
  }

  localStorage.setItem("lastMethod", methodSelect.value);
  localStorage.setItem("lastCoffee", coffee);
  localStorage.setItem("lastRatio", ratio);
}

function resetCalc() {
  coffeeInput.value = "";
  ratioInput.value = "";
  resultDiv.innerText = "";
}

function toggleTheme() {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
}

function startTimer() {
  let seconds = 0;
  clearInterval(window.timer);
  window.timer = setInterval(() => {
    seconds++;
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    timerDisplay.innerText = `${min}:${sec}`;
    if (seconds === 30) alert("Blooming selesai! Tuang berikutnya.");
    if (seconds === 60) alert("Waktunya tuang lagi.");
    if (seconds === 150) {
      alert("Total waktu 2:30 selesai!");
      clearInterval(window.timer);
    }
  }, 1000);
}

calculateBtn.onclick = calculateWater;
resetBtn.onclick = resetCalc;
themeToggle.onclick = toggleTheme;
timerBtn.onclick = startTimer;

// Load saved state
window.onload = () => {
  const savedMethod = localStorage.getItem("lastMethod");
  const savedCoffee = localStorage.getItem("lastCoffee");
  const savedRatio = localStorage.getItem("lastRatio");
  const savedTheme = localStorage.getItem("theme");

  if (savedMethod) methodSelect.value = savedMethod;
  if (savedCoffee) coffeeInput.value = savedCoffee;
  if (savedRatio) ratioInput.value = savedRatio;
  if (savedTheme === "light") document.body.classList.add("light");
};
