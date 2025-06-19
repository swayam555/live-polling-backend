// app.js

const express = require('express');
const cors = require('cors');

const pollRoutes = require('./routes/pollRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Attach routes
app.use('/api', pollRoutes);
app.use('/api', studentRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('✅ Live Polling Backend is running!');
});

module.exports = app;
