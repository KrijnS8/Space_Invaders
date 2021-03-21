const intro = new Tone.Player('assets/samples/intro.wav').toDestination();

const drums = new Tone.Player('assets/samples/drums.wav').toDestination();
drums.sync().start(0);

const bassA = new Tone.Player('assets/samples/bass/bassA.wav').toDestination();
bassA.sync().start(0);
const bassG = new Tone.Player('assets/samples/bass/bassG.wav').toDestination();
const bassF = new Tone.Player('assets/samples/bass/bassF.wav').toDestination();

const chordsA_0 = new Tone.Player('assets/samples/chords/chordsA_0.wav').toDestination();
const chordsA_1 = new Tone.Player('assets/samples/chords/chordsA_1.wav').toDestination();
const chordsG = new Tone.Player('assets/samples/chords/chordsG.wav').toDestination();
const chordsF = new Tone.Player('assets/samples/chords/chordsF.wav').toDestination();

const plucksA_0 = new Tone.Player('assets/samples/plucks/plucksA_0.wav').toDestination();
const plucksA_1 = new Tone.Player('assets/samples/plucks/plucksA_1.wav').toDestination();
const plucksG = new Tone.Player('assets/samples/plucks/plucksG.wav').toDestination();
const plucksF = new Tone.Player('assets/samples/plucks/plucksF.wav').toDestination();

const loop = new Tone.Loop(time => {

    if(score > 10) {
        plucksA_0.sync().start(0);
    }
}, '4m').start(0);

Tone.Transport.bpm.value = 90;
Tone.Transport.setLoopPoints(0, '4m');
Tone.Transport.loop = true;

function createClock() {

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
