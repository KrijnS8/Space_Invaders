class ScoreCounter {

    constructor() {

        this.x = 50;
        this.y = 75;
    }

    show() {

        push();
        translate(this.x * xmp, this.y * ymp);
        fill(255);
        textAlign(LEFT);
        textSize(50);
        text(score, 0, 0);
        pop();
    }
}
