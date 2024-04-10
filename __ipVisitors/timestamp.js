
function convertTimestamp() {
    // Get input value
    let unixTimestamp = document.getElementById('timestampInput').value;

    // Convert Unix Timestamp to milliseconds
    let timestampInMilliseconds = unixTimestamp * 1000;

    // Create a Date object using the timestamp
    let date = new Date(timestampInMilliseconds);

    // Extract year, month, day, hours, minutes, and seconds components
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    let day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');

    // Combine the components into the desired format
    let formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    // Display the formatted date and time
    document.getElementById('convertedDateTime').textContent = `Converted Date Time (PDT): ${formattedDateTime}`;
}



// function convertTimestamp() {
//     // Get input value
//     let unixTimestamp = document.getElementById('timestampInput').value;

//     // Convert Unix Timestamp to milliseconds
//     let timestampInMilliseconds = unixTimestamp * 1000;

//     // Create a Date object using the timestamp
//     let date = new Date(timestampInMilliseconds);

//     // Extract year, month, and day components
//     let year = date.getFullYear();
//     let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
//     let day = String(date.getDate()).padStart(2, '0');

//     // Combine the components into the desired format
//     let formattedDateTime = `${year}-${month}-${day}T23:59:59`;

//     // Display the formatted date and time
//     document.getElementById('convertedDateTime').textContent = `Converted Date Time: ${formattedDateTime}`;
// }
