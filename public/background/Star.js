class Star {

    constructor() {

        this.x = random(0, window.innerWidth);
        this.y = random(0, window.innerHeight);
        this.size = random(2, 6);
        this.speed = random(0.3, 2);

        if (random(0, 100) > 90) {
            this.color = {R: 255, G: 255, B: 0};
        } else {
            this.color = {R: 255, G: 255, B: 255};
        }
    }

    show() {

        noStroke();
        fill(this.color.R, this.color.G, this.color.B, 70);
        rect(this.x, this.y, this.size);
        this.x -= this.speed;

        if (this.x < 0) {
            this.x = window.innerWidth;
        }
    }
}
