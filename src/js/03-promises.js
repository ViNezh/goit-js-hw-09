// Імпорт бібліотеки повідомлень
import { Notify } from 'notiflix/build/notiflix-notify-aio';
//Посилання на форму
const formEl = document.querySelector('.form');
//Функція створення промісу з затримкою
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
//Додаємо слухача на подію натискання кнопки
formEl.addEventListener('submit', startPromise);
// Функція обробки події
function startPromise(event) {
  // Заборона дій браузера за замовчуванням
  event.preventDefault();
  // Отримуємо введені значення в поля форми і переводимо в число
  const elementsForm = event.currentTarget.elements;
  const amount = Number(elementsForm.amount.value);
  let delay = Number(elementsForm.delay.value);
  const step = Number(elementsForm.step.value);
  // Створюємо задану кількість промісів з урахуванням кроку
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay).then(onFullfill).catch(onError);
    delay += step;
  }
}
// Функція при задовільному виконанні промісу
function onFullfill({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}
// Функція при незадовільному виконні промісу
function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
