import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import cors from 'cors';
import router from './routes/router';
import { addUser, removeUser, getUser, getUserInRoom } from './utils/users';

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {

  socket.on('join', ({ name, room }, cb) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) {
      return cb(error);
    }

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    socket.join(user.room);

    io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) });

    cb();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });
    io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left!` });
    }
  })
});

app.use(router);

server.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});