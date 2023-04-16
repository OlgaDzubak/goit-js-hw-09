import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

// Описуємо змінні -------------------------------------------------
const dateInput = document.querySelector("#datetime-picker");
const btn_start = document.querySelector("button[data-start]");
const timerElement = document.querySelector(".timer");
const fieldElements = document.querySelectorAll(".field");
const valueElements = document.querySelectorAll(".value");
const labelElements = document.querySelectorAll(".label");
const daysElement = document.querySelector("span[data-days]");
const hoursElement = document.querySelector("span[data-hours]");
const minutesElement = document.querySelector("span[data-minutes]");
const secondsElement = document.querySelector("span[data-seconds]");
let selectedDate = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {   
    if (selectedDates[0] <= Date.now()){
        Notiflix.Notify.failure("Please choose a date in the future");
    }else{
        btn_start.disabled = false;
        selectedDate = selectedDates[0];
    }},
};

//-----------------------------------------------------------------

btn_start.disabled = true;                  // Початковий стан кнопки Start неактивний
flatpickr('#datetime-picker', options);     // Ініціюємо календар

//Стилі для таймера ----------------------------------------------

dateInput.style.width = "330px";
dateInput.style.height = "30px";
dateInput.style.fontSize = "18px";

timerElement.style.display = "flex";
timerElement.style.gap = "15px";

fieldElements.forEach(item => item.style.textAlign = "center");

valueElements.forEach((item)=>{
    item.style.display = "block";
    item.style.fontSize = "40px";
    item.style.fontWeight = "bold";
})

labelElements[0].textContent = "дні";
labelElements[1].textContent = 'години';
labelElements[2].textContent = 'хвилини';
labelElements[3].textContent = 'секунди';
labelElements.forEach((item)=>{
    item.style.textTransform = "uppercase";
    item.style.fontSize = "20px";
})

// Ставимо слухач на кнопку Start ----------------------------------------------------------
btn_start.addEventListener('click',()=>{
    btn_start.disabled = true;                      // Деактивуємо кнопку Start
    dateInput.disabled = true;
    startCountDownTimer();              // Запускаємо таймер зворотнього відліку       
});

//Функція таймеру зворотнього відліку з одиницею відліку, що дорівнює 1000 мілісекунд (1 секунда)
function startCountDownTimer(){
    
    let intervalId = setInterval(() => {

        let deltaTime = selectedDate - Date.now();
        const {days, hours, minutes, seconds} = convertMs(deltaTime);

        daysElement.textContent = String(days).padStart(2,'0');
        hoursElement.textContent = String(hours).padStart(2,'0');
        minutesElement.textContent = String(minutes).padStart(2,'0');
        secondsElement.textContent = String(seconds).padStart(2,'0');

        labelElements[0].textContent = declensionNum(days,["день","дні","днів"]);
        labelElements[1].textContent = declensionNum(hours,['година', 'години', 'годин']);
        labelElements[2].textContent = declensionNum(minutes,['хвилина', 'хвилини', 'хвилин']);
        labelElements[3].textContent = declensionNum(seconds,['секунда', 'секунди', 'секунд']);

        if (deltaTime < 1000 ){ 
            clearInterval(intervalId);
            Notiflix.Notify.success('Час вийшов!');
            dateInput.disabled = false;
        }
    }, 1000);
}

//Функція, що конвертує дату в дні, години, хвилини, секунди
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
//Функція, що корегує закінчення слова відповідно, до числа
function declensionNum(num, words) {
    return words[
      num % 100 > 4 && num % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
    ];
  }