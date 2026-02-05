require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Load Config
const PORT = process.env.PORT || 3000;
const BASE_URI = process.env.BASE_URI || '/api/v1';

// Import the routes
const apiRoutes = require('./src/routes/apiRoutes');

// Tell the app to use them
// All URLs will start with /api/v1 (from your .env file)
app.use(process.env.BASE_URI, apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Base URI: http://localhost:${PORT}${BASE_URI}`);
});