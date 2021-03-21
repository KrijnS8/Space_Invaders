class ScoreCounter {

    constructor() {

        this.x = 25;
        this.y = 25;
    }

    show() {

        push();
        translate(this.x * xmp, this.y * ymp);
        fill(255);
        textAlign(LEFT, TOP);
        textSize(50);
        text(score, 0, 0);
        pop();
    }
}
