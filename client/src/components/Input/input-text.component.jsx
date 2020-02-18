import React from 'react';
import './input-text.style.css';


const InputText = ({ message, setMessage, sendMessage }) => (
  <form className="form">
    <input
      className="input"
      placeholder="Type a message...."
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={(event) => sendMessage(event)}>Send</button>
  </form>
);

export default InputText;