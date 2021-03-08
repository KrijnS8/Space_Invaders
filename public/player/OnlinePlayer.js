class OnlinePlayer {

    constructor(username, asset) {

        this.username = username;
        this.x = 200;
        this.y = 1080 / 2;
        this.size = 120;
        this.asset = asset;
        this.isMoving = 0;
        this.state0 = shipsImgState0[this.asset];
        this.state0.resize(this.size, 0);
        this.state1 = shipsImgState1[this.asset];
        this.state1.resize(this.size, 0);

        socket.on('playerLocationReceive', (data) => {

            if(data.username === this.username) {
                this.y = data.y;
                this.isMoving = data.isMoving;
            }
        });
    }

    show() {

        //drawing section
        push();
        imageMode(CENTER);
        translate(this.x * xmp, this.y * ymp);
        rotate(PI / 2);
        image(this.isMoving ? this.state1 : this.state0, 0, 0);
        pop();
    }

    shoot() {

        bullets.push(new Laser(this.x, this.y));
    }
}
