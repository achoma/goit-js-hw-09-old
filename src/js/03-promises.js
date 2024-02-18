import Notiflix from 'notiflix';

const form = document.querySelector('.form');

Notiflix.Notify.init({
  width: '300px',
  position: 'right-top',
  timeout: 3500,
});

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = parseInt(form.elements.delay.value);
  const step = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);

  createPromises(amount, delay, step);
});

function createPromises(amount, delay, step, position = 1) {
  if (position <= amount) {
    const currentDelay = delay + (position - 1) * step;
    createPromise(position, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
        createPromises(amount, delay, step, position + 1);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
        createPromises(amount, delay, step, position + 1);
      });
  }
}

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