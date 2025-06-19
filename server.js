// server.js

const http = require('http');
const app = require('./app');
const setupSocket = require('./socket');

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = setupSocket(server);

// ✅ Attach io to all requests BEFORE routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Start server
const PORT = 53842;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
