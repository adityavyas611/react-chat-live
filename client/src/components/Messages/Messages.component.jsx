import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Message/Message.component';
import './Messages.style.css';


const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {
      messages.map((message, idx) => <div key={idx}><Message message={message} name={name} /></div>)
    }
  </ScrollToBottom>
);

export default Messages;