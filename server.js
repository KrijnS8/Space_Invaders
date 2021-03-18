
let userNames = [];
let users = [];
let userAssets = [];

let counter = 1;
let bpm = 100;

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

    // checks if chosen username is in use. If not in use, send to all clients that player joined
    socket.on('usernameRequest', (data) => {

        let asset = Math.floor(Math.random() * 5);
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


    // receives data from monsters and sends it to client
    socket.on('monster', (data) => {
        socket.broadcast.to(data.socketID).emit('monsterReceived', data);
    });


    // receives player location and sends it to all clients
    socket.on('playerLocationSend', (data) => {

        socket.broadcast.emit('playerLocationReceive', data);
    });


    // receives changed asset and sends it to all clients
    socket.on('changeAssetSend', (data) => {

        socket.broadcast.emit('changeAssetReceive', data);
    });


    // receives shoot cue and sends it to all clients
    socket.on('shootSend', (data) => { socket.broadcast.emit('shootReceive', data) });


    // runs when player disconnects
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

// sets interval for monster spawning
let spawnInterval = setInterval(() => { io.sockets.emit('spawnHostileCue') }, 2000);
let counterInterval = setInterval(() => {
    io.sockets.emit('counter', counter);
    counter = counter < 16 ? counter + 1 : 1;

}, 15000 / bpm);
