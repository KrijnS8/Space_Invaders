class ShipSelectionButton {

    constructor(asset) {

        this.x = 50;
        this.y = ((1080 / 11) * (asset + 3)) + ((1080 / 11) / 2);
        this.xPos = () => this.x * xmp;
        this.yPos = () => this.y * ymp;
        this.size = 60;
        this.hitboxSize = 50;
        this.asset = asset;

        this.state0 = shipSelectionAssetsState0[asset];
        this.state0.resize(this.size, 0);
        this.state1 = shipSelectionAssetsState1[asset];
        this.state1.resize(this.size, 0);
    }

    show() {

        push();
        imageMode(CENTER);
        translate(this.xPos(), this.yPos());
        if(this.hitbox() && mouseIsPressed) tint(150);
        image(this.hitbox() ? this.state1 : this.state0, 0, 0);
        pop();
    }

    trigger() {

        if(this.hitbox()) {

            localPlayer.changeAsset(this.asset);

            let data = {
                username: username,
                asset: this.asset
            }
            socket.emit('changeAssetSend', data);
        }
    }

    hitbox() {
        return mouseX > this.xPos() - this.hitboxSize && mouseX < this.xPos() + this.hitboxSize && mouseY > this.yPos() - this.hitboxSize && mouseY < this.yPos() + this.hitboxSize;
    }
}
