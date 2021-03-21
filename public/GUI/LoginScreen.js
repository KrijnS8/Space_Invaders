class LoginScreen {

    constructor() {

        this.textSize = 1200;

        this.state0 = enterNameText[0];
        this.state0.resize(this.textSize, 0);
        this.state1 = enterNameText[1];
        this.state1.resize(this.textSize, 0);

        this.usernameInp = createInput('');
        this.usernameInp.size(200, 20);

        // detects if username has been declined or accepted
        socket.on('usernameDeclined', (data) => { console.log(`username ${data.username} has been declined!`); });
        socket.on('usernameAccepted', (data) => {

            Tone.start();

            // sets username and creates local player object
            username = data.username;
            this.usernameInp.remove();
            localPlayer = new LocalPlayer(data.asset);
            state = 1;

            // creates objects for all online players
            for(let i = 0; i < data.playerNames.length; i++) {
                onlinePlayers[i] = new OnlinePlayer(data.playerNames[i], data.playerAssets[i]);
            }

            // creates all GUI objects
            for(let i = 0; i < 5; i++) {
                shipSelectionButtons[i] = new ShipSelectionButton(i);
            }
            shipSelectionBox = new ShipSelectionBox();
            startSound();
        });
    }

    show() {

        // drawing section
        this.usernameInp.position(((1920 / 2) * xmp) - 100, ((1080 / 2) * ymp) + 50);
        push();
        imageMode(CENTER);
        translate((1920 / 2) * xmp, 400 * ymp);
        image(animationState === 0 ? this.state0 : this.state1, 0, 0);
        pop();
    }

    requestUsername() {

        // requests server if username is available
        if(this.usernameInp.value() !== '' && this.usernameInp.value() !== undefined && this.usernameInp.value() !== null) {
            socket.emit('usernameRequest', this.usernameInp.value());
        }
    }
}
