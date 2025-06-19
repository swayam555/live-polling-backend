// socket/index.js

const { getCurrentPoll, getResults } = require('../store/pollStore');
const { getAllStudents } = require('../store/studentStore');

function setupSocket(server) {
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Optional: emit current poll to newly joined clients
    const currentPoll = getCurrentPoll();
    if (currentPoll && !currentPoll.completed) {
      socket.emit('poll:created', currentPoll);
    }

    // Optional: You can also emit current results
    // if poll is already completed or expired
    if (currentPoll && (currentPoll.completed || currentPoll.expired)) {
      socket.emit('poll:results', getResults());
    }

    // Clean-up on disconnect
    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  // Make io instance available to controllers via request object
  return io;
}

module.exports = setupSocket;
