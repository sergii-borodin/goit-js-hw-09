import Notiflix from 'notiflix';

const refs = {
  inputDelay: document.querySelector('[name=delay]'),
  inputStep: document.querySelector('[name=step]'),
  inputAmount: document.querySelector('[name=amount]'),
  formSubmit: document.querySelector('.form')
}
let delay = 0;
let step = 0;
let amount = 0;

refs.formSubmit.addEventListener('submit', onFormSubmit);

function onFormSubmit(event){
  event.preventDefault();
  delay= Number(refs.inputDelay.value);
  step= Number(refs.inputStep.value);
  amount= Number(refs.inputAmount.value);
  console.log(delay, step, amount);

  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay).then(resolve =>resolve).catch(reject =>  reject);
    delay += step;

  
}
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject)=> {
    
    setTimeout(()=> {
      if (shouldResolve) {
      // Fulfill
      resolve(Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
    } else {
      // Reject
      reject(Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`))   
    }}, delay)
  })
}
