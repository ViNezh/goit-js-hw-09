// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
//Список посилань на елементи html
const refs = {
  savedDate: document.querySelector('#datetime-picker'),
  daysSpan: document.querySelector('[data-days]'),
  hoursSpan: document.querySelector('[data-hours]'),
  minutesSpan: document.querySelector('[data-minutes]'),
  secondsSpan: document.querySelector('[data-seconds]'),
  startBtn: document.querySelector('[data-start]'),
};
//  Деактивуємо кнопку Start
refs.startBtn.disabled = true;
// Опції вибору дати та часу
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // Перевірка вибраної дати та активація кнопки Start
    if (new Date(selectedDates[0]) > new Date()) {
      refs.startBtn.disabled = false;
    } else {
      alert('Input date in future');
    }
  },
};

flatpickr('#datetime-picker', options);

//Функція розрахунку значень таймера (дні,години,хвилини,секунди)
function convertMs(ms) {
  // Number of milliseconds per unit of time
  let second = 1000;
  let minute = second * 60;
  let hour = minute * 60;
  let day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

// Запуск таймера після натискання кнопки Start
refs.startBtn.addEventListener('click', onClick);

function onClick() {
  const timerId = setInterval(() => {
    // Визначення інтервалу часу в мс
    const msDiff = Date.parse(refs.savedDate.value) - Date.parse(new Date());
    // Зупинка таймера при досягненні 00:00:00
    if (msDiff <= 0) {
      clearInterval(timerId);
    }
    // Отримуємо об'єкт з розрахованим часом
    const convertedTime = convertMs(msDiff);
    //Форматуємо отриманий об'єкт, додаємо 0, якщо в числі менше двох символів
    const formatedTime = addLeadingZero(convertedTime);
    // Виводимо значення часу у відповідні комірки на сторінці
    refs.daysSpan.textContent = formatedTime.days;
    refs.hoursSpan.textContent = formatedTime.hours;
    refs.minutesSpan.textContent = formatedTime.minutes;
    refs.secondsSpan.textContent = formatedTime.seconds;
  }, 1000);
}
// Функція форматування даних, додає 0, якщо в числі менше двох символів
function addLeadingZero(value) {
  const keys = Object.keys(value);
  for (const key of keys) {
    value[key] = value[key].toString().padStart(2, '0');
  }
  return value;
}
// Додаємо трохи стилів
