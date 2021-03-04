let xmp = window.innerWidth / 1920;
let ymp = window.innerHeight / 1080;

let stars = [];
let starsAmount = window.innerHeight;

let state = 0;
let enterNameText = [];
let loginScreen;

let username;
let player;
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

    socket = io.connect('http://localhost:3000');
    createCanvas(window.innerWidth, window.innerHeight);

    console.log('xmp = ' + xmp + ' and ymp = ' + ymp);

    for (let i = 0; i < starsAmount; i++) {
        stars[i] = new Star();
    }

    loginScreen = new LoginScreen();

    socket.on('spawnHostileCue', spawnHostile);

    //player = new Player();
}

function draw() {

    background(0);

    for (let i = 0; i < starsAmount; i++) {
        stars[i].show();
    }

    if(state === 0) { loginScreen.show(); }

    if(state === 1) {

        player.show();

        for (let m = 0; m < monsters.length; m++) {
            for (let b = 0; b < bullets.length; b++) {
                if (bullets[b].y > monsters[m].y - (monsters[m].size / 2) && bullets[b].y < monsters[m].y + (monsters[m].size / 2) && bullets[b].x > monsters[m].x) {
                    monsters.splice(m, 1);
                    bullets.splice(b, 1);
                }
            }

            monsters[m].show();
        }
    }
}


function spawnHostile() {

    if(state === 1) {

        for (let i = 0; i < monsters.length; i++) {
            monsters[i].x -= 100;
        }

        for (let i = 0; i < 12; i++) {
            monsters.push(new Monster((1080 / 8) * i));
        }
    }
}

function keyPressed() {

    if (keyCode === UP_ARROW || keyCode === 87) {
        upPressed = true;
    }

    if (keyCode === DOWN_ARROW || keyCode === 83) {
        downPressed = true;
    }

    if (keyCode === LEFT_ARROW || keyCode === 65) {
        leftPressed = true;
    }

    if (keyCode === RIGHT_ARROW || keyCode === 68) {
        rightPressed = true;
    }

    if (keyCode === 32) {
        player.shoot();
    }

    if(keyCode === ENTER && state === 0) {
        loginScreen.requestUsername();
    }
}

function keyReleased() {

    if (keyCode === UP_ARROW || keyCode === 87) {
        upPressed = false;
    }

    if (keyCode === DOWN_ARROW || keyCode === 83) {
        downPressed = false;
    }

    if (keyCode === LEFT_ARROW || keyCode === 65) {
        leftPressed = false;
    }

    if (keyCode === RIGHT_ARROW || keyCode === 68) {
        rightPressed = false;
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    xmp = window.innerWidth / 1920;
    ymp = window.innerHeight / 1080;
}
