let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds){
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds){
    const mins = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${mins}:${remainderSeconds < 10 ? "0":""}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hours = end.getHours();
    const mins = end.getMinutes();
    endTime.textContent = `Back at ${hours}:${mins < 10 ? "0":""}${mins}`;
}

function startTimer(){
    timer(parseInt(this.dataset.time));
}

buttons.forEach(button => {
    button.addEventListener("click", startTimer);
});

document.customForm.addEventListener("submit", function(event){
    event.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
})