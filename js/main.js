function TuneGenerator() {
    let notes = document.getElementsByName("notes")[0].value.split(";");

    if(!notes)
      return alert("Aucune note entrée.")

    const notesGenerator = new NotesGenerator(notes);
    notesGenerator.start();
}

function NotesGenerator(notes) {

    const context = new AudioContext();

    this.currentNoteIndex = 0;
    this.notes = Array.isArray(notes) ? notes : [notes];

    this.start = function() {
      let _this = this;
        this.interval = setInterval(function() {
          if(_this.currentNoteIndex < _this.notes.length)
            _this.playNote();
          else
            clearInterval(_this.interval);
        }, 1000);
    }
    this.playNote = function() {
        const oscillator = context.createOscillator();

        oscillator.type = "sine";

        oscillator.frequency.value = parseInt(this.notes[this.currentNoteIndex++]);

        const gainNode = context.createGain();
        gainNode.gain.value = .2;

        // generate sound
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);

        oscillator.start(0);

        const duration = 1;

        gainNode.gain.linearRampToValueAtTime(0.0001, context.currentTime + duration);
        oscillator.stop(context.currentTime + duration);
    }


    function getRandomInt(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

}
