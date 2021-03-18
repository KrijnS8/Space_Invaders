const drums = new Tone.Channel(-0.25);
const reverb = new Tone.Reverb(0.5).toDestination(drums);
const compression = new Tone.Compressor(-30, 3);
const kick0 = new Tone.Player('assets/samples/kick.wav').connect(reverb).connect(compression).toDestination(drums);
const kick1 = new Tone.Player('assets/samples/kick.wav').connect(reverb).connect(compression).toDestination(drums);
const snare = new Tone.Player('assets/samples/snare.wav').connect(reverb).connect(compression).toDestination(drums);

socket = io.connect('http://localhost:3000');

// receives counter data
socket.on('counter', (counter) => {

    if(state === 1) {
        if(counter % 8 === 0) {
            kick0.start();
        }
        if(counter % 8 === 4) {
            kick1.start();
            snare.start();
        }
    }
});
