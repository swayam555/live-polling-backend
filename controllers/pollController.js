// controllers/pollController.js

const { createPoll, getCurrentPoll, submitAnswer, getResults, resetPoll } = require('../store/pollStore');
const { getAllStudents } = require('../store/studentStore');

exports.createNewPoll = (req, res) => {
  const { question, options } = req.body;

  const currentPoll = getCurrentPoll();
  if (currentPoll && !currentPoll.completed) {
    return res.status(400).json({ message: "Previous poll still active. Wait until it completes." });
  }

  const poll = createPoll(question, options);

  // ✅ Emit poll to all connected clients (safe check)
  if (req.io) {
    req.io.emit("poll:created", poll);
  }

  res.status(201).json(poll);
};

exports.getActivePoll = (req, res) => {
  const poll = getCurrentPoll();
  if (!poll) return res.status(404).json({ message: "No active poll." });
  res.json(poll);
};

exports.submitAnswer = (req, res) => {
  const studentId = req.body.studentId;
  const selectedOption = req.body.option;

  const result = submitAnswer(studentId, selectedOption);

  if (result.error) {
    return res.status(400).json({ message: result.error });
  }

  const poll = getCurrentPoll();
  const students = getAllStudents();

  if (poll.answers.size === students.size || poll.expired) {
    const finalResults = getResults();
    if (req.io) {
      req.io.emit("poll:results", finalResults);
    }
    poll.completed = true;
  }

  res.status(200).json({ message: "Answer submitted successfully" });
};

exports.forceEndPoll = (req, res) => {
  const finalResults = getResults();
  if (req.io) {
    req.io.emit("poll:results", finalResults);
  }
  resetPoll();
  res.status(200).json({ message: "Poll force-ended" });
};
