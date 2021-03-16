class ShipSelectionButton {

    constructor(asset) {

        this.x = 60;
        this.y = ((1080 / 9) * (asset + 2)) + ((1080 / 9) / 2);
        this.xPos = () => this.x * xmp;
        this.yPos = () => this.y * ymp;
        this.size = 50;

        this.state0 = shipSelectionAssetsState0[asset];
        this.state0.resize(this.size, 0);
        this.state1 = shipSelectionAssetsState1[asset];
        this.state1.resize(this.size, 0);
    }

    show() {

        push();
        imageMode(CENTER);
        translate(this.xPos(), this.yPos());
        image(this.hitbox() ? this.state1 : this.state0, 0, 0);
        pop();
    }

    hitbox() {
        return mouseX > this.xPos() - this.size && mouseX < this.xPos() + this.size && mouseY > this.yPos() - this.size && mouseY < this.yPos() + this.size;
    }
}
