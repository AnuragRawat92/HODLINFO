// Import the Mongoose module for MongoDB interactions
const mongoose = require('mongoose');

// Define an asynchronous function to connect to the MongoDB database
const connectdb = async () => {
    try {
        // Disable strict query mode, which can be necessary for certain queries or configurations
        mongoose.set('strictQuery', false);

        // Connect to the MongoDB database using the connection string from environment variables
        const conn = await mongoose.connect(process.env.MongoDB_URL);

        // Log a success message including the host where the database is connected
        console.log(`Connection successful: ${conn.connection.host}`);
    } catch (err) {
        // Log any errors that occur during the connection attempt
        console.log(`Error connecting to the database: ${err}`);
    }
};

// Export the connectdb function so it can be used in other parts of the application
module.exports = connectdb;
