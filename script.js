const methodSelect = document.getElementById("method");
const coffeeInput = document.getElementById("coffee");
const ratioInput = document.getElementById("customRatio");
const unitSelect = document.getElementById("unit");
const resultDiv = document.getElementById("result");
const calculateBtn = document.getElementById("calculate");
const resetBtn = document.getElementById("reset");
const themeToggle = document.getElementById("toggleTheme");

const startBtn = document.getElementById("startTimer");
const pauseBtn = document.getElementById("pauseTimer");
const resetTimerBtn = document.getElementById("resetTimer");
const timerDisplay = document.getElementById("timerDisplay");
const dingSound = document.getElementById("dingSound");

let seconds = 0;
let timer = null;
let isPaused = false;

function calculateWater() {
  let ratio = parseFloat(ratioInput.value);
  if (isNaN(ratio) || ratio <= 0) {
    ratio = parseFloat(methodSelect.options[methodSelect.selectedIndex].dataset.ratio);
  }

  const coffee = parseFloat(coffeeInput.value);
  const unit = unitSelect.value;

  if (isNaN(coffee) || coffee <= 0) {
    resultDiv.innerText = "Masukkan jumlah kopi yang valid!";
    return;
  }

  const total = coffee * ratio;
  const hasil = unit === "ml" ? `${total.toFixed(1)} ml air` : `${total.toFixed(1)} gram air`;

  resultDiv.innerText = `Butuh sekitar ${hasil} (rasio 1:${ratio})`;

  // Simpan ke URL
  const url = new URL(window.location.href);
  url.searchParams.set("kopi", coffee);
  url.searchParams.set("rasio", ratio);
  url.searchParams.set("metode", methodSelect.value);
  history.replaceState(null, "", url);
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

function formatTime(secs) {
  const min = String(Math.floor(secs / 60)).padStart(2, "0");
  const sec = String(secs % 60).padStart(2, "0");
  return `${min}:${sec}`;
}

function startTimer() {
  if (timer) return;
  isPaused = false;
  timer = setInterval(() => {
    if (!isPaused) {
      seconds++;
      timerDisplay.textContent = formatTime(seconds);
      if ([30, 60, 150].includes(seconds)) {
        dingSound.play();
        alert(`Waktu ${formatTime(seconds)} tercapai!`);
      }
    }
  }, 1000);
}

function pauseTimer() {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? "▶️ Lanjut" : "⏸️ Jeda";
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  seconds = 0;
  timerDisplay.textContent = "00:00";
  pauseBtn.textContent = "⏸️ Jeda";
}

calculateBtn.onclick = calculateWater;
resetBtn.onclick = resetCalc;
themeToggle.onclick = toggleTheme;
startBtn.onclick = startTimer;
pauseBtn.onclick = pauseTimer;
resetTimerBtn.onclick = resetTimer;

// Load preferensi & parameter dari URL
window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  if (params.has("kopi")) coffeeInput.value = params.get("kopi");
  if (params.has("rasio")) ratioInput.value = params.get("rasio");
  if (params.has("metode")) methodSelect.value = params.get("metode");

  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
  }
};
