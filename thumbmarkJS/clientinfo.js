function collectClientInfo() {
    // Collect client fingerprint using ThumbprintJS
    ThumbmarkJS.getFingerprint().then(fp => {
        // Combine fingerprint with other client information
        const data = {
            fingerprint: fp,
            screen_resolution: `${window.screen.width}x${window.screen.height}`,
            viewport_size: `${window.innerWidth}x${window.innerHeight}`,
            color_depth: window.screen.colorDepth,
            pixel_depth: window.screen.pixelDepth,
            browser_name: navigator.appName,
            browser_engine: navigator.product,
            browser_version: navigator.appVersion,
            user_agent: navigator.userAgent,
            platform: navigator.platform,
            languages: navigator.languages.join(', '),
            timezone_offset: new Date().getTimezoneOffset(),
            cookies_enabled: navigator.cookieEnabled,
        };

        // Fetch client IP address from api.ipify.org
        fetchClientIP(data);
    }).catch(error => {
        console.error('Error collecting client fingerprint:', error);
    });
}

function fetchClientIP(data) {
    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(ipData => {
        const clientIP = ipData.ip;
        data.client_ip = clientIP;
        displayClientInfo(data); // Display client info after IP address is fetched
    })
    .catch(error => {
        console.error('Error fetching client IP:', error);
        displayClientInfo(data); // Display client info even if IP address fetch fails
    });
}

function displayClientInfo(data) {
    const clientInfoDiv = document.getElementById('client-info');
    clientInfoDiv.innerHTML = ''; // Clear existing content

    for (const [key, value] of Object.entries(data)) {
        const infoElement = document.createElement('p');
        infoElement.textContent = `${key}: ${value}`;
        clientInfoDiv.appendChild(infoElement);
    }
}

// Call collectClientInfo function when the window loads
window.onload = collectClientInfo;
