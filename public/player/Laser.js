class Laser {

    constructor(x, y, username) {

        this.username = username;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 6;
        this.color = {R: 255, G: 0, B: 0};
    }

    show() {

        // drawing section
        push();
        translate(this.x * xmp, this.y * ymp);
        fill(255, 0, 0, 70);
        rect(0, -(this.height / 2), this.width, this.height);
        pop();

        this.x += 15;
    }
}
