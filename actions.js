// actions.js
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); 

export const openChat = () => ({ type: 'OPEN_CHAT' });

export const setMessages = (messages) => ({
  type: 'SET_MESSAGES',
  payload: messages,
});

export const addMessage = (message) => ({
  type: 'ADD_MESSAGE',
  payload: message,
});

export const deleteAllMessages = () => ({ type: 'DELETE_MESSAGES' });

export const fetchMessages = () => (dispatch) => {
  socket.emit('fetchMessages');

  socket.on('setMessages', (messages) => {
    dispatch(setMessages(messages));
  });
};

export const sendMessage = (text) => (dispatch) => {
  socket.emit('sendMessage', { text });

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });
};

export const deleteMessages = () => (dispatch) => {
  socket.emit('deleteMessages');

  socket.on('messagesDeleted', () => {
    dispatch(deleteAllMessages());
  });
};
