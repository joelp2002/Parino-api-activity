require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');

// Import routes 
const apiRoutes = require('./src/routes/apiRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load Config
const PORT = process.env.PORT || 3000;
const BASE_URI = process.env.BASE_URI || '/api/v1';

// Tell the app to use routes - NOW authRoutes is defined!
app.use('/api/v1/auth', authRoutes);  // This is now AFTER the import
app.use(BASE_URI, apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Base URI: http://localhost:${PORT}${BASE_URI}`);
});