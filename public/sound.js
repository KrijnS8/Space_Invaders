const intro = new Tone.Player('assets/samples/intro.wav').toDestination();

const drums = new Tone.Player('assets/samples/drums.wav').toDestination();
drums.sync().start(0);

const bass = new Tone.Player('assets/samples/bass.wav').toDestination();
bass.sync().start(0);

const chords = new Tone.Player('assets/samples/chords.wav').toDestination();
let chordsSynced = false;

const plucks = new Tone.Player('assets/samples/plucks.wav').toDestination();
let plucksSynced = false;

const synth = new Tone.Player('assets/samples/synth.wav').toDestination();
let synthSynced = false;

const allFX = new Tone.Player('assets/samples/allFX.wav').toDestination();
let allFXSynced = false;

Tone.Transport.bpm.value = 90;
Tone.Transport.setLoopPoints(0, '16m');
Tone.Transport.loop = true;


// main sound loop
const loop = new Tone.Loop(time => {

    if(score > 100 && plucksSynced === false) {
        plucks.sync().start(0);
        plucksSynced = true;
    }

    if(score > 200 && chordsSynced === false) {
        chords.sync().start(0);
        chordsSynced = true;
    }

    if(score > 300 && allFXSynced === false) {
        allFX.sync().start(0);
        allFXSynced = true;
    }

    if(score > 400 && synthSynced === false) {
        synth.sync().start(0);
        synthSynced = true;
    }

}, '4m').start(0);


function startSound() {

    // intro timer
    let introTimer = true;
    const introClock = new Tone.Clock(time => {

        if(introTimer) {
            intro.start();
            introTimer = false;
        } else {
            Tone.Transport.start();
            scoreCounter = new ScoreCounter();
            introClock.stop();
        }
    }, 90 / 60 / 24);
    introClock.start();
}
