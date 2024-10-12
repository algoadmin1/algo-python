// clockrun.js

setInterval(()=> {
    const time = document.querySelector("#time");

    let date    = new Date();

    let hours   = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let daynight = "am";

        // Create a new date object for the current date and time
    let date1 = new Date();



    const options = {
        timeZone: 'America/New_York', // EDT is in the New York time zone

        weekday: 'short',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true // use 24-hour format
    };

const formattedDate = date.toLocaleString('en-US', options)
    .replace(',', '') // Remove the comma
    .replace(/(\d{2}):(\d{2}):(\d{2})/, '$1:$2:$3'); // Replace the hour separator


    // // Format the date to Eastern Daylight Time (EDT)
    // let options = {
    //     timeZone: 'America/New_York', // EDT is in the New York time zone
    //     // year: 'numeric',
    //     // month: '2-digit',
    //     // day: '2-digit',
    //     hour: '2-digit',
    //     minute: '2-digit',
    //     second: '2-digit',
    //     // hour12: false // Use 24-hour format
    //     hour12: true // Use 24-hour format
    // };

    // let formatter = new Intl.DateTimeFormat('en-US', options);
    // let formattedDate = formatter.format(date1);





    // console.log(formattedDate);


    if(hours > 12){
        daynight = "pm";
        hours = hours - 12; 
    }
    if(hours > 12){
        hours = "0" + hours ;
    }
    if(minutes < 10){
        minutes = "0" + minutes ;
    }
    if(seconds < 10){
        seconds = "0" + seconds ;
    }

    // time.textContent = hours + ":" + minutes + ":" + seconds + daynight ; 
    time.textContent = formattedDate + " EDT";
});