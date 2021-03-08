let userNames = [];
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

    socket.on('usernameRequest', (data) => {

        socket.emit(userNames.includes(data) ? 'usernameDeclined' : 'usernameAccepted', data);

        if(!userNames.includes(data)) {

            userNames.push(data)
            users.push(socket.id);
        }
    });

    socket.on('disconnect', () => {

        console.log(`Disconnected: ${socket.id}`);

        for(let i = 0; i < users.length; i++) {
            if(socket.id === users[i]) {
                console.log(`User: ${userNames[i]} has disconnected`);
                users.splice(i, 1);
                userNames.splice(i, 1);
                console.log(`Remaining users: ${userNames}`);
            }
        }
    });
}

let spawnInterval = setInterval(() => { io.sockets.emit('spawnHostileCue') }, 2000);

// use socket.emit to send messages and socket.on to receive message
