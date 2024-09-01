// userstats.jhs

//       // Function to get screen size
function getScreenSize() {
    const width = window.screen.width;
    const height = window.screen.height;
    return `Screen Size: ${width}x${height}`;
}

// Function to detect device type
function detectDeviceType() {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) {
        return "Device: Mobile";
    } else if (/tablet/i.test(ua)) {
        return "Device: Tablet";
    } else {
        return "Device: Desktop";
    }
}

// Function to detect operating system
function detectOS() {
    const platform = navigator.platform.toLowerCase();
    const ua = navigator.userAgent.toLowerCase();

    if (platform.includes('win')) {
        return "Operating System: Windows";
    } else if (platform.includes('mac')) {
        return "Operating System: macOS";
    } else if (platform.includes('linux') || platform.includes('unix')) {
        return "Operating System: Linux/Unix";
    } else if (/android/.test(ua)) {
        return "Operating System: Android";
    } else if (/iphone|ipad|ipod/.test(ua)) {
        return "Operating System: iOS";
    } else {
        return "Operating System: Unknown";
    }
}

// Function to detect browser
function detectBrowser() {
    const ua = navigator.userAgent;
    if (/chrome|crios/i.test(ua) && !/edge|edgios/i.test(ua)) {
        return "Browser: Chrome";
    } else if (/firefox|fxios/i.test(ua)) {
        return "Browser: Firefox";
    } else if (/safari/i.test(ua) && !/chrome|crios|edgios/i.test(ua)) {
        return "Browser: Safari";
    } else if (/edge|edgios/i.test(ua)) {
        return "Browser: Microsoft Edge";
    } else if (/opr\//i.test(ua)) {
        return "Browser: Opera";
    } else if (/trident/i.test(ua)) {
        return "Browser: Internet Explorer";
    } else {
        return "Browser: Unknown";
    }
}

// Display the information
document.getElementById('screen-info').innerText = getScreenSize();
document.getElementById('device-info').innerText = detectDeviceType();
document.getElementById('os-info').innerText = detectOS();
document.getElementById('browser-info').innerText = detectBrowser();