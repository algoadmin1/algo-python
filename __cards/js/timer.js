// timer.js

// Set the initial values  TEST, 3min, 2min
// var startTime = "00:12";
// var alertTime = "00:05";

var startTime = "03:00";
var alertTime = "01:00";

// var startTime = "02:00";
// var alertTime = "01:00";

var startSeconds0 = timeStringToSeconds(startTime);
var alertSeconds0 = timeStringToSeconds(alertTime);

var startSeconds = timeStringToSeconds(startTime);
var alertSeconds = timeStringToSeconds(alertTime);
var rounds = 1;
var timerElapses = 0;

// Get the timer display and round display elements
var timerDisplay = document.getElementById("timer");
var roundDisplay = document.getElementById("round");

var reststr =" ";

// Function to convert time string to seconds
function timeStringToSeconds(timeString) {
    var timeParts = timeString.split(":");
    return parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
}

// Function to update the timer display
function updateTimerDisplay(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Function to update the round display
function updateRoundDisplay(rounds, reststr0) {
    roundDisplay.textContent = "Round: " + rounds + reststr0 ;
}

// Function to play the sound effect
function playSoundEffect(mp3str) {
    // var audio = new Audio('sfxbeep.mp3');
    var audio = new Audio(mp3str);
    audio.play();
}

// Function to start the countdown
function startCountdown() {
    var currentSeconds = startSeconds;

    var countdownInterval = setInterval(function () {
        updateTimerDisplay(currentSeconds);
        updateRoundDisplay(rounds, reststr);

        if (currentSeconds <= 0) {
            // playSoundEffect("sfxbeep1.mp3");
            clearInterval(countdownInterval);
            timerElapses++;

            // if (ro unds % 2 === 1) {
            if (timerElapses % 2 == 1) {
                playSoundEffect("sfxbelltwice.mp3");
                // If odd timerElapses, switch to alert time
                startSeconds = alertSeconds0;   // ie 01:00
                reststr = " (Rest) ";
            } else {
                rounds++;
                reststr =" ";

                updateRoundDisplay(rounds, reststr);
                startSeconds = startSeconds0;   // ie 03:00
                reststr =" ";
                playSoundEffect("sfxbellonce.mp3");
                // If even timerElapses, switch back to start time and increment roun ds
                // startSeconds = timeStringToSeconds(startTime);
            }

            setTimeout(function () {
                resetTimer();
                startCountdown(); // Start the countdown for the next round
            }, 1000); // Wait for 1 second before resetting
        } else {
            currentSeconds--;
        }
    }, 1000); // Update every 1 second
}

// Function to reset the timer
function resetTimer() {
    updateTimerDisplay(startSeconds);
}

// Start the countdown when the window loads
window.onload = function () {
    startCountdown();
};
