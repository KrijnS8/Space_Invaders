let users = [];

let express = require('express');

let app = express();
let server = app.listen(3000);

app.use(express.static('public'));

console.log('The server is running');

let socket = require('socket.io');

let io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {

    console.log(`Connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Disconnected: ${socket.id}`);
    });
}

let spawnInterval = setInterval(() => {
    io.sockets.emit('spawnHostileCue')
}, 2000);

// use socket.emit to send messages and socket.on to receive message
