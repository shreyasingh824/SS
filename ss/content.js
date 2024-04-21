// console.log("content.js is called");
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     if (message.action === "downloadScreenshot") {
//         // Retrieve the data URL of the screenshot from the message
//         var dataUrl = message.dataUrl;

//         // Create a temporary anchor element to trigger download
//         var link = document.createElement("a");
//         link.href = dataUrl;
//         link.download = "screenshot.png";

//         // Programmatically trigger a click event on the anchor element
//         document.body.appendChild(link);
//         link.click();

//         // Clean up
//         document.body.removeChild(link);
//     }
// });

console.log("content.js is called");

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  
    if (message.action === "downloadScreenshot") {
        // Retrieve the data URL of the screenshot from the message
       
        var dataUrl = message.dataUrl;
        console.log(dataUrl);
        // Use chrome.downloads API to download the screenshot without showing the notification
        chrome.downloads.download({
            url: dataUrl,
            filename: "screenshot.png",
            saveAs: false  // Set to false to avoid showing the popup notification
        });



        // Note: Since chrome.downloads API is used, you can remove the code related to creating and clicking on the anchor element
    }
});
