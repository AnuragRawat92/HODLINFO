// Load environment variables from a .env file into process.env
require('dotenv').config()

// Import required modules
const express = require("express");
const app = express();
const port = 3000; // Port for the server
const expresslayout = require("express-ejs-layouts");
const connectdb = require("./server/config/db");

// Connect to the database
connectdb();

// Middleware setup
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (for form submissions)
app.use(express.json()); // Parse JSON bodies (for APIs)
app.use(expresslayout); // Integrate express-ejs-layouts for layout management
app.use(express.static('public')); // Serve static files (e.g., CSS, JavaScript, images)

// Set the layout and view engine
app.set('layout', './layouts/main'); // Specify the layout file for EJS
app.set('view engine', 'ejs'); // Set EJS as the templating engine

// Route handling
app.use('/', require("./server/routes/main")); // Use routes defined in the main routes file

// Start the server
app.listen(port, () => {
    console.log(`Listening at port ${port}`); // Log the port number the server is listening on
});
