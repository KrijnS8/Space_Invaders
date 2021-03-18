class ShipSelectionBox {

    constructor() {


    }

    show() {

        stroke(255);
        strokeWeight(2);
        line(0, ((1080 / 11) * 3) * ymp, 100 * xmp, ((1080 / 11) * 3) * ymp);
        line(0, ((1080 / 11) * 8) * ymp, 100 * xmp, ((1080 / 11) * 8) * ymp);
        line(100 * xmp, ((1080 / 11) * 3) * ymp, 100 * xmp, ((1080 / 11) * 8) * ymp);
    }
}
