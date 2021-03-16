class ShipSelectionBox {

    constructor() {


    }

    show() {

        stroke(255);
        strokeWeight(2);
        line(0, 240 * ymp, 100, 240 * ymp);
        line(0, 840 * ymp, 100, 840 * ymp);
        line(100, 240 * ymp, 100, 840 * ymp);
    }
}
