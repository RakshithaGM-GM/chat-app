// App.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openChat, fetchMessages, sendMessage, deleteMessages } from './actions';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleSendMessage = () => {
    dispatch(sendMessage(messageInput));
    setMessageInput('');
  };

  return (
    <div className="app">
      <div className="homePage">
        <h1>Welcome to the Chat App</h1>
        <button onClick={() => dispatch(openChat())}>Open Chat</button>
      </div>

      <div className="chatPage" style={{ display: messages.length > 0 ? 'block' : 'none' }}>
        <div id="messages">
          {messages.map((message) => (
            <div key={message.id} className="message">
              {message.text}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={handleSendMessage}>Send</button>
        <button onClick={() => dispatch(deleteMessages())}>Delete Messages</button>
      </div>
    </div>
  );
}
export default App;
