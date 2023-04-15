const body = document.querySelector("body");                      // посилання на тіло body  
const btn_start = document.querySelector("button[data-start]");   // посилання на кнопку Start
const btn_stop = document.querySelector("button[data-stop]");     // посилання на кнопку Stop
let timerId = null;

btn_stop.disabled =true;
btn_start.addEventListener('click', startBgdColorChanging);  
btn_stop.addEventListener('click',  stopBgdColorChanging);   

//Функція, що запускає процесс зміни кольору тіла body кожну секунду
function startBgdColorChanging(){
    timerId = setInterval(() => {body.style.backgroundColor = getRandomHexColor()}, 1000);
    btn_start.disabled = true;
    btn_stop.disabled =false;
}
//Функція, що зупиняє процесс зміни кольору тіла body
function stopBgdColorChanging(){
    clearInterval(timerId);
    btn_stop.disabled =true;
    btn_start.disabled = false;
}
// Функція, що повертає рандомний колір у шістнадцятирічному форматі
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}