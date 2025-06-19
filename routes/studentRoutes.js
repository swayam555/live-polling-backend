// routes/studentRoutes.js

const express = require('express');
const router = express.Router();
const { registerStudent } = require('../controllers/studentController');

// Student enters name and registers (per tab)
router.post('/students', registerStudent);

module.exports = router;
