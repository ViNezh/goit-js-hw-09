// Імпорт бібліотеки повідомлень
import { Notify } from 'notiflix/build/notiflix-notify-aio';
//
const formEl = document.querySelector('.form');

//
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

//
// console.log(btnForm);
formEl.addEventListener('submit', startPromise);
function startPromise(event) {
  event.preventDefault();
  const elementsForm = event.currentTarget.elements;
  const amount = Number(elementsForm.amount.value);
  let delay = Number(elementsForm.delay.value);
  const step = Number(elementsForm.step.value);
  console.log(amount, delay, step);
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay).then(onFullfill).catch(onError);
    delay += step;
  }
}
function onFullfill({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}
function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
