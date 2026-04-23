import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

let userSelectedDate = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const date = new Date();

    if(userSelectedDate <= date){
      iziToast.error({
    title: 'Error',
    message: "Please choose a date in the future",
    position: "topRight"
});
  startBtn.disabled = true;
    } else{
      startBtn.disabled = false;
    }
    
  },
};

flatpickr(input, options);

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  input.disabled = true;
 

  const intervalId = setInterval(() => {
  const diff = userSelectedDate - Date.now();
   const time = convertMs(diff);

if(diff <= 0){
  clearInterval(intervalId);
   daysEl.textContent = "00";
  hoursEl.textContent = "00";
  minutesEl.textContent = "00";
  secondsEl.textContent = "00";

    input.disabled = false;
    return;
}

daysEl.textContent = addLeadingZero(time.days);
hoursEl.textContent = addLeadingZero(time.hours);
minutesEl.textContent = addLeadingZero(time.minutes);
secondsEl.textContent = addLeadingZero(time.seconds);
}, 1000);
})


function addLeadingZero(value){
  return String(value).padStart(2, "0");
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

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