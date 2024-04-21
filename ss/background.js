// chrome.runtime.onInstalled.addListener(function() {
//     console.log("Extension installed");
// });

// console.log("Bk.js is called");

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     if (changeInfo.status === "complete") {
//         console.log("update trigger")
//         // Delay sending the message to ensure content script is injected
//         setTimeout(function() {
//             captureAndDownloadScreenshot(tabId);
//         }, 1000); // Adjust delay as needed
//     }
// });

// function captureAndDownloadScreenshot(tabId) {
//     chrome.tabs.captureVisibleTab(null, { format: "png" }, function(dataUrl) {
//         console.log("captureAndDownloadScreenshot function called")
//         // print("captureAndDownloadScreenshot function called")
//         if (!dataUrl) {
//             console.error("Error: Unable to capture screenshot.");
           
//         }
        
//         console.log(dataUrl);

//         chrome.downloads.download({
//             url: dataUrl,
//             filename: "screenshot.png",
//             saveAs: false  // Set to false to avoid showing the popup notification
//         }, downloadId => {
//             if (chrome.runtime.lastError) {
//                 console.error("Error downloading screenshot:", chrome.runtime.lastError.message);
//             } else {
//                 console.log("Screenshot downloaded successfully");
//                 sendScreenshotToBackend(dataUrl); // Send the screenshot to backend after download
//             }
//         }
//     );

//     });
// }


// // Function to send screenshot data to the backend
// function sendScreenshotToBackend(dataUrl) {
//     fetch('http://localhost:2000/upload-screenshot', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ dataUrl })
//     })
//     .then(response => {
//         if (!response.ok) {
//             console.error("Error sending screenshot:", response.statusText);
//         } else {
//             console.log("Screenshot sent to backend successfully");
//         }
//     })
//     .catch(error => {
//         console.error("Error sending screenshot:", error);
//     });
// }




chrome.runtime.onInstalled.addListener(function() {
    console.log("Extension installed");
});

console.log("Bk.js is called");

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === "complete") {
        console.log("update trigger")
        // Delay sending the message to ensure content script is injected
        setTimeout(function() {
            captureAndDownloadScreenshot(tabId);
        }, 1000); // Adjust delay as needed
    }
});

function captureAndDownloadScreenshot(tabId) {
    // chrome.tabs.captureVisibleTab(null, { format: "png" }, function(dataUrl) {
    //     console.log("captureAndDownloadScreenshot function called")
    //     // print("captureAndDownloadScreenshot function called")
    //     if (!dataUrl) {
    //         console.error("Error: Unable to capture screenshot.");
    //         return;
    //     }
        
    //     console.log(dataUrl);

    //     chrome.downloads.download({
    //         url: dataUrl,
    //         filename: "screenshot.png",
    //         saveAs: false  // Set to false to avoid showing the popup notification
    //     }, downloadId => {
    //         if (chrome.runtime.lastError) {
    //             console.error("Error downloading screenshot:", chrome.runtime.lastError.message);
    //         } else {
    //             console.log("Screenshot downloaded successfully");
    //             sendScreenshotToBackend(dataUrl); // Send the screenshot to backend after download
    //         }
    //     });
    // });


    chrome.tabs.captureVisibleTab(null, { format: "png" }, function(dataUrl) {
        console.log("captureScreenshot function called")
        // print("captureScreenshot function called")
        if (!dataUrl) {
            console.error("Error: Unable to capture screenshot.");
            return;
        }
        
        console.log(dataUrl);
        sendScreenshotToBackend(dataUrl); // Send the screenshot to backend
    });
}

// Function to send screenshot data to the backend
function sendScreenshotToBackend(dataUrl) {
    fetch('http://localhost:2000/upload-screenshot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dataUrl })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Screenshot sent to backend successfully");
    })
    .catch(error => {
        console.error("Error sending screenshot:", error.message);
    });
}
