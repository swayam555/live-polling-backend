// store/pollStore.js

let currentPoll = null;

function createPoll(question, options) {
  currentPoll = {
    id: Date.now().toString(),
    question,
    options, // array of options
    answers: new Map(), // studentId -> selectedOption
    createdAt: Date.now(),
    duration: 60000, // 60 seconds
    expired: false,
    completed: false,
    results: options.reduce((acc, opt) => ({ ...acc, [opt]: 0 }), {})
  };

  // Set auto-expire
  setTimeout(() => {
    if (currentPoll && !currentPoll.completed) {
      currentPoll.expired = true;
    }
  }, currentPoll.duration);

  return currentPoll;
}

function getCurrentPoll() {
  return currentPoll;
}

function submitAnswer(studentId, option) {
  if (!currentPoll) return { error: "No active poll" };
  if (currentPoll.expired) return { error: "Poll has expired" };
  if (currentPoll.answers.has(studentId)) return { error: "Already answered" };
  if (!currentPoll.options.includes(option)) return { error: "Invalid option" };

  currentPoll.answers.set(studentId, option);
  currentPoll.results[option] += 1;

  return { success: true };
}

function getResults() {
  if (!currentPoll) return { error: "No poll exists" };
  return {
    question: currentPoll.question,
    results: currentPoll.results,
    totalResponses: currentPoll.answers.size
  };
}

function resetPoll() {
  currentPoll = null;
}

module.exports = {
  createPoll,
  getCurrentPoll,
  submitAnswer,
  getResults,
  resetPoll
};
