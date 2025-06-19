// routes/pollRoutes.js

const express = require('express');
const router = express.Router();
const {
  createNewPoll,
  getActivePoll,
  submitAnswer,
  forceEndPoll
} = require('../controllers/pollController');

// Teacher creates a new poll
router.post('/polls', createNewPoll);

// Teacher fetches current active poll
router.get('/polls/current', getActivePoll);

// Student submits answer to current poll
router.post('/polls/:id/answer', submitAnswer);

// Teacher can forcefully end a poll (optional)
router.post('/polls/end', forceEndPoll);

module.exports = router;
