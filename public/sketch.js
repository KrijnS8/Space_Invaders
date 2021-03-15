let xmp = window.innerWidth / 1920;
let ymp = window.innerHeight / 1080;

let stars = [];
let starsAmount = window.innerHeight;

let state = 0;
let enterNameText = [];
let loginScreen;
let shipSelectionButtons = [];

let username;
let localPlayer;
let onlinePlayers = [];
let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
let bullets = [];

let monsters = [];

let shipsImgState0 = [];
let monstersImgState0 = [];
let shipsImgState1 = [];
let monstersImgState1 = [];

let animationState = 0;
let animationInterval = setInterval(function () { animationState = animationState === 0 ? 1 : 0 }, 500);


function preload() {

    // loads in all assets
    for (let i = 0; i < 5; i++) {
        shipsImgState0[i] = loadImage(`assets/ship${i}/state0.png`);
        shipsImgState1[i] = loadImage(`assets/ship${i}/state1.png`);
        monstersImgState0[i] = loadImage(`assets/monster${i}/state0.png`);
        monstersImgState1[i] = loadImage(`assets/monster${i}/state1.png`);
    }

    enterNameText[0] = loadImage(`assets/enterName/state0.png`);
    enterNameText[1] = loadImage(`assets/enterName/state1.png`);
}


function setup() {

    // connects to localhost
    socket = io.connect('http://localhost:3000');
    createCanvas(window.innerWidth, window.innerHeight);

    console.log('xmp = ' + xmp + ' and ymp = ' + ymp);

    // creates background stars
    for (let i = 0; i < starsAmount; i++) {
        stars[i] = new Star();
    }

    // creates login screen object
    loginScreen = new LoginScreen();

    // runs spawnHostile function
    //socket.on('spawnHostileCue', spawnHostile);

    // adds new player object
    socket.on('newPlayerJoin', (data) => {
        onlinePlayers.push(new OnlinePlayer(data.username, data.asset));
        console.log(`${data.username} just joined the game!`);
    });

    // runs sendData() function for all monsters
    socket.on('requestMonsters', (socketID) => {
        for(let i = 0; i < monsters.length; i++) {
            monsters[i].sendData(socketID);
        }
    });

    // creates new monster object
    socket.on('monsterReceived', (data) => {
        monsters.push(new Monster(data.y, data.x, data.asset));
    });

    // removes player object when disconnected
    socket.on('playerDisconnect', (data) => {
        for(let i = 0; i < onlinePlayers.length; i++) {
            if(onlinePlayers[i].username === data) {
                onlinePlayers.splice(i, 1);
                console.log('player disconnected');
            }
        }
    });
}


function draw() {

    background(0);
    for (let i = 0; i < starsAmount; i++) {
        stars[i].show();
    }

    if(state === 0) { loginScreen.show(); }

    if(state === 1) {

        //detects when bullet hits monster
        for (let m = 0; m < monsters.length; m++) {
            for (let b = 0; b < bullets.length; b++) {
                if (bullets[b].y > monsters[m].y - (monsters[m].size / 2) && bullets[b].y < monsters[m].y + (monsters[m].size / 2) && bullets[b].x > monsters[m].x) {
                    monsters.splice(m, 1);
                    bullets.splice(b, 1);
                }
            }
            monsters[m].show();
        }

        for(let i = 0; i < onlinePlayers.length; i++) {
            onlinePlayers[i].show();
        }

        localPlayer.show();

        for(let i = 0; i < shipSelectionButtons.length; i++) {
            shipSelectionButtons[i].show();
        }


    }
}


function spawnHostile() {

    //spawns new hostile row
    if(state === 1) {

        for (let i = 0; i < monsters.length; i++) {
            monsters[i].x -= 100;
        }

        for (let i = 0; i < 8; i++) {
            monsters.push(new Monster(((1080 / 8) * i) + ((1080 / 8) / 2)));
        }
    }
}


function keyPressed() {

    // detects up arrow key press
    if (keyCode === UP_ARROW || keyCode === 87) {
        upPressed = true;
    }

    // detects down arrow key press
    if (keyCode === DOWN_ARROW || keyCode === 83) {
        downPressed = true;
    }

    // detects left arrow key press
    if (keyCode === LEFT_ARROW || keyCode === 65) {
        leftPressed = true;
    }

    // detects right arrow key press
    if (keyCode === RIGHT_ARROW || keyCode === 68) {
        rightPressed = true;
    }

    // detects space bar key press
    if (keyCode === 32) {
        localPlayer.shoot();
    }

    // detects enter key press
    if(keyCode === ENTER && state === 0) {
        loginScreen.requestUsername();
    }
}


function keyReleased() {

    // detects up arrow key release
    if (keyCode === UP_ARROW || keyCode === 87) {
        upPressed = false;
    }

    // detects down arrow key release
    if (keyCode === DOWN_ARROW || keyCode === 83) {
        downPressed = false;
    }

    // detects left arrow key release
    if (keyCode === LEFT_ARROW || keyCode === 65) {
        leftPressed = false;
    }

    // detects right arrow key release
    if (keyCode === RIGHT_ARROW || keyCode === 68) {
        rightPressed = false;
    }
}


function windowResized() {

    // resizes canvas when user resizes window
    resizeCanvas(window.innerWidth, window.innerHeight);
    xmp = window.innerWidth / 1920;
    ymp = window.innerHeight / 1080;
}
