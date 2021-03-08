let userNames = [];
let users = [];
let userAssets = [];

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

    let asset = Math.floor(Math.random() * 5);


    socket.on('usernameRequest', (data) => {

        socket.emit(userNames.includes(data) ? 'usernameDeclined' : 'usernameAccepted', {
            username: data,
            asset: asset,
            playerNames: userNames,
            playerAssets: userAssets
        });

        if(!userNames.includes(data)) {

            userNames.push(data)
            users.push(socket.id);
            userAssets.push(asset);

            socket.broadcast.to(users[0]).emit('requestMonsters', socket.id);

            socket.broadcast.emit('newPlayerJoin', {
                username: data,
                asset: asset
            });
        }
    });


    socket.on('monster', (data) => {
        socket.broadcast.to(data.socketID).emit('monsterReceived', data);
    });


    socket.on('playerLocationSend', (data) => {

        socket.broadcast.emit('playerLocationReceive', data);
    });


    socket.on('shootSend', (data) => { socket.broadcast.emit('shootReceive', data) });


    socket.on('disconnect', () => {

        console.log(`Disconnected: ${socket.id}`);

        for(let i = 0; i < users.length; i++) {
            if(socket.id === users[i]) {
                socket.broadcast.emit('playerDisconnect', userNames[i]);

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
