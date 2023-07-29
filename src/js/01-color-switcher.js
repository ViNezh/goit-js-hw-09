// Функція генерування випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
// Посилання на кнопки та початкове значення функції зміни кольору
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerChangeColor = null;
// Прослуховування подій на кнопках
startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);
// console.dir(startBtn);
// Обробка події на кнопці start
function onStartClick() {
  timerChangeColor = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
}
// Обробка події на кнопці stop
function onStopClick() {
  clearInterval(timerChangeColor);
  startBtn.disabled = false;
}
