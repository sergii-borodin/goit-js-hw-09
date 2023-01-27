import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const input = document.querySelector('#datetime-picker');
const ref = {
    btnStart: document.querySelector('button[data-start]'),
    dataDay: document.querySelector('span[data-days]'),
    dataHours: document.querySelector('span[data-hours]'),
    dataMinutes: document.querySelector('span[data-minutes]'),
    dataSeconds: document.querySelector('span[data-seconds]')
};
ref.btnStart.disabled = true;
let selectDay = 0;
let currentDay = 0;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      selectDay = Number(selectedDates[0]);
      console.log(selectDay);
      currentDay = Number(options.defaultDate);
      console.log(currentDay);
      if (selectDay <= currentDay) {
          window.alert("Please choose a date in the future");
      }
      if (selectDay > currentDay) {
          ref.btnStart.disabled = false;
      }
  },
};

const fp = flatpickr(input, options);

ref.btnStart.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
    let difTime = selectDay - currentDay;

    intervalId = setInterval(() => {
        const  { days, hours, minutes, seconds } = convertMs(difTime);
        difTime -= 1000;
        ref.dataDay.textContent = days;
        ref.dataHours.textContent = hours;
        ref.dataMinutes.textContent = minutes;
        ref.dataSeconds.textContent = seconds;
        if (difTime <= 0) {
            clearInterval(intervalId);
        }

    }, 1000);

  ref.btnStart.disabled = true;
  input.disabled = true;
    
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}