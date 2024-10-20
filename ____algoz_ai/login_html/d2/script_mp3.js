// Get the button and audio element
const playButton = document.getElementById('play-button');
const audio = document.getElementById('audio');

// Add click event listener to the button
playButton.addEventListener('click', function() {
    // Play the audio when the button is clicked
    audio.play();
});
