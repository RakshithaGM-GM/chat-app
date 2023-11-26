const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let messages = [];

io.on('connection', (socket) => {
  console.log('A user connected');

  // Fetch Messages
  socket.on('fetchMessages', () => {
    io.to(socket.id).emit('setMessages', messages);
  });

  // Send Message
  socket.on('sendMessage', (data) => {
    const newMessage = { id: messages.length + 1, text: data.text };
    messages.push(newMessage);
    io.emit('newMessage', newMessage);
  });

  // Delete Messages
  socket.on('deleteMessages', () => {
    messages = [];
    io.emit('messagesDeleted');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
