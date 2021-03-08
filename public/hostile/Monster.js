class Monster {

    constructor(y) {

        this.x = 1920 - 100;
        this.y = y + ((1080 / 8) / 2);
        this.size = 100;
        this.asset = Math.floor(random(0, monstersImgState0.length));
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
}
