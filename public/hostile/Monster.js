class Monster {

    constructor(y, x, asset) {

        this.x = x || 1920 - 100;
        this.y = y;
        this.size = 70;
        this.asset = asset || Math.floor(random(0, monstersImgState0.length));
        this.state0 = monstersImgState0[this.asset];
        this.state0.resize(this.size, 0);
        this.state1 = monstersImgState1[this.asset];
        this.state1.resize(this.size, 0);
    }

    show() {

        //draws monster
        push();
        imageMode(CENTER);
        translate(this.x * xmp, this.y * ymp);
        image(animationState === 0 ? this.state0 : this.state1, 0, 0);
        pop();
    }

    sendData(socketID) {

        // sends data
        let data = {
            socketID: socketID,
            x: this.x,
            y: this.y,
            asset: this.asset
        }
        socket.emit('monster', data);
    }
}
