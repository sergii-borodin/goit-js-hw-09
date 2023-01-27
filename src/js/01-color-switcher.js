const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let setIntervalId = null;
console.log(btnStart);
console.log(btnStop);

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
    btnStart.setAttribute('disabled', '');
    setIntervalId = setInterval(setBodyBgColor, 1000);

}

function onBtnStopClick() {
    btnStart.removeAttribute('disabled');
    clearInterval(setIntervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function setBodyBgColor() {
    body.setAttribute('style', `background-color: ${getRandomHexColor()}`)
}