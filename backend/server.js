const http = require('http');
const app = require('./app');
const { connectToDatabase } = require('./src/config/database');
require('dotenv').config();
const { logServerStartup } = require('./src/utils/logger');

// Set up the server
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// Create an HTTP server
const server = http.createServer(app);

// Graceful shutdown handling
const handleExit = (signal) => {
    console.log(`Received signal ${signal}. Closing server...`);
    server.close(() => {
        console.log('Server closed gracefully.');
        process.exit(0);
    });
};

// Connect to the database and start the server
(async () => {
    try {
        // Database connection
        await connectToDatabase();

        // Start the server
        server.listen(PORT, HOST, () => {
            logServerStartup(PORT, HOST);
        });

        // Handle termination signals
        process.on('SIGINT', handleExit);
        process.on('SIGTERM', handleExit);
    } catch (error) {
        console.error('Failed to start the server:', error.message);
        process.exit(1);
    }
})();
