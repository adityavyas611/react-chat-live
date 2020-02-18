import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.style.css';
import InformationBar from '../Information-Bar/information-bar.component';
import InputText from '../Input/input-text.component';
import Messages from '../Messages/Messages.component';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {

        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    };

    return (
        <div className="outerContainer">
            <div className="container">
                <InformationBar room={room}/>
                <Messages messages={messages} name={name}/>
                <InputText message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
    )
};

export default Chat;