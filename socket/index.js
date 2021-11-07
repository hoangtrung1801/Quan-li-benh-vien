const {Server} = require('socket.io');
const Diseases = require('../models/Diseases/Diseases');
const Lobby = require('../models/Lobby/Lobby');

module.exports = (server) => {
  const io = new Server(server);
  io.on('connection', (socket) => {
    socket.on('lobby/submit', () => {
      io.emit('lobby/submit');
    })

    socket.on('lobby/next', () => {
      io.emit('lobby/next');
      io.emit('reception/reload');
    })

    socket.on('reception/reload', (data) => {
      io.emit('reception/reload', data);
      io.emit('list-doctor-room/reload');
      io.emit('doctor-room/reload');
    })

    socket.on('doctor-room/reload', (data) => {
      io.emit('doctor-room/reload');
      io.emit('reception/reload');
      io.emit('list-doctor-room/reload');
    })

    socket.on('list-doctor-room/reload', (data) => {
      io.emit('list-doctor-room/reload');
    })
  })
}

