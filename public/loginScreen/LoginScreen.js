class LoginScreen {

    constructor() {

        this.textSize = 1000;

        this.state0 = enterNameText[0];
        this.state0.resize(this.textSize, 0);
        this.state1 = enterNameText[1];
        this.state1.resize(this.textSize, 0);

        this.usernameInp = createInput('');
        this.usernameInp.size(200, 20);

        socket.on('usernameDeclined', (data) => { console.log(`username ${data} has been declined!`); });
        socket.on('usernameAccepted', (data) => {

            username = data;
            this.usernameInp.remove();
            player = new Player();
            state = 1;
        });
    }

    show() {

        this.usernameInp.position(((1920 / 2) * xmp) - 100, (1080 / 2) * ymp);
        push();
        imageMode(CENTER);
        translate((1920 / 2) * xmp, 400 * ymp);
        image(animationState === 0 ? this.state0 : this.state1, 0, 0);
        pop();
    }

    requestUsername() {

        if(this.usernameInp.value() !== '' && this.usernameInp.value() !== undefined && this.usernameInp.value() !== null) {
            socket.emit('usernameRequest', this.usernameInp.value());
        }
    }
}
