class ShipSelectionButton {

    constructor(asset) {

        this.x = 80;
        this.y = ((1080 / 5) * asset) + ((1080 / 5) / 2);
        this.size = 80;

        this.state0 = shipsImgState0[asset];
        this.state0.resize(this.size, 0);
        this.state1 = shipsImgState1[asset];
        this.state1.resize(this.size, 0);
    }

    show() {

        push();
        imageMode(CENTER);
        translate(this.x * xmp, this.y * ymp);

        image(this.state0, 0, 0);
        pop();
    }
}
