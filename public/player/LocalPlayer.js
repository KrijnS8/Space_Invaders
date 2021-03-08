class LocalPlayer {

    // noinspection DuplicatedCode
    constructor(asset) {

        this.x = 200;
        this.y = 1080 / 2;
        this.size = 120;
        this.asset = asset;
        this.state0 = shipsImgState0[this.asset];
        this.state0.resize(this.size, 0);
        this.state1 = shipsImgState1[this.asset];
        this.state1.resize(this.size, 0);
    }

    show() {

        //bullet section
        for (let i = 0; i < bullets.length; i++) {
            bullets[i].show();

            if (bullets[i].x > 1920) {
                bullets.splice(i, 1);
                console.log(bullets);
            }
        }


        //drawing section
        push();
        imageMode(CENTER);
        translate(this.x * xmp, this.y * ymp);
        rotate(PI / 2);
        image(upPressed === true || downPressed === true ? this.state1 : this.state0, 0, 0);
        pop();


        //movement section
        if (upPressed) {
            this.y -= 5;
        }
        if (downPressed) {
            this.y += 5;
        }

        if (this.y < this.size / 2) {
            this.y = this.size / 2;
        } else if (this.y > 1080 - (this.size / 2)) {
            this.y = 1080 - (this.size / 2);
        }

        socket.emit('playerLocationSend', {
            username: username,
            y: this.y,
            isMoving: (upPressed === true || downPressed === true)
        });
    }

    shoot() {

        bullets.push(new Laser(this.x, this.y));

        socket.emit('shootSend', username);
    }
}
