// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const fs = require('fs');

// const app = express();
// const port = 2000;

// // Enable CORS
// app.use(cors());

// // Middleware to parse JSON bodies
// app.use(bodyParser.json({ limit: '10mb' }));

// // Endpoint to handle screenshot uploads
// app.post('/upload-screenshot', (req, res) => {
//     const { dataUrl } = req.body;
    
//     // Log the received image data on the server-side
//     console.log('Received screenshot:', dataUrl);

//     // Process the screenshot dataUrl here (optional)
//     // For example, you can decode the base64 data and save it to a file
//     // Ensure that you handle errors and edge cases appropriately

//     // Example: Saving the image to a file (synchronously)
//     try {
//         const imageData = dataUrl.split(';base64,').pop();
//         const fileName = `screenshot_${Date.now()}.png`;
//         fs.writeFileSync(fileName, imageData, { encoding: 'base64' });
//         console.log('Image saved as:', fileName);
//     } catch (error) {
//         console.error('Error saving image:', error);
//         // Respond with an error message
//         res.status(500).send('Error saving image');
//         return;
//     }

//     // Respond with a success message
//     res.status(200).send('Screenshot received successfully');
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });



const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path'); // Import the path module

const app = express();
const port = 2000;

// Specify the directory where you want to save the images
const desktopPath = path.join(require('os').homedir(), 'Desktop'); // Get the path to the desktop
const uploadDirectory = path.join(desktopPath, 'uploads'); // Create a path for the uploads directory

// Ensure that the specified directory exists
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json({ limit: '10mb' }));

// Endpoint to handle screenshot uploads
app.post('/upload-screenshot', (req, res) => {
    const { dataUrl } = req.body;
    
    // Log the received image data on the server-side
    console.log('Received screenshot:', dataUrl);

    // Process the screenshot dataUrl here (optional)
    // For example, you can decode the base64 data and save it to a file
    // Ensure that you handle errors and edge cases appropriately

    // Example: Saving the image to a file (synchronously)
    try {
        const imageData = dataUrl.split(';base64,').pop();
        const fileName = `screenshot_${Date.now()}.png`;

        // Specify the full path where you want to save the image
        const filePath = path.join(uploadDirectory, fileName);

        // Write the image data to the specified file path
        fs.writeFileSync(filePath, imageData, { encoding: 'base64' });
        console.log('Image saved as:', filePath);
    } catch (error) {
        console.error('Error saving image:', error);
        // Respond with an error message
        res.status(500).send('Error saving image');
        return;
    }

    // Respond with a success message
    res.status(200).send('Screenshot received successfully');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
