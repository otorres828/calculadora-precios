const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const app = express(); // Create the Express app instance

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });


// Register routes
const routerIngredientes = require('./routes/ingredientes.routes.js');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(routerIngredientes);

// Get server IP address
app.get('/', (req, res) => {
  const ipAddress = require('ip').address(); // Use ip package for IP retrieval
  res.send(ipAddress);
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log errors to console
  res.status(500).send('Internal Server Error'); // Send generic error response
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app; // Export the Express app for testing or other modules