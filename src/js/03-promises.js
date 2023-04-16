import Notiflix from 'notiflix';

const btn = document.querySelector('button[type="submit"]');     // Посилання на кнопку "Create promise"
btn.addEventListener('click', onBtnClick);                       // Додаємо слухач на кнопку "Create promise"

function onBtnClick(event){                                      // Функція, що виконується при кліку на кнопку "Create promise"
  event.preventDefault();
  let delayFirst = document.querySelector('input[name="delay"]').valueAsNumber; // Забираємо значення першої затримки з інпуту delay
  let delayStep = document.querySelector('input[name="step"]').valueAsNumber;   // Забираємо значення подальших затримок з інпуту step
  let amount = document.querySelector('input[name="amount"]').valueAsNumber;    // Забираємо значення кількості промісів з інпуту amount
  let position = 1;                                                             // рахувальник ітерацій
  
  if (!delayFirst) {delayFirst = 0;}
  if (!delayStep) {delayStep = 0;}
  if (!amount) {amount = 0;}

  let delay = delayFirst;

  if (amount){
    intervalId = setInterval(()=>{                                                  // створюємо функцію setInterval і виконуємо її із затримокю delay до тих пір, поки position<=amount
      
      createPromise(position, delay)
        .then( ({position, delay}) => { Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);})
        .catch(({position, delay}) => { Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms` );});
              
        delay = delayFirst + delayStep * position;
        position += 1;
        if (position > amount) {clearInterval(intervalId);}
    }, 0);
  }
} 

function createPromise(position, delay) {                       // Функція створення проміса номер=position із затримкою delay
  const promise = new Promise((resolve, reject) => {
    
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);

  });
  return promise;
}