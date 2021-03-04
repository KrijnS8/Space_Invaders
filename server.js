let express = require('express');

let app = express();
let server = app.listen(3000);

app.use(express.static('public'));

console.log('The server is running');

let socket = require('socket.io');

let io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {

    console.log('new connection: ' + socket.id);
}

// use socket.emit to send messages and socket.on to receive message
//test