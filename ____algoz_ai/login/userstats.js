// userstats.js

//       // Function to get screen size
function getScreenSize() {
    const width = window.screen.width;
    const height = window.screen.height;
    // return `Screen Size: ${width}x${height}`;
    return `${width}x${height}`; 
}

// Function to detect device type
function detectDeviceType() {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) {
        return "Device=Mobile";
    } else if (/tablet/i.test(ua)) {
        return "Device=Tablet";
    } else {
        return "Device=Desktop";
    }
}

// Function to detect operating system
function detectOS() {
    const platform = navigator.platform.toLowerCase();
    const ua = navigator.userAgent.toLowerCase();

    if (platform.includes('win')) {
        return "OpSys=Windows";
    } else if (platform.includes('mac')) {
        return "OpSys=macOS";
    } else if (platform.includes('linux') || platform.includes('unix')) {
        return "OpSys=LinuxUnix";
    } else if (/android/.test(ua)) {
        return "OpSys=Android";
    } else if (/iphone|ipad|ipod/.test(ua)) {
        return "OpSys=iOS";
    } else {
        return "OpSys=Unknown";
    }
}

// Function to detect browser
function detectBrowser() {
    const ua = navigator.userAgent;
    if (/chrome|crios/i.test(ua) && !/edge|edgios/i.test(ua)) {
        return "Browser=Chrome";
    } else if (/firefox|fxios/i.test(ua)) {
        return "Browser=Firefox";
    } else if (/safari/i.test(ua) && !/chrome|crios|edgios/i.test(ua)) {
        return "Browser=Safari";
    } else if (/edge|edgios/i.test(ua)) {
        return "Browser=MicrosoftEdge";
    } else if (/opr\//i.test(ua)) {
        return "Browser=Opera";
    } else if (/trident/i.test(ua)) {
        return "Browser=InternetExplorer";
    } else {
        return "Browser=Unknown";
    }
}

// // Display the information
// document.getElementById('screen-info').innerText = getScreenSize();
// document.getElementById('device-info').innerText = detectDeviceType();
// document.getElementById('os-info').innerText = detectOS();
// document.getElementById('browser-info').innerText = detectBrowser();